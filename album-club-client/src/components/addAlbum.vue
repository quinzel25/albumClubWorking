<template>
    <div class="card" id="search-card">

        <div class="alert alert-danger" v-show="errors.length">
            <li v-for="error in errors">{{error}}</li>
        </div>
        <form>
            <h2>Search For Album</h2>
                <div class="form-group">
                    <input type="text" class="form-control" id="album-search" v-model.trim="albumName">
                    <label for="album-search"></label>
                </div>

            <button class="btn btn-primary" v-on:click.prevent="searchAlbum">Search</button>

<!--            end of form-->
        </form>

<!--        if there is a valid search the card will appear-->
        <div v-if="album" id="search-result" >
            <img style="horiz-align: center" v-bind:src="albumImgSrc" height="100" width="100"> {{ album }} - {{artistAPI}}
        </div>

        <div id="footer-save-cancel">
            <button class="btn btn-primary" v-on:click.prevent="saveAlbum">Save</button>
        </div>

    </div>
    
</template>

<script>
    export default {
        name: "addAlbum",
        data() {
            return {
                albumName: '',
                artistName: '',
                album: null,
                albumImgSrc: '',
                artistAPI: '',
                errors: [],
                openLink: '',

            }
        },
        props: {
          authToken: String,
          suggester: String
        },
        methods: {
            // search for album before being able to add to list

            searchAlbum() {
                this.errors = []
                if (this.albumName) {
                     let self = this;
                    let nameSearch = this.albumName.toLocaleLowerCase().split(' ').join('%20')
                    console.log(nameSearch)

                    let string = `https://api.spotify.com/v1/search?q=tragic%20kingdom&type=album`
                    let fetchOG = `https://api.spotify.com/v1/search?q=${nameSearch}&type=album`
                    // api fetch for a search query
                    fetch(fetchOG, {
                        headers: {
                            'Authorization': `Bearer ${self.authToken}`
                        }
                    }).then(response => {
                        console.log('TOKEN IN RESPONSE ' + self.authToken)
                        console.log(response)
                        return response.json()
                    }).then(data => {
                        // grabs info from API call
                        let albumName = data.albums.items[0].name
                        let artistName = data.albums.items[0].artists[0].name
                        let albumImgSrc = data.albums.items[0].images[0].url
                        //this.album = data.albums.items[0]
                        // this will grab the open.spotify link
                        let openGrab = data.albums.items[0].external_urls.spotify
                        this.openLink = openGrab
                        this.album = albumName
                        this.artistAPI = artistName
                        this.albumImgSrc = albumImgSrc
                        console.log(data)
                    }).catch(err => {
                        console.log(err)
                        this.errors.push('No results found')
                    })
                    // empty text boxes
                    this.albumName = ''
                    this.artistName = ''
                } else {
                    this.errors.push('Enter text to search')
                }

            },
            saveAlbum() {
                if (this.album == null) {
                    alert('Nothing is selected.')
                } else {
                    let albumObject = {name: this.album, artist: this.artistAPI, imgSrc: this.albumImgSrc, suggester: this.suggester, openLink: this.openLink}
                    //emits object to parent
                    this.$emit('album-added', albumObject)
                    //clears result card
                    this.album = null

                }
            }
        },
        mounted() {
            this.token = window.location.hash.substr(1).split('&')[0].split("=")[1]

            if (this.token) {
                // alert(this.token)

                window.opener.spotifyCallback(this.token)
            }
        }
    }
</script>

<style scoped>
#search-result.card {
    font-size: 25px;
    padding: 20px;


}
#search-card {
    padding: 20px;
    }
</style>
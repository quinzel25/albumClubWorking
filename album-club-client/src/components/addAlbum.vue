<template>
<div id="add">
    <button class="btn btn-block btn-primary" id="show-modal" @click="showModal = true">Add New Album</button>

    <br>
    <div v-if="showModal">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
<!--                                <button type="button" class="close" @click="showModal=false">-->
<!--                                    <span aria-hidden="true">&times;</span>-->
<!--                                </button>-->
                                <h4 class="modal-title">Add New Album</h4>
                            </div>
                            <div class="modal-body">
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
                                <br>
                                <!--        if there is a valid search the card will appear-->
                                <div v-if="album" id="search-result" >
                                    <img style="horiz-align: center" v-bind:src="albumImgSrc" height="100" width="100"> {{ album }} - {{artistAPI}}
                                </div>
                            </div>
                            <div id="footer-save-cancel" class="modal-footer">
                                 <button class="btn btn-primary" v-on:click.prevent="saveAlbum" @click="showModal=false">Save</button>
                                 <button class="btn btn-dark" data-dismiss="modal" value="Close" @click="showModal=false">Close</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>

<!--    <button id="show-modal" @click="showModal = true">Show Modal</button>-->




<!--    <div class="modal-fade" id="addAlbumModal">-->

<!--        <div class="modal-dialog">-->

<!--            <div class="modal-content">-->

<!--                    <div class="modal-header">-->
<!--                        <h1>Add New Album</h1>-->
<!--                    </div>-->

<!--                    <div class="modal-body">-->
<!--                            <div class="alert alert-danger" v-show="errors.length">-->
<!--                                <li v-for="error in errors">{{error}}</li>-->
<!--                            </div>-->
<!--                            <form>-->
<!--                                <h2>Search For Album</h2>-->
<!--                                    <div class="form-group">-->
<!--                                        <input type="text" class="form-control" id="album-search" v-model.trim="albumName">-->
<!--                                        <label for="album-search"></label>-->
<!--                                    </div>-->

<!--                                <button class="btn btn-primary" v-on:click.prevent="searchAlbum">Search</button>-->

<!--                    &lt;!&ndash;            end of form&ndash;&gt;-->
<!--                            </form>-->
<!--                            <br>-->
<!--                    &lt;!&ndash;        if there is a valid search the card will appear&ndash;&gt;-->
<!--                            <div v-if="album" id="search-result" >-->
<!--                                <img style="horiz-align: center" v-bind:src="albumImgSrc" height="100" width="100"> {{ album }} - {{artistAPI}}-->
<!--                            </div>-->
<!--                            <br>-->
<!--                    </div>-->
<!--                    <div id="footer-save-cancel" class="modal-footer">-->
<!--                        <button class="btn btn-primary" v-on:click.prevent="saveAlbum">Save</button>-->
<!--                        <button class="btn btn-danger" data-dismiss="modal" value="Close">Close</button>-->

<!--                    </div>-->


<!--            </div>-->
<!--&lt;!&ndash;    wrapper div&ndash;&gt;-->
<!--        </div>-->
<!--    </div>-->
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
                showModal: false,
                //archive: false

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
                        this.errors.push('No results found. Try logging in.')
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
                    let albumObject = {name: this.album, artist: this.artistAPI, imgURL: this.albumImgSrc, suggester: this.suggester, openLink: this.openLink, archive: false }
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
#add {
    margin-left: 50px;
    margin-right: 50px;
    }


/*    STYLES FOR MODAL*/
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

</style>
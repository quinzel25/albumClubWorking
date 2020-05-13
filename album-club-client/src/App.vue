<template>
  <div id="app">

    <div class="navbar navbar-dark bg-dark" id="nav">
      <h1>Matt Healy's Album Club</h1> <br>

      <div id="login-avatar">
<!--          if true shows message and profile picture-->
          <div v-if="me">
              Welcome {{ me }} <img v-bind:src="profilePicSrc" height="50" width="50">
          </div>
          <!--    login for spotify-->
          <div v-else>
              <button class="btn btn-success" @click="login">Login with Spotify</button>
          </div>
      </div>
    </div>
<!--    start of current album display-->
      <br>
      <currentAlbum
                    v-bind:currentWeek="currentWeek"
      >
      </currentAlbum>

      <br><br>

      <!--      addAlbum button/modal code-->
      <addAlbum v-bind:authToken="authToken"
                v-bind:suggester="suggester"
                v-on:album-added="albumPush"
      ></addAlbum>

<!--start of album list card-->
      <albumTable
         v-bind:albumList="albumList"
         v-on:delete-album="albumDeleted"
         v-on:current-album="currentDisplay"
      ></albumTable>




  </div>
</template>

<script>

import addAlbum from "./components/addAlbum";
import albumTable from "./components/albumTable";
import currentAlbum from "./components/currentAlbum";
export default {
  name: 'App',
  components: {
    addAlbum,
    albumTable,
    currentAlbum
  },
  data() {
        return {
            client_id: '488f284b803448b9a8284b0d43b5a3a0',
            scopes: 'user-top-read',
            // TODO CHANGE THIS REDIRECT URI TO ACTUAL ADDRESS
            redirect_uri: 'http://localhost:8080/',
            me: null,
            authToken: '',
            profilePicSrc: '',
            albumList: [],
            currentWeek: [],
            suggester: '',

        }
  },
  methods: {
      login() {
          let popup = window.open(`https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=${this.scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')

          window.spotifyCallback = (payload) => {
                // alert(payload)

              popup.close()

              fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        'Authorization': `Bearer ${payload}`
                    }
              }).then(response => {
                  // sends token to variable that sends to children
                  this.authToken = payload

                  return response.json()

              }).then(data => {
                  //sets profile name
                  this.me = data.display_name
                  //this will send the current logged in user *users name to the addAlbum component to have suggester name in object
                  this.suggester = data.display_name
                  //sets profile picture
                  this.profilePicSrc = data.images[0].url
                  //logging who enters
                  console.log(data.display_name + ' logged in')
              })
          }
      },
      albumPush(albumObject) {
          //adds album to album list/DB
          this.$album_api.addAlbum(albumObject).then( album => {
              this.updateAlbums()
          }).catch(err => {
              let msg = err.response.data.join(', ')
              alert('Error adding album. \n' + msg)
          })
      },
      albumDeleted(albumObject) {
          // sends album to be DESTROYED
          this.$album_api.deleteAlbum(albumObject.id).then( () => {
              this.updateAlbums()
          })
      },
      currentDisplay(albumObject) {
          // update to change 'archive' boolean value
          // if true the album will not appear in the albumList
         //this calls the update table method below
         this.updateTable(albumObject)

         this.loadDisplay()


      },
      loadDisplay() {
          // this will pull the the current week album
          this.$album_api.getCurrentAlbum().then( album => {

              this.currentWeek = album
          })
      },
      updateAlbums() {
          //retrieves data from DB and adds it to array here
          this.$album_api.getAllAlbums().then( albums => {
              this.albumList = albums
          })
      },
      // sends object to services & api.js to preform update query
      updateTable(albumObject) {
          this.$album_api.updateAlbums(albumObject).then( albums => {

          })
      },

  },
  mounted() {
        this.token = window.location.hash.substr(1).split('&')[0].split("=")[1]

        if (this.token) {
            // alert(this.token)

            window.opener.spotifyCallback(this.token)
        }
        // when page loads will display albums
        this.updateAlbums()
        // when page loads will display current album
        this.loadDisplay()

    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;

    background: #8A2387;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #F27121, #E94057, #8A2387);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #F27121, #E94057, #8A2387); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
    html {
        background: #8A2387;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #F27121, #E94057, #8A2387);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #F27121, #E94057, #8A2387); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    }
    #login-avatar {
        text-align: right;
    }
    #nav {
        color: azure;
        background-color: #2c3e50;
        padding: 20px;
    }

</style>

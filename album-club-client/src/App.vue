<template>
  <div id="app">

    <div class="jumbotron">
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
<!--      TODO create one item list-->

      <currentAlbum
                    v-bind:currentWeek="currentWeek"
      >
      </currentAlbum>

      <br><br>
<!--start of album list card-->
      <albumTable
         v-bind:albumList="albumList"
         v-on:delete-album="albumDeleted"
         v-on:current-album="currentDisplay"
      ></albumTable>


      <br><br>
<!--      addAlbum Elements TODO MAKE INTO MODAL-->
      <addAlbum v-bind:authToken="authToken"
                v-bind:suggester="suggester"
                v-on:album-added="albumPush"
                ></addAlbum>
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
            redirect_uri: 'http://localhost:8080/',
            me: null,
            authToken: '',
            profilePicSrc: '',
            albumList: [],
            currentWeek: {name: 'Error', artist: 'No album set as current album', imgSrc: '@/assets/matt.png'},
            suggester: ''
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
          this.albumList.push(albumObject)
      },
      albumDeleted(albumObject) {
          //let name = this.albumObject.name
          this.albumList.splice(this.albumList.indexOf(albumObject), 1)
      },
      currentDisplay(albumObject) {
          this.currentWeek = albumObject
          this.albumList.splice(this.albumList.indexOf(albumObject), 1)
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
    padding: 30px;
    margin-top: 60px ;
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
    h1 {
        text-align: center;
    }
</style>

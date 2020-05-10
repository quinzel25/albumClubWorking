<template>
    <div>
        <div class="card album-list" id="album-list">
            <h4 class="card-title">Albums</h4>

            <div class="edit-table-toggle form-check">
                <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
                <label for="edit-table" class="form-check-label">Edit table?</label>
            </div>

            <div id="album-table">
                <table class="table">
                    <tr>
                        <th>Cover</th>
                        <th>Name</th>
                        <th>Artist</th>
                        <th>Suggester</th>
                        <th v-show="editTable">Delete</th>
                        <th v-show="editTable">Is it AOTW?</th>
                    </tr>
<!--                    albumRow-->
                    <albumRow

                        v-for="album in albumList"
                        v-bind:albumObject="album"
                        v-bind:edit="editTable"
                        v-on:delete-album="albumDeleted"
                        v-on:current-album="currentWeeksAlbum"


                    >
                    </albumRow>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    // import child
    import albumRow from "./albumRow";


    export default {
        name: "albumTable",
        components: { albumRow },
        data() {
            return {
                editTable: false
            }
        },
        props: {
            albumList: Array
        },
        methods: {
            albumDeleted(albumObject) {
                this.$emit('delete-album', albumObject)
            },
            currentWeeksAlbum(albumObject) {
                this.$emit('current-album', albumObject)
            }
        }
    }
</script>

<style scoped>
 #album-list {
     padding: 20px;
     margin-right: 50px;
     margin-left: 50px;
 }
    h4  {
        text-align: center;
    }
</style>
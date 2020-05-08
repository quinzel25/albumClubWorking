<template>
    <tr class="album-row" >
        <td><img v-bind:src="albumObject.imgSrc" height="100" width="100"></td>
        <td>{{ albumObject.name }}</td>
        <td>{{ albumObject.artist}}</td>
        <td>{{ albumObject.suggester}}</td>
        <td v-show="edit">
            <img class="delete-icon" v-on:click="deleteAlbum(albumObject)" src="@/assets/delete.png">
        </td>
        <td v-show="edit">
            <img class="add-icon" v-on:click="thisWeeksAlbum(albumObject)" src="@/assets/week2.png" height="50" width="auto">
        </td>
    </tr>
</template>

<script>
    export default {
        name: "albumTable",
        props: {
            albumObject: Object,
            edit: Boolean
        },
        methods: {
            deleteAlbum(albumObject) {
                if (confirm(`Delete ${albumObject.name}?`)) {
                    this.$emit('delete-album', albumObject)
                }
            },
            thisWeeksAlbum(albumObject) {
                if (confirm(`Make ${albumObject.name} this weeks album?`)) {
                    this.$emit('current-album', albumObject)
                }
            }
        }
    }
</script>

<style scoped>
td {

}
</style>
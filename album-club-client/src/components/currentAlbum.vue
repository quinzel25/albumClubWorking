<template>
    <div id="current"  v-if="currentWeek">

        <h2>This weeks album...</h2> <br>
        <img v-bind:src="currentWeek.imgSrc" height="300" width="300">
        <br><br>
        <b>{{ currentWeek.name }}</b> <br>
        {{ currentWeek.artist }}
    </div>
</template>

<script>
    export default {
        name: "currentAlbum",

        props: {
            currentWeek: Object
        },
        methods: {
        }
    }
</script>

<style scoped>
#current {
    padding: 20px;
    text-align: center;
    background-color: azure;
    font-size: larger;
}
    h2 {
        text-align: center;
    }

</style>
<template>
    <div id="current"  >

        <h2>This weeks album...</h2> <br>
        <img v-bind:src="currentWeek[0].imgURL" height="300" width="300">
        <br><br>
        <a v-bind:href="currentWeek[0].openLink"> <b>{{ currentWeek[0].name }}</b> </a>
        <br>
        {{ currentWeek[0].artist }}
    </div>
</template>

<script>
    export default {
        name: "currentAlbum",

        props: {
            currentWeek: Array
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
    margin-left: 50px;
    margin-right: 50px;
}
    h2 {
        text-align: center;
    }

</style>
import axios from 'axios'

const base_url = '/api/albums'
export default {

    getAllAlbums() {
        return axios.get(base_url).then(response => {
            return response.data
        })
    },
    addAlbum(album) {
        return axios.post(base_url, album).then(response => {
            return response.data
        })
    },

    updateAlbums(album) {
        return axios.patch('/api/albums/' + album.id , album).then(response => {
            return response.data
        })
    },

    deleteAlbum(id) {
        return axios.delete('/api/albums/' + id).then(response => {
            return response.data
        })
    },
    getAlbum(id) {
        return axios.get('/api/albums/' + id).then(response => {
            return response.data
        })
    },
    getCurrentAlbum() {
        // SELECT * FROM albums WHERE 'archive' = true AND MAX(updatedAt) to get an object that can be used as currentWeek obj

    }


}
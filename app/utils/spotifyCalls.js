const connectSpotify = require("../../config/spotify")

exports.fetchFeaturedPlaylist = async () => {
    try {

        // Connecting spotify application
        const spotifyApi = await connectSpotify()

        const data = await spotifyApi.getFeaturedPlaylists({ limit: 1, offset: Math.floor(Math.random() * 10) })
        return data

    } catch (error) {
        console.log(error.message)
    }
}

exports.fetchSongsfromPlaylist = async (id) => {
    try {

        // Connecting spotify application
        const spotifyApi = await connectSpotify()

        const data = await spotifyApi.getPlaylistTracks(id, { limit: 5 })
        return data.body.items

    } catch (err) {
        console.log(err)
    }
}

exports.fetchSongRequest = async (tracksDetails) => {
    try {
        let searchQuery = '';
        if (tracksDetails.trackName) {
            searchQuery += `track:${tracksDetails.trackName}`
        }
        if (tracksDetails.artist) {
            searchQuery += `artist:${tracksDetails.artist}`
        }

        // Connecting spotify application
        const spotifyApi = await connectSpotify()

        const data = await spotifyApi.searchTracks(searchQuery)
        const dataArray = data.body.tracks.items

        const modifiedDataArray = dataArray.map(track => {
            return {
                track
            }
        })

        return modifiedDataArray

    } catch (err) {
        console.log(err)
    }
}
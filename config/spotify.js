const spotifyWebApi = require('spotify-web-api-node')


// Spotify connectin object

const connectSpotify = () => {
    try {
        const spotifyApi = new spotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
        });

        console.log(`connected ${spotifyApi}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectSpotify
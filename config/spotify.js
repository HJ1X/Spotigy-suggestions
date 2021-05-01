const spotifyWebApi = require('spotify-web-api-node')


// Spotify connection object
const connectSpotify = async () => {
    try {
        // Setting credentials
        const spotifyApi = new spotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET
        });

        // Generating Token
        try {

            // Retrieving token
            authData = await spotifyApi.clientCredentialsGrant()
            // console.log('Spotify access Token is: ', authData.body.access_token)
            // console.log('Spotify access Token expires in: ', authData.body.expires_in)

            // Setting access token 
            spotifyApi.setAccessToken(authData.body.access_token)

            return spotifyApi

        } catch (error) {
            console.log('Some error occured while generating access token', error.message)
        }

    } catch (error) {
        console.log('Connection error', error.message)
        process.exit(1)
    }
}

module.exports = connectSpotify;
const schedule = require('node-schedule')
const spotifyCalls = require('../utils/spotifyCalls')


exports.getSuggestions = (req, res) => {
    const io = req.app.get('socketio')
    let count = 0
    req.app.set('terminateScheduling', false)
    console.log('Starting Job')
    const job = schedule.scheduleJob(`*/${process.env.SCHEDULE_TIME} * * * * *`, async () => {


        if (req.app.get('songRequests').length) {
            // Serving songRequests
            const pendingRequests = req.app.get('songRequests')
            const songRequest = pendingRequests.pop();
            req.app.set('songRequests', pendingRequests)

            console.log(songRequest);

            const songs = await spotifyCalls.fetchSongRequest(songRequest)

            const songsData = {
                songs,
                playlistImage: 'https://images.macrumors.com/t/ttWui3j1tgHFInhN5NGgkhzF23c=/400x0/filters:quality(90)/article-new/2020/04/spotify-app-icon-200x200.jpg?lossy',
                playlistName: "Search results",
                playlistDetails: 'Search results are songs coming from spotify API search results.'
            }

            io.emit("data", songsData)
            console.log(songsData);

        } else {
            // Sending featured playlists data

            const featuredPlaylists = await spotifyCalls.fetchFeaturedPlaylist();
            const playlistName = featuredPlaylists.body.playlists.items[0].name
            const playlistImage = featuredPlaylists.body.playlists.items[0].images[0].url
            const playlistDetails = featuredPlaylists.body.playlists.items[0].description

            const songs = await spotifyCalls.fetchSongsfromPlaylist(featuredPlaylists.body.playlists.items[0].id)

            const songsData = {
                songs,
                playlistImage,
                playlistName,
                playlistDetails
            }

            io.emit("data", songsData)

            count += 1
            console.log(`Playlist ${count} Name: `, songsData.playlistName)

        }

        // Checking terminate condition
        if (req.app.get('terminateScheduling')) {
            console.log('Terminating Job')
            job.cancel()
        }
    })

    res.status(200).send({
        msg: `Next request will be served in ${process.env.SCHEDULE_TIME} seconds    `
    })

}


exports.findSongs = (req, res) => {
    try {

        const pendingSearches = req.app.get('songRequests');
        const searches = [req.body, ...pendingSearches]

        req.app.set('songRequests', searches)

        console.log('Added search request: ', req.body);

        res.status(200).send({
            message: 'successfully added request'
        })

    } catch (err) {
        console.log(err.message)
    }
}


exports.terminateJob = (req, res) => {
    if (!req.app.get('terminateScheduling')) {
        req.app.set('terminateScheduling', true)

        req.app.set('songRequests', [])

        res.status(200).send({
            msg: `Terminating Scheduler`
        })
    }
}
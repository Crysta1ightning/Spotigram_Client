import { useState, useEffect } from 'react';
import './PlaylistView.scss'

function PlaylistView() {

    let playlist_id = 1;

    const [songs,setSongs] = useState([]);
    const [playlists,setPlaylists] = useState([]);

    useEffect(() => {
        fetchPlaylistsData();
    }, [])

    // Fetch each song's id, songname, artist
    const fetchPlaylistsData = async () => {
        let response = await fetch("http://localhost:3000/api/song");
        let songdata = await response.json();
        response = await fetch("http://localhost:3000/api/playlist_song");
        let playlist_songdata = await response.json();
        response = await fetch("http://localhost:3000/api/playlist_owner");
        let playlist_ownerdata = await response.json();
        response = await fetch("http://localhost:3000/api/playlist");
        let playlists = await response.json();
        console.log(playlists);

        let newsongs = []; // {[playlist1: {songname, artist}, song2], [playlist2: song3, song4]}
        let newplaylists = []; // {id, playlistname, [playlist owner]}
        playlists.forEach((playlist) => {
            let id = playlist.playlist_id;
            let this_songs_id = playlist_songdata.filter(ps => ps.playlist_id == id).map(ps => ps.song_id);
            let this_owners = playlist_ownerdata.filter(po => po.playlist_id == id).map(po => po.user_id);
            let this_songs = [];
            songdata.forEach((s) => {
                if (this_songs_id.includes(s.song_id)) this_songs.push({id: s.song_id, songname: s.songname, artist: s.artist, cover: "./images/"+s.song_id+".png"});
            })
            newsongs.push(this_songs);
            newplaylists.push({name: playlist.playlistname, po: this_owners});
        })

        // console.log(newsongs);
        // console.log(newplaylists)
        setSongs(newsongs);
        setPlaylists(newplaylists);
        console.log(playlists[playlist_id]);
    }

    return(
        <div className="playlistview">
            <div className="row title">
                <p>{playlists[playlist_id].name}</p>
                <p>{playlists[playlist_id].po}</p>
            </div>

            <div className="row">
            {songs[playlist_id].map(song =>
                <div className="row">
                    <div className="col">
                        <img src={song.cover} onError={({currentTarget}) => {currentTarget.src = "./images/0.jpg"}} className=""></img>
                    </div>
                    <div className="col">
                        <p className="row">{song.songname}</p>
                        <p className="row">{song.artist}</p>
                    </div>
                </div>
            )}
            </div>



        </div>




    )



}

export default PlaylistView

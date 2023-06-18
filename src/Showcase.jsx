import { useState, useEffect } from 'react';
import './Showcase.scss';
import './App.css';

function Showcase() {
    const [songs, setSongs] = useState([]);
    const [thisUser, setThisUser] = useState("");
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetchPlaylistsData();
        fetchUsersData();
        fetchFriendsData();
        setLoading(false);
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
                if (this_songs_id.includes(s.song_id)) this_songs.push({songname: s.songname, artist: s.artist});
            })
            newsongs.push(this_songs);
            newplaylists.push({name: playlist.playlistname, po: this_owners});
        })

        // console.log(newsongs);
        // console.log(newplaylists)
        setSongs(newsongs);
        setPlaylists(newplaylists);
    }

    // Fetch each user's id, username
    const fetchUsersData = async () => {
        let response = await fetch("http://localhost:3000/api/user");
        let data = await response.json();

        // console.log(data);
        let newusers = [];
        for (let i=0; i<data.length; i++) {
            newusers.push({id: data[i].user_id, username: data[i].username});
        }
        setUsers(newusers);
        // console.log(newsongs);
    }

    // Fetch each friend's id and username for this_user_id
    const fetchFriendsData = async () => {
        let this_user_id = 1; // assume user_id = 1;
        // this should be from localstorage, after sign in we should store this
        // before calling the rest, maybe make sure the token is valid for this user

        let response = await fetch("http://localhost:3000/api/friend?user_id=" + this_user_id);
        let friendsdata = await response.json();
        // console.log(friendsdata);
        let friendsForThisUser = [];
        friendsdata.forEach((friend) => {
            if (friend.user1_id != this_user_id) friendsForThisUser.push(friend.user1_id);
            else friendsForThisUser.push(friend.user2_id);
        })

        response = await fetch("http://localhost:3000/api/user");
        let userdata = await response.json();
        // console.log(userdata);
        let newFriends = []
        userdata.forEach((user) => {
            // console.log(user);
            if (user.user_id == this_user_id) setThisUser(user.username);
            else if (friendsForThisUser.includes(user.user_id)) {
                newFriends.push({user_id: user.user_id, username: user.username})
            }
        })
        setFriends(newFriends);
        // console.log(friendsForThisUser);
        // console.log(newFriends);
    }
    const randomText = (len) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let counter = 0;
        while (counter < len) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
          counter += 1;
        }
        return result;
    }
    const createUser = async (username, password) => {
        username = randomText(5);
        // console.log(username);
        password = randomText(5);
        // console.log(password);

        let response = await(fetch("http://localhost:3000/api/user", {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                encoded_pwd: password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }))
        let data = await response.json();
        // console.log(data);
        // fetch again
        fetchUsersData();
    }


    if (loading) return (
        <div className="Showcase">
        <div className="row">
            <h1>Loading...</h1>
        </div>
        </div>
    )
    return (
        <div className="Showcase">
        <div className="row">
            <h1>Showcase</h1>
        </div>
        <div className="row">
            <h2>Playlists</h2>
            {playlists.map((playlist, i) => 
                <div className="card col">
                    <p className="song">{playlist.name}</p>
                    <p className="artist">{playlist.po.map(po => <>{users[po-1].username}</>)}</p>
                    {songs[i].map(song => 
                        <p>{song.songname}&ensp;{song.artist}</p>
                    )}
                </div>
            )}
            {songs.map(music => 
                <div className="card col">
                    <p className="song">{music.songname}</p>
                    <p className="artist">{music.artist}</p>
                </div>
            )}
        </div>
        <div className="row">
            <h2>Friends for {thisUser}</h2>
            {friends.map(friend => 
                <div className="card col">
                    <p className="song">{friend.username}</p>
                    {/* <p className="artist">{friend.artist}</p> */}
                </div>
            )}
        </div>
        <div className="row">
            <h2>Add a user</h2>
            <button onClick={createUser}>Create random user</button>
        </div>
        <div className="row">
            <h2>Users</h2> 
            {users.map(user => 
                <div className="card col">
                    <p className="song">{user.username}</p>
                </div>
            )}
        </div>
        </div>
    )
}

export default Showcase

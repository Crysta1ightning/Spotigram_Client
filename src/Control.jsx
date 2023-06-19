import { useState, useEffect } from 'react'
import './App.css'
import './Control.scss'

import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
  MDBRange
} from 'mdb-react-ui-kit';

function Control(props) {
  const [volume, setVolume] = useState("2.5")
  const [song, setSong] = useState({image: "", name: "", artist: ""})
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState();
  const [currentTime, setCurrentTime] = useState(0);
  const [curInter, setCurInter] = useState();
  const [curSong, setCurSong] = useState(2);
  const [songData, setSongData] = useState();

  const getCurSong = async () => {
    setCurrentTime(0);
    pauseMusic();
    await new Promise(resolve => setTimeout(resolve, 200));
    setCurSong(props.global.song_id);
    console.log("GET " + props.global.song_id);
  }
  useEffect(() => {
    getCurSong();
  }, [props.global.song_id])

  const fetchSongData = async () => {
    const data = await fetch("http://localhost:3000/api/song").then(r => r.json());
    console.log(data);
    setSongData(data);
    setSong({image: "../images/"+curSong+".png", name: data[curSong-1].songname, artist: data[curSong-1].artist});
  }
  useEffect(() => {
    fetchSongData();
  }, [])

  function formatTime(x) {
    x = Number(x);
    return (x / 60 | 0).toString() + ':' + (x % 60).toString().padStart(2, '0');
  }
  
  const playMusic = () => {
    setPlaying(true);
    let currentInterval = setInterval(( () => {
      if (audio) {
        setCurrentTime(Math.round(audio.currentTime));
        console.log(audio.currentTime);
        if (audio.currentTime == audio.duration) nextSong();
      }
    }), 1000);
    setCurInter(currentInterval);
    audio.play();
  }
  const pauseMusic = () => {
    setPlaying(false);
    clearInterval(curInter);
    audio.pause();
  }


  useEffect(() => {
    setAudio(new Audio("../audios/song"+curSong+".mp3")); 
    console.log("set audio");
  }, [curSong])
  
  const findDuration = async () => {
    if (isNaN(audio.duration)) {
      audio.currentTime = 100000;
      await new Promise(resolve => setTimeout(resolve, 200));
      if (songData) {
        setSong({image: "../images/"+curSong+".png", name: songData[curSong-1].songname, artist: songData[curSong-1].artist});
      } 
      setDuration(audio.duration);
      console.log(song);
      audio.currentTime = 0;    
    } 
  }

  useEffect(() => {
    if (audio) {
      // pauseMusic();
      // console.log("CHANGED!");
      findDuration();
    }
  }, [audio])

  const moveCurrent = (e) => {
    audio.currentTime = e;
    setCurrentTime(e);
  }

  const nextSong = async () => {
    setCurrentTime(0);
    pauseMusic();
    await new Promise(resolve => setTimeout(resolve, 200));
    setCurSong(1+(curSong)%4);
  }
  const lastSong = async () => {
    pauseMusic();
    setCurrentTime(0);
    await new Promise(resolve => setTimeout(resolve, 200));
    setCurSong(1+(curSong+6)%4);
  }
  const moveVolume = (e) => {
    setVolume(e);
    audio.volume = e/5;
  }

   

  // if (localStorage.getItem("user_id") == null) return (<></>)
  return (
    <MDBFooter className='text-white fixed-bottom control'>
      <MDBContainer className='p-3 pb-0'>
        <MDBRow>
          <MDBCol size="1">
            <img src={song.image} className='img-thumbnail mb-3' />
          </MDBCol>
          <MDBCol size="2" className="text-start">
            <h4 className='mt-3'>{song.name}</h4>
            <p>{song.artist}</p>
          </MDBCol>
          <MDBCol size="1" />
          <MDBCol size="4">
            <MDBRow className="justify-content-center">
              {/* <MDBBtn outline color="light" floating className='m-1' role='button'>
                <MDBIcon fas icon='random' />
              </MDBBtn> */}
              <MDBBtn outline color="light" floating className='m-1' role='button' onClick={lastSong}>
                <MDBIcon fas icon='step-backward' />
              </MDBBtn>
              {
                !playing && 
                <MDBBtn color="light" floating className='m-1' role='button' onClick={playMusic}>
                  <MDBIcon fas icon='play' />
                </MDBBtn>
              }
              {
                playing && 
                <MDBBtn color="light" floating className='m-1' role='button' onClick={pauseMusic}>
                  <MDBIcon fas icon='pause' />
                </MDBBtn>
              }
              
              <MDBBtn outline color="light" floating className='m-1' role='button' onClick={nextSong}>
                <MDBIcon fas icon='step-forward' />
              </MDBBtn>
              {/* <MDBBtn outline color="light" floating className='m-1' role='button'>
                <MDBIcon fas icon='repeat' />
              </MDBBtn> */}
            </MDBRow>
            <MDBRow>
              <MDBCol size="1">{formatTime(currentTime)}</MDBCol>
              <MDBCol>
                <MDBRange
                  defaultValue={0}
                  min='0'
                  max={Math.round(duration)}
                  step='1'
                  value={currentTime}
                  onChange={e => moveCurrent(e.target.value)}
                />
              </MDBCol>
              <MDBCol size="1">{formatTime(Math.round(duration))}</MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol size="2" className="text-end">
            {/* <MDBBtn outline color="light" floating className='m-1' role='button'>
              <MDBIcon fas icon="list" />
            </MDBBtn> */}
            <MDBBtn outline color="light" floating className='m-1' role='button' onClick={() => moveVolume(0)}>
              <MDBIcon fas icon={"volume-" + (volume == 0 ? "off" : volume <= 2.5 ? "down" : "up")} />
            </MDBBtn>
          </MDBCol>
          <MDBCol size="1">
            <MDBRange
              defaultValue={2.5}
              min='0'
              max='5'
              step='0.5'
              value={volume}
              onChange={e => moveVolume(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        
      </MDBContainer>
    </MDBFooter>
  )
}

export default Control

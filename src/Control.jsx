import { useState } from 'react'
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

function Control() {
  const [volume, setVolume] = useState("2.5")
  const [song, setSong] = useState({ length: "180", image: "https://upload.wikimedia.org/wikipedia/it/thumb/f/f0/Screenshot_Videoclip_Never_Gonna_Give_You_Up.png/520px-Screenshot_Videoclip_Never_Gonna_Give_You_Up.png", name: "Name", artist: "Artist" })
  const [current, setCurrent] = useState("0")

  function formatTime(x) {
    x = Number(x);
    return (x / 60 | 0).toString() + ':' + (x % 60).toString().padStart(2, '0');
  }

  return (
    <MDBFooter className='text-center text-white fixed-bottom control'>
      <MDBContainer className='p-3 pb-0'>
        <MDBRow>
          <MDBCol size="1">
            <img src={song.image} className='img-thumbnail' />
          </MDBCol>
          <MDBCol size="2" className="text-start">
            <h4>{song.name}</h4>
            <p>{song.artist}</p>
          </MDBCol>
          <MDBCol size="1" />
          <MDBCol size="4">
            <MDBRow className="justify-content-center">
              <MDBBtn outline color="light" floating className='m-1' role='button'>
                <MDBIcon fas icon='random' />
              </MDBBtn>
              <MDBBtn outline color="light" floating className='m-1' role='button'>
                <MDBIcon fas icon='step-backward' />
              </MDBBtn>
              <MDBBtn color="light" floating className='m-1' role='button'>
                <MDBIcon fas icon='play' />
              </MDBBtn>
              <MDBBtn outline color="light" floating className='m-1' role='button'>
                <MDBIcon fas icon='step-forward' />
              </MDBBtn>
              <MDBBtn outline color="light" floating className='m-1' role='button'>
                <MDBIcon fas icon='repeat' />
              </MDBBtn>
            </MDBRow>
            <MDBRow>
              <MDBCol size="1">{formatTime(current)}</MDBCol>
              <MDBCol>
                <MDBRange
                  defaultValue={0}
                  min='0'
                  max={song.length}
                  step='1'
                  value={current}
                  onChange={e => setCurrent(e.target.value)}
                />
              </MDBCol>
              <MDBCol size="1">{formatTime(song.length)}</MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol size="2" className="text-end">
            <MDBBtn outline color="light" floating className='m-1' role='button'>
              <MDBIcon fas icon="list" />
            </MDBBtn>
            <MDBBtn outline color="light" floating className='m-1' role='button' onClick={() => setVolume("0")}>
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
              onChange={e => setVolume(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  )
}

export default Control

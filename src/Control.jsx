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
  const [volume, setVolume] = useState(2.5)
  const [song, setSong] = useState({ length: 180, current: 0, image: "https://upload.wikimedia.org/wikipedia/it/thumb/f/f0/Screenshot_Videoclip_Never_Gonna_Give_You_Up.png/520px-Screenshot_Videoclip_Never_Gonna_Give_You_Up.png", name: "Name", artist: "Artist" })

  return (
    <MDBFooter className='bg-dark text-center text-white' class="control">
      <MDBContainer className='p-3 pb-0'>
        <MDBRow>
          <MDBCol size="1">
            <img src={song.image} className='img-thumbnail'/>
          </MDBCol>
          <MDBCol size="2" className="text-start">
            <h4>{song.name}</h4>
            <p>{song.artist}</p>
          </MDBCol>
          <MDBCol size="1" />
          <MDBCol size="4">
            <MDBRow className="justify-content-center">
              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fas icon='random' />
              </MDBBtn>
              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fas icon='step-backward' />
              </MDBBtn>
              <MDBBtn color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fas icon='play' />
              </MDBBtn>
              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fas icon='step-forward' />
              </MDBBtn>
              <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
                <MDBIcon fas icon='repeat' />
              </MDBBtn>
            </MDBRow>
            <MDBRow>
              <MDBRange
                defaultValue={0}
                min='0'
                max={song.length}
                step='0.5'
                value={song.current}
                onChange={e => { song.current = e.target.value; setSong(song); }}
              />
            </MDBRow>
          </MDBCol>
          <MDBCol size="2" className="text-end">
            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
              <MDBIcon fas icon="list" />
            </MDBBtn>
            <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
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

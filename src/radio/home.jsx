import { useState } from 'react'
import '../App.css'
import './Radio.scss'
import './home.scss';

function Home(props) {
  const [friendRadio, setFriendRadio] = useState([
      {id: 0, title: "隨便播", owner: "li3", viewers: 29},
      {id: 1, title: "勳歌的歌單", owner: "kk4944", viewers: 5},
      {id: 2, title: "隨便播", owner: "li3", viewers: 29},
      {id: 3, title: "勳歌的歌單", owner: "kk4944", viewers: 5},
      {id: 4, title: "隨便播", owner: "li3", viewers: 29},
      {id: 5, title: "勳歌的歌單", owner: "kk4944", viewers: 5},
  ])

  const handleSearch = () => {

  }

  return (
<div className="radioPage">
      <div class="row justify-content-between " id="radioTop">
        <h1 class="col-2 d-inline-flex">電台</h1>
        <div class="col-3 justify-content-end">
        <input 
          className="search"
          type = "search" 
          placeholder = "ID/電台名稱" 
          onChange = {handleSearch}
        />
        {/* <button type="button" class="btn-search" alt="..."></button> */}
        <img src="images/icon_search.png" class="" type="button" alt="..."></img>
        </div>

      </div>
      <div class="row title"><p class="col-2">你的電台</p></div>
      <div class="row">
        <div class="col-2">
          <img type="button" class="card-img-top offset-5" src="images/add_radio.png" onClick={()=>{
            props.setPage(1);
          }}></img>
        </div>
        

      </div>
      <div class="row title"><p class="col-2">好友電台</p></div>
      <div className="friendRadio" class="row">
        {
          friendRadio.map(radio => 

            <div className="radio inline col">
              <img type="button" src="images/radio_cover.png" class="card-img-top" alt="..."></img>
               <p className="inline">{radio.title}</p>&emsp;
               <p className="inline">{radio.owner}</p>&emsp;
               <p className="inline">{radio.viewers}</p>
            </div>
          )
        }
      </div>
      <div class="row title"><p class="col-3">熱門電台</p></div>
      <div className="friendRadio" class="row">
        {
          friendRadio.map(radio => 
            <div className="radio inline col">
              <img type="button" src="images/radio_cover.png" class="card-img-top" alt="..."></img>
               <p className="inline">{radio.title}</p>&emsp;
               <p className="inline">{radio.owner}</p>&emsp;
               <p className="inline">{radio.viewers}</p>
            </div>
          )
        }
      </div>
      
    </div>
  )
}

export default Home

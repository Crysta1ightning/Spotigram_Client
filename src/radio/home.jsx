import { useState } from 'react'
import '../App.css'
import './Radio.scss'
import './Home.scss';

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
      <div class="row">
        <h1 class="col-2">電台</h1>
        <div class="col-7"></div>
        <span class="col">
        <input 
          className="search"
          type = "search" 
          placeholder = "ID/電台名稱" 
          onChange = {handleSearch}
        />
        {/* <button type="button" class="btn-search" alt="..."></button> */}
        <img src="images/icon_search.png" type="button" alt="..."></img>
        </span>

      </div>
      <div class="row title"><p class="col-3">你的電台</p></div>
      <div class="row">
        <div class="col-2"></div>
        <button type="button" class="col btn-radio col-5 btn-sq-responsive" onClick={()=>{
          props.setPage(1);
        }}></button>

      </div>
      <div class="row title"><p class="col-3">好友電台</p></div>
      <div className="friendRadio" class="row">
        {
          friendRadio.map(radio => 
            // <div className="radio inline">
            //   <div className="inline">{radio.title}</div>&emsp;
            //   <div className="inline">{radio.owner}</div>&emsp;
            //   <div className="inline">{radio.viewers}</div>
            // </div>
            // <div class="radio card col-50" style="width: 15rem;">
            //     <img src="images/radio_cover.png" class="card-img-top" alt="..."></img>
            //     <div class="card-body">
            //         <p class="card-text ">{radio.title}</p>
            //         <p class="card-text artist">{radio.owner}'s radio</p>
            //         <p>{radio.viewers}</p>
            //     </div>
            // </div>
            <div className="radio inline col">
              <img src="images/radio_cover.png" class="card-img-top" alt="..."></img>
               <p className="card-text inline">{radio.title}</p>&emsp;
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
              <img src="images/radio_cover.png" class="card-img-top" alt="..."></img>
               <p className="card-text inline">{radio.title}</p>&emsp;
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

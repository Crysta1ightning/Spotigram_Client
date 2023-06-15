import { useState } from 'react'
import '../App.css'
import './Radio.scss';

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
        <h3 >搜尋</h3>
        <input 
          className="search"
          type = "search" 
          placeholder = "Search" 
          onChange = {handleSearch}
        /></span>
      </div>
      <div class="row">
        <h3 class="col-2">你的電台</h3>
        <button class="col-3" onClick={()=>{
          props.setPage(1);
        }}>+</button>
      </div>
      <div className="friendRadio" class="row">
        <h3>好友電台</h3>
        {
          friendRadio.map(radio => 
            <div className="radio inline">
              <div className="inline">{radio.title}</div>&emsp;
              <div className="inline">{radio.owner}</div>&emsp;
              <div className="inline">{radio.viewers}</div>
            </div>
          )
        }
      </div>
      <div className="friendRadio" class="row">
      <h3>熱門電台</h3>
        {
          friendRadio.map(radio => 
            <div className="radio inline">
              <div className="inline">{radio.title}</div>&emsp;
              <div className="inline">{radio.owner}</div>&emsp;
              <div className="inline">{radio.viewers}</div>
            </div>
          )
        }
      </div>
      
    </div>
  )
}

export default Home

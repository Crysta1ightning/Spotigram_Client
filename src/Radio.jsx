import { useState } from 'react'
import './App.css'
import './Radio.scss';

function Radio() {
  const [count, setCount] = useState(0)
  const [friendRadio, setFriendRadio] = useState([
    {id: 0, title: "隨便播", owner: "li3", viewers: 29},
    {id: 1, title: "勳歌的歌單", owner: "kk4944", viewers: 5},
    {id: 2, title: "隨便播", owner: "li3", viewers: 29},
    {id: 3, title: "勳歌的歌單", owner: "kk4944", viewers: 5},
    {id: 4, title: "隨便播", owner: "li3", viewers: 29},
    {id: 5, title: "勳歌的歌單", owner: "kk4944", viewers: 5},
  ])
  return (
    <div className="radioPage">
      <h1>電台</h1>
      <div>
        <h3>搜尋</h3>
        <input 
          className="search"
          type = "search" 
          placeholder = "Search" 
          onChange = {handleSearch}
        />
      </div>
      <div>
        <h3>你的電台</h3>
        <button onClick={()=>{
          createRadio();
        }}>+</button>
      </div>
      <h3>好友電台</h3>
      <div className="friendRadio">
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
      <h3>熱門電台</h3>
      <div className="friendRadio">
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
const handleSearch = () => {

}

export default Radio

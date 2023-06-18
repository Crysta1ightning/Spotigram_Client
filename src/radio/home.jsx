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
      <div className="row justify-content-between " id="radioTop">
        <h1 className="col-2 d-inline-flex">電台</h1>
        <div className="col-3 justify-content-end">
        <input 
          className="search"
          type = "search" 
          placeholder = "ID/電台名稱" 
          onChange = {handleSearch}
        />
        <img src="images/icon_search.png" type="button" alt="..."></img>
        </div>
      </div>

      <div className="row">
      <p className="row title">你的電台</p>
        <div className="row">
          <button type="button" className="col-2 btn btn-radio img-fluid" src="images/add_radio.png" onClick={()=>{
            props.setPage(1);
          }}></button>
          <div className="col">
            <div className="scrolling-wrapper">
              {friendRadio.map(radio => 
                  <div className="radio col-3">
                    <img type="button" src="images/radio_cover.png" className="card-img-top" alt="..."></img>
                    <p className="">{radio.title}&emsp;{radio.owner}&emsp;{radio.viewers}</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <p className="row title">好友電台</p>
        <div className="scrolling-wrapper">
          {friendRadio.map(radio => 
              <div className="radio col-2">
                <img type="button" src="images/radio_cover.png" className="card-img-top" alt="..."></img>
                <p className="">{radio.title}&emsp;{radio.owner}&emsp;{radio.viewers}</p>
              </div>
            )}
        </div>
      </div>

      <div className="row ">
        <p className="row title ">熱門電台</p>
        <div className="scrolling-wrapper">
          {friendRadio.map(radio => 
              <div className="radio col-2">
                <img type="button" src="images/radio_cover.png" className="card-img-top" alt="..."></img>
                <p className="">{radio.title}&emsp;{radio.owner}&emsp;{radio.viewers}</p>
              </div>
            )}
        </div>
      </div>
      <div className='row'>
          <p className='bind'>u can't see me</p>
          <p className='bind'>u can't see me</p>
          <p className='bind'>u can't see me</p>
      </div>
      
    </div>
  )
}

export default Home

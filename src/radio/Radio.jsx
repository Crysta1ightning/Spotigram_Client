import { useState } from 'react'
import '../App.css'
import './Radio.scss';
import Home from './home';
import CreateRadio from './createRadio';

function Radio() {
  const [page, setPage] = useState(0);
  if (page == 0) {
    return (
      <Home setPage={setPage}/>
    )
  } else if (page == 1) {
    return (
      <CreateRadio setPage={setPage}/>
    )
  }

  
}

export default Radio

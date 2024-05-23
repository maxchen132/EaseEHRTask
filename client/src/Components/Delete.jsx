import React from 'react';
import axios from 'axios';

const Delete = ({ id, setOpen }) => {

  const handleClick = async () => {
    console.log(id);
    try {
      await axios.delete("http://localhost:8800/nurses/" + id);
      window.location.reload();
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='modalBackground'>
      <div className = 'modalContainer'>
        <button className='exit' onClick={() => {setOpen(false)}}> X </button>
        <div className='form'>
          <div className='title'>
            <h1>Delete Nurse</h1>
          </div>
          <div className='body'>
            Are you sure you want to delete?
          </div>
          <div className='footer'>
            <button onClick={handleClick}> Confirm </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delete
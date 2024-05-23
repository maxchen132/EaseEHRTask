import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Add = ({ setOpen }) => {

  const [nurse, setNurse] = useState({
    name: "",
    licensenum: null,
    dob: null,
    age: null
  });

  const calculateAge = (dob) => {
    let today = new Date();
    let birthDate = new Date(dob);
    console.log(birthDate.getFullYear());
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  const handleChange = (e) => {
    setNurse((prev) => ({ ...prev, [e.target.name]: e.target.value}))
    if (nurse.dob) {
      setNurse((prev) => ({ ...prev, age: calculateAge(prev.dob)}))
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/nurses", nurse);
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
            <h1>Add New Nurse</h1>
          </div>
          <div className='body'>
            <span>Name: </span>
            <input type='text' name='name' onChange={handleChange}/>
            <br/>
            <span>License Number: </span>
            <input type='number' name='licensenum' onChange={handleChange}/>
            <br/>
            <span>Date of Birth: </span>
            <input type='date' name='dob' onChange={handleChange}/>
            <br/>
          </div>
          <div className='footer'>
            <button onClick={handleClick}> Add </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
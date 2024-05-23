import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import {CSVLink} from "react-csv";

const Nurses = () => {
  const [nurses, setNurses] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [nurseId, setNurseId] = useState(1);


  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/nurses");
        setNurses(res.data);
      } catch(err) {
        console.log(err);
      }
    }
    fetchAllBooks();

  }, []);

  const handleDelete = (id) => {
    setOpenDelete(true);
    setNurseId(id);
  }

  const handleEdit = (id) => {
    setOpenEdit(true);
    setNurseId(id);
  }

  return (
    <div className = 'nurseContainer'>
      <h1> Nurses </h1>
      <table className='nurseTable'>
        <thead>
          <tr>
            <th className='cell'> Name </th>
            <th className='cell'> License Number </th>
            <th className='cell'> Date of Birth </th>
            <th className='cell'> Age </th>
          </tr>
        </thead>
        <tbody>
          {
            nurses.map((nurse) => {
              return (
                <tr key = {nurse.id}>
                  <td className='cell'>{nurse.name}</td>
                  <td className='cell'>{nurse.licensenum}</td>
                  <td className='cell'>{nurse.dob.split('T')[0]}</td>
                  <td className='cell'>{nurse.age}</td>
                  <td className='cellButton'><button className='edit' onClick={() => handleEdit(nurse.id)}> Edit </button></td>
                  <td className='cellButton'><button className='delete' onClick={() => handleDelete(nurse.id)}> Delete </button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <button className='add' onClick={() => {setOpenAdd(true)}}> Add </button>
      <button className='add'> <CSVLink data={nurses}> Download </CSVLink> </button>
      {openAdd && <Add setOpen={setOpenAdd}/>}
      {openDelete && <Delete id = {nurseId} setOpen = {setOpenDelete}/>}
      {openEdit && <Edit id = {nurseId} setOpen = {setOpenDelete}/>}
    </div>
  )
}

export default Nurses;
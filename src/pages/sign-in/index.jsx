
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './../../utils/notification';
import { ToastContainer } from 'react-toastify';
const Index = () => {
const [form, setForm] = useState({})
const navigate = useNavigate()


const handleChange = (event) =>{
  const {name, value} = event.target
  setForm ({...form, [name]:value})
}

const handleSubmit = (e) =>{
  e.preventDefault()
  console.log(form);
  if (form.username === "admin") {
    Notification({title: "succes", type: "success"})
    setTimeout(()=>{
      navigate("/admin-layout")
    },2000)
  }else if (form.username === "student") {
    navigate("/student-layout")
  }else{
    Notification({title: "Xatolik mavjud", type: "error"})
  }
}

  return (
    <div className='container'> 
      <ToastContainer/>
        <div className="row mt-5">
          <div className="col-md-6 offset-3">
            <div className="card">
              <div className="card-header">
                <h1 className='text-center'>login</h1>
              </div>
              <div className="card-body">
                <form id="form" onSubmit={handleSubmit}>
                   <TextField  fullWidth label="username" name='username' onChange={handleChange} className='my-1'/>
                   <TextField type='password' fullWidth label="password" name='password' onChange={handleChange} className='my-1'/>
                </form>
              </div>
              <div className="card-footer">
                  <Button form="form" type='submit' variant="contained" >save</Button>
                  
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Index;

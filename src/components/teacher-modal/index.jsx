import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function KeepMountedModal({ open, handleClose, course, setOpen, setData, data, editingCourse }) {
  const [form, setForm] = useState({}); 

  useEffect(() => {
    if (open) {
      if (editingCourse?.id) {
        setForm({
          name: editingCourse.name || '',
          course: editingCourse.course || ''
        });
      } else {
        setForm({ name: '', age: '' , phone: '' });
      }
    }
  }, [open, editingCourse]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse?.id) {
        const res = await axios.put(`http://localhost:3000/student/${editingCourse.id}`, form);
        setData(data.map(item => (item.id === editingCourse.id ? res.data : item)));
      } else {
        const res = await axios.post("http://localhost:3000/student", form);
        setData([...data, res.data]);
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" align="center" variant="h6" component="h2">
            {editingCourse?.id ? 'Edit Teacher' : 'Add Teacher'}
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="course"
              label="Course"
              value={form.course || ''}
              onChange={handleChange}
            >
              {course.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              label="Teacher name"
              name="name"
              value={form.name || ''}
              onChange={handleChange}
              sx={{ marginY: '15px' }}
            />
          </FormControl>

          <Button variant="contained" color="success"  onClick={handleSubmit}>
            {editingCourse?.id ? 'Update' : 'Save'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

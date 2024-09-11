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

export default function StudentModal({ open, handleClose, course, teacher, group, setOpen, setData, data, editingStudent }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (open) {
      if (editingStudent?.id) {
        setForm({
          name: editingStudent.name || '',
          age: editingStudent.age || '',
          phone: editingStudent.phone || '',
          course: editingStudent.course || '',
          teacher: editingStudent.teacher || '',
          group: editingStudent.group || ''
        });
      } else {
        setForm({ name: '', age: '', phone: '', course: '', teacher: '', group: '' });
      }
    }
  }, [open, editingStudent]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent?.id) {
        const res = await axios.put(`http://localhost:3000/student/${editingStudent.id}`, form);
        setData(data.map(item => (item.id === editingStudent.id ? res.data : item)));
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
            {editingStudent?.id ? 'Edit Student' : 'Add Student'}
          </Typography>

          <TextField
            fullWidth
            label="Name"
            name="name"
            value={form.name || ''}
            onChange={handleChange}
            sx={{ marginY: '7px' }}
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={form.age || ''}
            onChange={handleChange}
            sx={{ marginY: '7px' }}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={form.phone || ''}
            onChange={handleChange}
            sx={{ marginY: '7px' }}
          />
          <FormControl fullWidth sx={{marginY: "7px"}}>
            <InputLabel id="course-select-label">Course</InputLabel>
            <Select
              label="Phone"
              id="course-select"
              name="course"
              value={form.course || ''}
              onChange={handleChange}
            >
              {course.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{marginY: "7px"}}>
            <InputLabel id="teacher-select-label">Teacher</InputLabel>
            <Select
              label="Phone"
              id="teacher-select"
              name="teacher"
              value={form.teacher || ''}
              onChange={handleChange}
            >
              {teacher.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{marginY: "7px"}}>
            <InputLabel id="group-select-label">Group</InputLabel>
            <Select
              label="Phone"
              id="group-select"
              name="group"
              value={form.group || ''}
              onChange={handleChange}
            >
              {group.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="success" onClick={handleSubmit}>
            {editingStudent?.id ? 'Update' : 'Save'}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

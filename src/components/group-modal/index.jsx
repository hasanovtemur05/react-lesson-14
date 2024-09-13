import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function GroupModal({ open, handleClose, course, setOpen, setData, data, editingGroup }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (open) {
      if (editingGroup?.id) {
        setForm({
          name: editingGroup.name || "",
          course: editingGroup.course || "",
        });
      } else {
        setForm({ name: "", course: "" });
      }
    }
  }, [open, editingGroup]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGroup?.id) {
        const res = await axios.put(`http://localhost:3000/group/${editingGroup.id}`, form);
        setData(data.map((item) => (item.id === editingGroup.id ? res.data : item)));
      } else {
        const res = await axios.post("http://localhost:3000/group", form);
        setData([...data, res.data]);
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" align="center" variant="h6" component="h2">
          {editingGroup?.id ? "Edit Group" : "Add Group"}
        </Typography>

        <TextField fullWidth label="Group Name" name="name" value={form.name || ""} onChange={handleChange} sx={{ marginY: "15px" }} />
        <FormControl fullWidth>
          <InputLabel id="course-select-label">Course</InputLabel>
          <Select labelId="course-select-label" id="course-select" name="course" value={form.course || ""} onChange={handleChange}>
            {course.map((item, index) => (
              <MenuItem value={item.name} key={index}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="success" onClick={handleSubmit}>
          {editingGroup?.id ? "Update" : "Save"}
        </Button>
      </Box>
    </Modal>
  );
}

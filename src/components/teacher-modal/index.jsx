import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

export default function TeacherModal({ open, handleClose, setData, data, setOpen, editingTeacher }) {
  const [form, setForm] = useState({});

  // Modal ochilganda formani tahrir qilish yoki yangi ma'lumot qo'shish
  useEffect(() => {
    if (open) {
      if (editingTeacher?.id) {
        setForm({
          name: editingTeacher.name || "",
          course: editingTeacher.course || "",
        });
      } else {
        setForm({ name: "", course: "" });
      }
    }
  }, [open, editingTeacher]);

  // Formdagi input o'zgarishini kuzatish
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  // Form yuborilganda (yangi qo'shish yoki tahrirlash)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeacher?.id) {
        const res = await axios.put(`http://localhost:3000/teacher/${editingTeacher.id}`, form);
        setData(data.map((item) => (item.id === editingTeacher.id ? res.data : item)));
      } else {
        const res = await axios.post("http://localhost:3000/teacher", form);
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
          {editingTeacher?.id ? "Edit Teacher" : "Add Teacher"}
        </Typography>

        <TextField
          fullWidth
          label="Teacher Name"
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          sx={{ marginY: "15px" }}
        />
        <TextField
          fullWidth
          label="Course"
          name="course"
          value={form.course || ""}
          onChange={handleChange}
          sx={{ marginY: "15px" }}
        />
        <Button variant="contained" color="success" onClick={handleSubmit}>
          {editingTeacher?.id ? "Update" : "Save"}
        </Button>
      </Box>
    </Modal>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { TeacherTable, TeacherModal } from "@components";
import Button from "@mui/material/Button";

const Teacher = () => {
  const [data, setData] = useState([]); // O'qituvchilar ro'yxati
  const [open, setOpen] = useState(false); // Modalni ochish uchun
  const [editingTeacher, setEditingTeacher] = useState({}); // Tahrirlash uchun o'qituvchi

  // O'qituvchilarni olish uchun useEffect hook
  useEffect(() => {
    axios
      .get("http://localhost:3000/teacher")
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => {
        console.error("Error fetching teacher data: ", error);
      });
  }, []);

  // Modalni yopish funksiyasi
  const handleClose = () => {
    setOpen(false);
    setEditingTeacher({}); // Modal yopilganda tahrirlashni tozalash
  };

  // Modalni ochish funksiyasi (yangi o'qituvchi qo'shish yoki tahrirlash)
  const openModal = () => {
    setOpen(true);
  };

  // O'qituvchini o'chirish funksiyasi
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/teacher/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting teacher: ", error);
    }
  };

  // Tahrirlash tugmasini bosganda chaqiriladigan funksiyasi
  const handleEdit = (id) => {
    const teacher = data.find((item) => item.id === id);
    setEditingTeacher(teacher);
    openModal();
  };

  return (
    <div>
      <TeacherModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
        setOpen={setOpen}
        editingTeacher={editingTeacher}
      />
      <Button variant="contained" sx={{ marginBottom: "20px" }} onClick={openModal}>
        Add Teacher
      </Button>
      <TeacherTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Teacher;

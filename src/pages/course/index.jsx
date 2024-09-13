import axios from "axios";
import { useEffect, useState } from "react";
import { CourseTable, CourseModal } from "@components";
import Button from "@mui/material/Button";

const Course = () => {
  const [data, setData] = useState([]); // Kurslar ro'yxati
  const [open, setOpen] = useState(false); // Modalni ochish uchun
  const [editingCourse, setEditingCourse] = useState({}); // Tahrirlash uchun kurs

  // Kurslarni olish uchun useEffect hook
  useEffect(() => {
    axios
      .get("http://localhost:3000/course")
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => {
        console.error("Error fetching course data: ", error);
      });
  }, []);

  // Modalni yopish funksiyasi
  const handleClose = () => {
    setOpen(false);
    setEditingCourse({}); // Modal yopilganda tahrirlashni tozalash
  };

  // Modalni ochish funksiyasi (yangi kurs qo'shish yoki tahrirlash)
  const openModal = () => {
    setOpen(true);
  };

  // Kursni o'chirish funksiyasi
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/course/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
  };

  // Tahrirlash tugmasini bosganda chaqiriladigan funksiyasi
  const handleEdit = (id) => {
    const course = data.find((item) => item.id === id);
    setEditingCourse(course);
    openModal();
  };

  return (
    <div>
      <CourseModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
        setOpen={setOpen}
        editingCourse={editingCourse}
      />
      <Button variant="contained" sx={{ marginBottom: "20px" }} onClick={openModal}>
        Add Course
      </Button>
      <CourseTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Course;

import axios from "axios";
import { useEffect, useState } from "react";
import { GroupTable, GroupModal } from "@components";
import Button from "@mui/material/Button";

const Group = () => {
  const [data, setData] = useState([]); // Guruhlar ro'yxati
  const [course, setCourse] = useState([]); // Kurslar ro'yxati
  const [open, setOpen] = useState(false); // Modalni ochish
  const [editingGroup, setEditingGroup] = useState({}); // Tahrir qilinayotgan guruh

  // Guruhlar va kurslar ma'lumotlarini olish uchun useEffect hook
  useEffect(() => {
    axios
      .get("http://localhost:3000/group")
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => {
        console.error("Error fetching group data: ", error);
      });

    axios
      .get("http://localhost:3000/course")
      .then((res) => {
        setCourse(res?.data);
      })
      .catch((error) => {
        console.error("Error fetching course data: ", error);
      });
  }, []);

  // Modalni yopish funksiyasi
  const handleClose = () => {
    setOpen(false);
    setEditingGroup({}); // Modalni yopishda tahrirlanayotgan guruhni tozalash
  };

  // Modalni ochish funksiyasi (tahrirlash uchun)
  const openModal = () => {
    setOpen(true);
  };

  // Guruhni o'chirish funksiyasi
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/group/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting group: ", error);
    }
  };

  // Tahrirlash tugmachasini bosganda chaqiriladigan funksiyasi
  const handleEdit = (id) => {
    const group = data.find((item) => item.id === id);
    setEditingGroup(group);
    openModal();
  };

  return (
    <div>
      <GroupModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
        setOpen={setOpen}
        course={course}
        editingGroup={editingGroup} // Tahrirlash uchun ma'lumotlarni yuborish
      />
      <Button variant="contained" sx={{ marginBottom: "20px" }} onClick={openModal}>
        Add Group
      </Button>
      <GroupTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Group;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { TeacherTable, TeacherModal } from '@components';
import Button from '@mui/material/Button';

const Index = () => {
  const [data, setData] = useState([]); 
  const [course, setCourse] = useState([]); 
  const [open, setOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState({}); 

  useEffect(() => {
    axios
      .get('http://localhost:3000/teacher')
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => {
        console.error('Error fetching teacher data: ', error);
      });
  }, []); 

  const handleClose = () => {
    setOpen(false);
    setEditingCourse({});
  };

  const openModal = async () => {
    try {
      const res = await axios.get('http://localhost:3000/course');
      setCourse(res?.data);
      setOpen(true); 
    } catch (error) {
      console.error('Error fetching course data: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/teacher/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting teacher: ', error);
    }
  };

  const handleEdit = (id) => {
    const teacher = data.find((item) => item.id === id);
    setEditingCourse(teacher);
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
        course={course}
        editingCourse={editingCourse}
      />
      <Button variant="contained" sx={{ marginBottom: '20px' }} onClick={openModal}>
        Open Modal
      </Button>
      <TeacherTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Index;

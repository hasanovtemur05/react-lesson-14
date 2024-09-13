import axios from 'axios';
import { useEffect, useState } from 'react';
import { StudentTable, StudentModal } from '@components';
import Button from '@mui/material/Button';

const StudentPage = () => {
  const [data, setData] = useState([]); 
  const [course, setCourse] = useState([]); 
  const [teacher, setTeacher] = useState([]); 
  const [group, setGroup] = useState([]); 
  const [open, setOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState({}); 

  useEffect(() => {
    // student data
    axios
      .get('http://localhost:3000/student')
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => {
        console.error('Error fetching student data: ', error);
      });

    // course data
    axios
      .get('http://localhost:3000/course')
      .then((res) => {
        setCourse(res?.data);
      })
      .catch((error) => {
        console.error('Error fetching course data: ', error);
      });

    // teacher data
    axios
      .get('http://localhost:3000/teacher')
      .then((res) => {
        setTeacher(res?.data);
      })
      .catch((error) => {
        console.error('Error fetching teacher data: ', error);
      });

    // Fetch group data
    axios
      .get('http://localhost:3000/group')
      .then((res) => {
        setGroup(res?.data);
      })
      .catch((error) => {
        console.error('Error fetching group data: ', error);
      });
  }, []); 

  const handleClose = () => {
    setOpen(false);
    setEditingStudent({}); 
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/student/${id}`);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting student: ', error);
    }
  };

  const handleEdit = (id) => {
    const student = data.find(item => item.id === id);
    setEditingStudent(student);
    openModal();
  };

  return (
    <div>
      <StudentModal 
        open={open} 
        handleClose={handleClose} 
        data={data} 
        setData={setData} 
        setOpen={setOpen} 
        course={course} 
        teacher={teacher} 
        group={group} 
        editingStudent={editingStudent} 
      />
      <Button variant="contained" sx={{ marginBottom: '20px' }} onClick={openModal}>
        Add Student
      </Button>
      <StudentTable 
        data={data} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default StudentPage;

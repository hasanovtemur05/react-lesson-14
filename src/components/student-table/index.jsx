import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function StudentTable({ data, onEdit, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">T/R</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Course</TableCell>
            <TableCell align="center">Teacher</TableCell>
            <TableCell align="center">Group</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.age}</TableCell>
              <TableCell align="center">{item.phone}</TableCell>
              <TableCell align="center">{item.course}</TableCell>
              <TableCell align="center">{item.teacher}</TableCell>
              <TableCell align="center">{item.group}</TableCell>
              <TableCell align="center">
                <Button variant="contained" color="warning" sx={{ marginRight: '10px' }} onClick={() => onEdit(item.id)}>
                  <ModeEditIcon />
                </Button>
                <Button variant="contained" color="error" onClick={() => onDelete(item.id)}>
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

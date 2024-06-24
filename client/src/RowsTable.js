import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RowsTable = () => {
    const [users, setUsers] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${apiUrl}/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch(`${apiUrl}/users`);
            const result = await response.json();
            setUsers(result);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchUsers();
      }, [apiUrl]);

    return (
        <TableContainer component={Paper} style={{ maxHeight: 400, overflow: 'auto' }}>
            <Typography variant="h6" gutterBottom component="div" style={{ padding: 16 }}>
                User List
            </Typography>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.First_Name}</TableCell>
                            <TableCell>{user.Last_name}</TableCell>
                            <TableCell>{user.City}</TableCell>
                            <TableCell>{user.Email}</TableCell>
                            <TableCell>{user.Phone_Number}</TableCell>
                            <TableCell>
                                <IconButton color="secondary" onClick={() => deleteUser(user.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RowsTable;

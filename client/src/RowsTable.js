import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RowsTable = () => {
    const [users, setUsers] = useState([]);
    const address = process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_URL
        : window.location.protocol + '//' + window.location.host;

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${address}/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${address}/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch(`${address}/api/users`);
            const result = await response.json();
            setUsers(result);
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchUsers();
      }, [address]);

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
                        <TableRow key={user.user_id}>
                            <TableCell>{user.user_id}</TableCell>
                            <TableCell>{user.First_Name}</TableCell>
                            <TableCell>{user.Last_Name}</TableCell>
                            <TableCell>{user.City}</TableCell>
                            <TableCell>{user.Email}</TableCell>
                            <TableCell>{user.Phone_Number}</TableCell>
                            <TableCell>
                                <IconButton color="secondary" onClick={() => deleteUser(user.user_id)}>
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

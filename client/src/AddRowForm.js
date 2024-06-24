import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';

const AddRowForm = ({ onUserAdded }) => {
    const [First_Name, setFirstName] = useState('');
    const [Last_Name, setLastName] = useState('');
    const [City, setCity] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone_Number, setPhoneNumber] = useState('');
    const address = process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_API_URL
        : window.location.protocol + '//' + window.location.host;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${address}/api/users`, {
                First_Name,
                Last_Name,
                City,
                Email,
                Phone_Number
            });
            onUserAdded();
            setFirstName('');
            setLastName('');
            setCity('');
            setEmail('');
            setPhoneNumber('');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <Paper style={{ padding: 16, marginBottom: 16, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
                Add New User
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    label="First Name"
                    value={First_Name}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    value={Last_Name}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="City"
                    value={City}
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Phone Number"
                    value={Phone_Number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
                    Add User
                </Button>
            </Box>
        </Paper>
    );
};

export default AddRowForm;

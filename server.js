const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// Database configuration
const databaseconfig = {
    user: 'az-proto-1',
    password: 'Sunny7@260512',
    server: 'az-proto-1.database.windows.net',
    database: 'az-proto-1',
    options: {
        encrypt: true, // for Azure
        trustServerCertificate: false, // change to true if necessary
        connectTimeout: 30000 // increase timeout to 30 seconds
    }
};

// Connect to the database
sql.connect(databaseconfig, err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the database');
    }
});

// API routes
app.post('/api/users', async (req, res) => {
    const { First_Name, Last_name, City, Email, Phone_Number } = req.body;

    try {
        const request = new sql.Request();
        await request.query(`
            INSERT INTO users (First_Name, Last_name, City, Email, Phone_Number)
            VALUES ('${First_Name}', '${Last_name}', '${City}', '${Email}', '${Phone_Number}')
        `);
        res.status(201).send('User created successfully');
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send('Server error');
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM users');
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error reading users:', err);
        res.status(500).send('Server error');
    }
});

app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const request = new sql.Request();
        await request.query(`DELETE FROM users WHERE id = ${id}`);
        res.status(200).send('User deleted successfully');
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Server error');
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't match the above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

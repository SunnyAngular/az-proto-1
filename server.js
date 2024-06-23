const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
    origin: 'https://az-proto-1.azurewebsites.net',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }));
app.use(bodyParser.json());

//Database connection
const databaseconfig = {
    user:'az-proto-1',
    password: 'Sunny7@260512',
    server: 'az-proto-1.database.windows.net',
    database: 'az-proto-1',
    options: {
        encrypt: true, // for Azure
        trustServerCertificate: false, // change to true if necessary
        connectTimeout: 30000 // increase timeout to 30 seconds
    }
};

// Connect to Azure database
sql.connect(databaseconfig, (err) => {
    if (err) console.log('Database Connection Failed!',err);
});

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An example API endpoint
app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello from the server!' });
});

// All other requests should be handled by the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// create a new database
app.post('/api/users', async (req, res) => {
    const {First_Name,Last_Name,City,Email,Phone_Number} = req.body;
    try {
        const request = new sql.Request();
        await request.query(`INSERT INTO users (First_Name,Last_name,City,Email,Phone_Number) VALUES ('${First_Name}','${Last_Name}', '${City}', '${Email}', '${Phone_Number}')`);
        res.status(201).send('Record Inserted Successfully'); 
    } catch (error) {
        console.log('Error Creating row',error);
        res.status(500).send('Error Creating row');
    }   
});

//Read Rows
app.get('/api/users', async(req,res)=>{
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM users');
        res.status(200).send(result.recordset);
    } catch (error) {
        console.log('Error to read the rows',error);
        res.status(500).send('Error to read the rows');
    }
})

// Delete Rows
app.delete('/api/users/:id', async(req,res)=>{
    try {
        const request = new sql.Request();
        const result = await request.query(`DELETE FROM users WHERE user_id = ${req.params.id}`);
        res.status(200).send(result.recordset);
    } catch (error) {
        console.log('Error to delete the rows',error);
        res.status(500).send('Error to delete the rows');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on Azure :::port ${port}`);
});

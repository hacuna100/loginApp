const express = require('express');
const db = require('./db-operations');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

// Testing API call
app.get('/api/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM cuisine');
    const data = result.rows;
    client.release();
    res.json(data);
    return data;
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});


// API call to return all accounts
app.get('api/getAccounts', async (res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM account');
    const data = result.rows;
    client.release();
    res.json(data);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Internal Server Error');
  }
});

// API call to account table to update
app.post('/api/createAccount', async (req, res) => {
  const { accountType, firstName, lastName, username, phoneNum, email, password } = req.body;
  try {
    await db.createAccount(accountType, firstName, lastName, username, phoneNum, email, password);
    res.status(200).json({success: true, message: 'User account created successfully'});
  } catch (error) {
    console.error('Error creating user', error);
    res.status(500).json({ success: false, message: 'Internal Server Error'});
  }
});

// API call to account table for login authentication
app.post('/api/authenticate', async (req, res) => {
  const {username, password} = req.body;

  try {
    const hashedPassword = await db.getHashedPasswordByUsername(username);

    if (hashedPassword && await bcrypt.compare(password, hashedPassword)) {
      res.status(200).json({ success: true, message: 'Authentication successful'})
    } else {
      console.log(hashedPassword);
      res.status(401).json({ success: false, message: 'Authentication Failed'})
    }
  } catch (error) {
    console.error('Error authentication user', error);
    res.status(500).json({success: false, message: 'Internal Server Error'});
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

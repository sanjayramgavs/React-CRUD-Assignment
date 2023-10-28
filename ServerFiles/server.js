const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'TestDb',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error.message);
  } else {
    console.log('Connected to the database...');
  }
});

app.get('/getAll', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).send(error.message);
    } else {
      res.send(results);
    }
  });
});

app.get('/getById', (req, res) => {
  const userId = req.query.uid;
  connection.query('SELECT * FROM users WHERE userid = ?', userId, (error, results) => {
    if (error) {
      console.error('Error fetching user by ID:', error.message);
      res.status(500).send(error.message);
    } else {
      res.send(results);
    }
  });
});

app.post('/insert', (req, res) => {
  const { userid, email, password } = req.body;
  connection.query('INSERT INTO users (userid, email, password) VALUES (?, ?, ?)', [userid, email, password], (error) => {
    if (error) {
      console.error('Error inserting user:', error.message);
      res.status(500).send(error.message);
    } else {
      res.send('Insert Success');
    }
  });
});

app.put('/update', (req, res) => {
  const { userid, email, password } = req.body;
  connection.query('UPDATE users SET email = ?, password = ? WHERE userid = ?', [email, password, userid], (error) => {
    if (error) {
      console.error('Error updating user:', error.message);
      res.status(500).send(error.message);
    } else {
      res.send('Update Success');
    }
  });
});

app.delete('/delete', (req, res) => {
  const userId = req.query.uid;
  connection.query('DELETE FROM users WHERE userid = ?', userId, (error) => {
    if (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).send(error.message);
    } else {
      res.send('Delete Success');
    }
  });
});
app.post('/addContact', (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, message } = req.body;
  connection.query(
    'INSERT INTO ContactUs (FirstName, LastName, EmailID, PhoneNumber, Address, Message) VALUES (?, ?, ?, ?, ?, ?)',
    [firstName, lastName, email, phoneNumber, address, message],
    (error) => {
      if (error) {
        console.error('Error adding contact:', error.message);
        res.status(500).send(error.message);
      } else {
        res.send('Contact added successfully');
      }
    }
  );
});

app.listen(9900, () => {
  console.log('Server is running on port 9900...');
});
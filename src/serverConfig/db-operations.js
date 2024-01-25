const { Pool } = require('pg');
const bcrypt = require('bcrypt');

// PostgreSQL server configuration
const pool = new Pool({
    user: 'superUser',
    host: 'localhost',
    database: 'database',
    password: 'password',
    port: 1111,
})

// function that creates a hashed password and a create account query for the database
async function createAccount(accountType, fName, lName, uName, pNum, email, password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO account (account_type, first_name, last_name, username, phone, email, passhash) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    await pool.query(query, [accountType, fName, lName, uName, pNum, email, hashedPassword]);
}

// returns the selected users hash password for validation on the login page
async function getHashedPasswordByUsername(uName) {
    const query = 'SELECT passhash FROM account WHERE username = $1';
    const result = await pool.query(query, [uName]);
    return result.rows[0] ? result.rows[0].passhash: null;
}

module.exports = {
    createAccount,
    getHashedPasswordByUsername
}
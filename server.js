const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt-nodejs');

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

const database = {
    users: [
        {
            id: 123,
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: 124,
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: 974,
            email: 'john@gmail.com',
            hash: ''
        }
    ]
}

app.post('/signin', (req, res) => {
    bcrypt.compare("apples", '$2a$10$L9hLWNFzx39AZG.g3B2Z7OWPQcEc2V2i4n7BKj8LbauvwdJQUcRvW', function (err, res) {
        console.log('first guess', res);
    });
    bcrypt.compare("veggies", '$2a$10$L9hLWNFzx39AZG.g3B2Z7OWPQcEc2V2i4n7BKj8LbauvwdJQUcRvW', function (err, res) {
        console.log('second guess', res);
    });
    if (req.body.email === database.users[0].email && req.body.password == database.users[0].password) {
        res.json("success");
    } else {
        res.status(400).json("error logging in");
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function (err, hash) {
    //     //store hash in your password db.
    //     console.log(hash);
    // });
    database.users.push({
        id: 125,
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
})

app.get('/mygoals', (req, res) => { })

app.get('/logs', (req, res) => { })

app.post('/logout', (req, res) => { })

app.post('/today', (req, res) => { })

app.get('/profile/:id', (req, res) => { })

app.get('/', (req, res) => {
    res.json(database.users);
})

// bcrypt.compare("bacon", hash, function (err, hash) {
//     //store hash in your password db.
// });

//load password from your password DB
// bcrypt.compare("bacon", hash, function (err, res) { });

// bcrypt.compare("veggies", hash, function (err, res) { });

app.listen(3001, () => {
    console.log("app is running on port 3001");
});


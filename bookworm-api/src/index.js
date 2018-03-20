import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import auth from './routes/auth';


const app = express();

app.use(bodyParser.json());

// replica sets
//var uri = 'mongodb://user:pass@localhost:port,anotherhost:port,yetanother:port/bookworm';
//mongoose.connect(uri);

// SEE THE VIDEO TUTS #3 - https://www.youtube.com/watch?v=1IWzMuJKv6o
 mongoose.connect('mongodb://localhost:27017/bookworm'); //('mongodb://localhost/bookworm', { useMongoClient: true });

app.use('/api/auth', auth);

// app.post('/api/auth', (req, res) => {
//     res.status(400).json({ errors: { global: "Invalid credentials" } });
// });

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, () => console.log('Running on localhost:8080'));
const express = require('express');
const mongoose = require('mongoose');
const port = 5000 || process.env.PORT;
const cors = require('cors');
const Routes = require('./utils/Routes');
const requireAuth = require('./utils/requireAuth');

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/developerworld', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB');
}).catch(() => {
    console.log('Could not connect to DB');
});

app.use(express.json());
app.use(Routes);

app.use('/User',requireAuth, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Server has started at ${port}`);
});
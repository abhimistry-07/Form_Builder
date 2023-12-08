const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const categorizeRouter = require('./routes/categorizeRoute');
const clozeRouter = require('./routes/clozeRoute');
const comprehensionRouter = require('./routes/ComprehensionRoute');
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/categorize", categorizeRouter);
app.use("/cloze", clozeRouter);
app.use("/comprehension", comprehensionRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }
    console.log(`Listening on port ${process.env.port}`);
});

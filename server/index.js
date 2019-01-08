const path = require('path');
const express = require('express');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
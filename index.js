const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

let users = [
    {id: 1, name: "Alice"},
    {id:2, name: "Bob"}
];

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

let users = [
    {id: 1, name: "Alice"},
    {id:2, name: "Bob"}     
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if(!user) return res.status(404).send('User not found');
    res.json(user);
});

app.post('/users', (req, res) => {
    const newUser = {}
    newUser.id = users.length
});

//update user
app.put('/users/:id', (req, res) => {
    const user = users.find( u=> u.id == req.params.id);
    if(!user) return res.status(404).send('User not found');
    user.name = req.body.name;
    res.json(user);
});

//delete user
app.delete("/users/:id", (req,res) => {
    users = users.filter(u => u.id != req.params.id);
    res.send("user deleted")
})

app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
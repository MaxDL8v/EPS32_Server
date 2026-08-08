const express = require("express");
const app = express();
app.use(express.json());

let lastCommand = "NONE";

app.post("/api/setCommand", (req, res) => {
    lastCommand = req.body.command;
    res.send("OK");
});

app.get("/api/getCommand", (req, res) => {
    res.send(lastCommand);
});

app.get("/", (req, res) => {
    res.send("ESP Server läuft!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server läuft");
});

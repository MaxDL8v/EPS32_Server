const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(express.json());
app.use(express.static("public"));

let lastCommand = "NONE";

// REST API
app.post("/api/setCommand", (req, res) => {
    lastCommand = req.body.command;
    res.send("OK");
});

app.get("/api/getCommand", (req, res) => {
    res.send(lastCommand);
});

// HTML-Seite
app.get("/command", (req, res) => {
    res.sendFile(__dirname + "/public/command.html");
});

// Test-Route
app.get("/", (req, res) => {
    res.send("ESP Server läuft!");
});

// HTTP-Server erzeugen
const server = http.createServer(app);

// WebSocket-Server starten
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("ESP32 verbunden");
    ws.send("Hallo ESP32");

    ws.on("message", (msg) => {
        console.log("Nachricht vom ESP32:", msg);
    });
});

// Server starten
server.listen(3000, () => {
    console.log("Server läuft");
});

//modules
const express = require("express");
const cors = require("cors");
const fs = require("fs");

// const logfile = require("./logs.json");

const { getLogs } = require("./middlewares/log");
const { isAuth } = require("./middlewares/auth");

const app = express();
const PORT = 3005;

//middlewares
app.use(cors());
app.use(express.json());

//global middleware
app.use(getLogs);

app.post("/auth", isAuth, (req, res) => {
    res.status(200).json({ message: "authentication success" });
});

app.get("/logs", (req, res) => {
    try {
        const logsData = fs.readFileSync("./logs.json", "utf8");
        const logs = JSON.parse(logsData);
        res.status(200).json({ message: "success", data: logs });
    } catch (err) {
        res.status(400).json({ errorMessage: err.message });
    }
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "file writed successfully" });
});

app.all("*", (req, res) => {
    res.status(400).json({ message: "invalid route" });
});

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));

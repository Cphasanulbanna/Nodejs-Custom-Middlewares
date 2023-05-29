//modules
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3005;

//middlewares
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port:${PORT}`));

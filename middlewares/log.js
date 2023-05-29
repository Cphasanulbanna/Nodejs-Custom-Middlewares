//modules
const fs = require("fs");
const path = require("path");
const moment = require("moment");

//logfile path
const logsFilePath = path.join(__dirname, "..", "logs.json");

const getLogs = (req, res, next) => {
    const { url, method, hostname } = req;
    const requestTime = new Date();

    const logData = {
        host: hostname,
        url: url,
        method: method,
        requestTime: moment(requestTime).format("h:mm A"),
        requestDate: moment(requestTime).format("DD-MM-YYYY"),
    };

    try {
        let existingLogs = [];
        if (fs.existsSync(logsFilePath)) {
            const data = fs.readFileSync(logsFilePath, "utf8");
            if (data) {
                existingLogs = JSON.parse(data);
            }
        }
        existingLogs.push(logData);
        fs.writeFileSync(logsFilePath, JSON.stringify(existingLogs, null, 2));
    } catch (err) {
        res.status(400).json({
            errorMessage: err.message,
        });
    }

    next();
};

module.exports = { getLogs };

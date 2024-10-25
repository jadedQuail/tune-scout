require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./database/db-connector");

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
};

app.use(cors(corsOptions));
app.use(express.json());

// ROUTES

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.sendStatus(400);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
        await db.pool.execute(query, [username, hashedPassword]);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
            return res.sendStatus(409);
        }
        res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`Example app is listening on port ${PORT}.`);
});

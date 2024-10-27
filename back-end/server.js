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

// Register user
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.sendStatus(400);
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
        const [result] = await db.pool.execute(query, [
            username,
            hashedPassword,
        ]);

        const user_id = result.insertId;

        res.status(201).json({ user_id, username });
    } catch (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY") {
            return res.sendStatus(409);
        }
        res.sendStatus(500);
    }
});

// Validate login request
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.sendStatus(400);
    }

    try {
        const [rows] = await db.pool.execute(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        const user = rows[0];

        if (!user) {
            return res.sendStatus(404);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.sendStatus(401);
        }

        res.json({
            user_id: user.user_id,
            username: user.username,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Create new list for a user
app.post("/create-song-list", async (req, res) => {
    const { name, user_id } = req.body;

    if (!name || !user_id) {
        return res.sendStatus(400);
    }

    try {
        const query = `INSERT INTO song_lists (name, user_id) VALUES (?, ?)`;
        await db.pool.execute(query, [name, user_id]);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get("/song-lists/:user_id", async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.sendStatus(400);
    }

    try {
        const query = `SELECT song_list_id, name FROM song_lists WHERE user_id = ?`;
        const [rows] = await db.pool.execute(query, [user_id]);

        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.delete("/song-lists/:song_list_id", async (req, res) => {
    const { song_list_id } = req.params;

    if (!song_list_id) {
        return res.sendStatus(400);
    }

    try {
        const query = `DELETE FROM song_lists WHERE song_list_id = ?`;
        const [result] = await db.pool.execute(query, [song_list_id]);

        if (result.affectedRows > 0) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.post("/add-song-to-list", async (req, res) => {
    const { title, artist, song_list_id } = req.body;

    if (!title || !artist || !song_list_id) {
        return res.sendStatus(400);
    }

    try {
        const query = `INSERT INTO songs (title, artist, song_list_id) VALUES (?, ?, ?)`;
        await db.pool.execute(query, [title, artist, song_list_id]);

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`Example app is listening on port ${PORT}.`);
});

const db = require('../model/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




exports.register = async (req, res) => {
    const { name, email, password } = req.body
    const results = await db.query(
        "select * from users where email = ?", [email]
    );
    console.log(results);
    try {

        const existingUser = results[0];
        if (existingUser.length > 0) {
            res.status(400).json('user alredy exists');
        }

        const hashp = await bcrypt.hash(password, 10);

        await db.query(
            "insert into users (name, email, password) values(?, ?, ?)", [name, email, hashp]
        )
        res.sendStatus(201).json('registered sucessfully')

    } catch (error) {
        res.status(500).json(error.message)
    }
};



exports.login = async (req, res) => {
    const { email, password } = req.body;


    try {

        const [users] = await db.query(
            "select * from users where email= ?", [email]

        );


        if (users.length === 0) {
            return res.status(401).json({ message: 'invalid credentials' })
        }
        const user = users[0];

        const pmatch = await bcrypt.compare(password, user.password);

        res.send("login successfull")

        if (!pmatch) {
            return res.status(400).json("invalid Password")
        }
        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        console.log(token);
    } catch (error) {

        res.status(500).json(error.message)
    };

};




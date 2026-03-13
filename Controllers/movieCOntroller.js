const db = require('../model/db');


exports.addMovie = async (req, res) => {
    const { title, description, duration, poster_url, release_date } = req.body;

    try {

        await db.query(
            "insert into movies(title, description, duration, poster_url, release_date) values(?, ?, ?, ?, ?)", [title, description, duration, poster_url, release_date]
        );

        res.json({ message: "Movies added sucessfully" });

    } catch (error) {
        res.status(500).json({ message: error })

    }
};


exports.getMovies = async (req, res) => {
    try {
        const [movies] = await db.query("select * from movies");
        res.json(movies);


    } catch (error) {
        res.status(500).json({ message: error })

    };
};


exports.addShow = async (req, res) => {

    const { movie_id, theater_id, show_time, price } = req.body;

    try {

        const [result] = await db.query(
            `INSERT INTO shows (movie_id, theater_id, show_time, price)
             VALUES (?, ?, ?, ?)`,
            [movie_id, theater_id, show_time, price]
        );

        const showId = result.insertId;

        const seats = [];

        for (let i = 1; i <= 50; i++) {
            seats.push(`(${showId}, 'A${i}')`);
        }

        const query = `
        INSERT INTO seats (show_id, seat_number)
        VALUES ${seats.join(",")}
        `;

        await db.query(query);

        res.json({ message: "Show created with seats" });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: error.message });

    }
};


exports.getShows = async (req, res) => {
    const movieId = req.params.movie_Id;

    try {
        const [shows] = await db.query(
            "select * from shows where movie_id=?", [movieId]
        );
        res.json(shows);

    } catch (error) {
        res.status(500).json({ message: "Error fetching shows" });

    }

};


exports.getSeats = async (req, res) => {
    const showId = req.params.show_Id;
    try {
        const [seats] = await db.query(
            "select * from seats where show_id=?", [showId]
        );
        res.json(seats)

    } catch (error) {
        res.status(500).json({ message: error })

    }

};
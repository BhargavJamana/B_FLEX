const db = require('../model/db');

exports.lockseats = async (req, res)=>{
    const {show_id, seats} = req.body;

    try {
        const placeholders = seats.map(()=> "?").join(',');
        console.log(placeholders);
        const [result] = await db.query(
            `update seats set status='locked' 
            where show_id=? and seat_number in (${placeholders}) and status ='available'`, [show_id, ...seats]
        );
        console.log(result.affectedRows);
        console.log(seats.length);
        console.log(seats);
        if(result.affectedRows !== seats.length){
            return res.json({
                message: "some seats already booked or looked"
            });
        }
        res.json({
            message: "seats locked sucessfully"
        });


        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};
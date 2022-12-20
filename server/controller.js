const drinks = require('./db.json')

module.exports = {
    getDrinks: (req, res) =>{
        res.status(200).send(drinks)
    }
}
const drinks = require('./db.json')
let drinkId = 4
module.exports = {
    getDrinks: (req, res) =>{
        res.status(200).send(drinks)
    },
    addDrinks: (req, res) =>{
        const {name, flavor, picture} = req.body

        let newDrinkObj ={
            id: drinkId,
            name: name,
            flavor: flavor,
            picture: picture,
            likes: 0
        }
        drinks.push(newDrinkObj)
        drinkId++

        res.status(200).send(drinks)
    },
    deleteDrink: (req, res) =>{
        const index = drinks.findIndex(el => el.id === +req.params.id)
        
        drinks.splice(index, 1)
        
        res.status(200).send(drinks)
        
    }
}
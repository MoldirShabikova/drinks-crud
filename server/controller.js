const tours = require('./db.json')
let tourId = 6
module.exports = {
    getTours: (req, res) =>{
        res.status(200).send(tours)
    },
    addTours: (req, res) =>{
        const {name, info, image, price} = req.body

        let newTourObj = {
          id: tourId,
          name: name,
          info: info,
          image: image,
            price: price,
          
        };
        tours.push(newTourObj);
        tourId++

        res.status(200).send(tours)
    },
    deleteTour: (req, res) =>{
        const index = tours.findIndex(el => el.id === +req.params.id)
        
        tours.splice(index, 1)
        
        res.status(200).send(tours)
        
    },

    updateTour: (req, res) => {
        const index = tours.findIndex((el) => el.id === +req.params)

        const { type } = req.body
        
        if (type === 'like') {
            tours[index].likes++
        } else if (type === 'dislike') {
            tours[index].likes--
        }
        res.status(200).send(tours)
    }
}
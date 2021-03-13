const router = require('express').Router();

let Exercise = require('../models/Exercise.model');

router.get('/', (req,res) => {
    Exercise.find()
    .then(exercise => res.json(exercise))
    .catch(err => res.status(404).json('Error : ' + err))
});

router.post('/add', (req,res) => {
    const {userName,description,duration} = req.body;
    
    const date= Date.parse(req.body.date) ;

    const newExercise = new Exercise(
    {
        userName,
        description,
        duration,
        date
    });
    newExercise.save()
    .then(()=> res.json('newExercise Added'))
    .catch((err) => res.status(400).json('Error ' + err))

});

router.get('/:id', (req,res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error ' + err))
})

router.delete('/:id', (req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json("Exercise Deleted"))
    .catch(err => res.status(400).json('Error ' + err))
})

router.post('/update/:id', (req,res) => {
    Exercise.findById(req.params.id)
    .then (exercise => {
        exercise.userName = req.body.userName;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(()=> res.json('Exercise Updated'))
        .catch((err) => res.status(400).json('Error ' + err))

    })
    .catch ((err) => res.status(400).json('Error ' + err));
})

module.exports = router;
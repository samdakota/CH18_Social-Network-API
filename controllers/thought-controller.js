

// /api/thoughts

// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

const Thought = require('../models');

const ThoughtController = {
    getAllThoughts() {
        Thought.find()
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },
    getThoughtById() {
        Thought.findOne()
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    createThought() {
        Thought.create()
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    updateThought() {
        Thought.fineOneAndUpdate()
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    deleteThought() {
        Thought.findOneAndDelete()
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });

    }
};

module.exports = ThoughtController;
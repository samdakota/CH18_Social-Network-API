const { User } = require('../models');

const UserController = {
    getAllUser(req, res) {
        User.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(400);
        });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    createUser({ body }, res) {
        User.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

// PUT to update a user by its _id

// DELETE to remove user by its _id
};

module.exports = UserController;
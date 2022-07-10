const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbThoughtData))
        .catch(err => {
            res.status(400).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thought.findById({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    },

    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return Thought.findOneAndUpdate(
                { _id: params.id },
                { $push: { thoughts: _id} },
                { new: true, runValidators: true }
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body,
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }

            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            )
        })
        .then(dbThoughtData => {
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    },

    createReaction({ params, body }, res) {
        Reaction.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'Thought not found' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    },

    deleteReaction({ params, body}, res) {
        Thought.findOneAndDelete(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            res.status(400).json(err);
        });
    },
};

module.exports = thoughtController;

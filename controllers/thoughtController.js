const { Thought, User } = require('../models');

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            .populate('reactions');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try{
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .populate('reactions');

            

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that Id!' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that Id!' });
            }

            // const userThought = await User.findOneAndUpdate(
            //     { _id: req.body.userId },
            //     { $addToSet: { thoughts: thought._id } },
            //     { new: true }
            // );

            // if(!userThought) {
            //     return res.status(404).json({ message: 'No thought with that Id!' });
            // }

            res.json(thought)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try{
            const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});
            
            if(!thought) {
                res.status(404).json({message: 'No thought with that Id!'});
            }
            await User.deleteMany({ _id: { $in: thought.users } });
            res.json({message: 'Thoughts deleted!'})
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!thought) {
                res.status(404).json({message: 'No thought with this Id!'})
            }
            res.json(thought); 
        } catch (err) {
            res.status(500).json(err);
          }
    },

    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
            if(!reaction) {
                res.status(404).json({message: 'No reaction with this Id!'})
            }
            res.json(reaction)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { Reaction: { _Id: req.params.reactionId } } },
                { runValidators: true, new: true }
            )
            if(!reaction) {
                res.status(404).json({message: 'No user with this Id!'})
            }
            res.json(reaction)
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
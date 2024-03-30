const { Thought, User } = require('../models');

module.exports = {
    //Get all User
    async getUsers(req, res) {
        try {
            const users = await User.find()
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' });
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' });

            if (!user) {
                return res.status(404).json({ message: 'No course with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },


};
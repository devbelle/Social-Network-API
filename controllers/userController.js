const { Thought, User } = require('../models');

// const headCount = async () => {
//     const numberOfStudents = await Student.aggregate()
//       .count('studentCount');
//     return numberOfStudents;
//   }

module.exports = {
    //Get all User
    async getUsers(req, res) {
        try {
            const users = await User.find()
            //.populate('thoughts') //select: '-__v'
            //.populate('friends'); //select: '-__v' 
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId })
            //.populate('thoughts')
            //.populate('friends' );

            if (!user) {
                return res.status(404).json({ message: 'No user with that Id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user)
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try{
            const user = await User.findOneAndDelete({_id: req.params.userId});
            
            if(!user) {
                res.status(404).json({message: 'No user with that Id!'});
            }
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({message: 'User and thoughts deleted!'})
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if(!user) {
                res.status(404).json({message: 'No user with this Id!'})
            }
            res.json(user); 
        } catch (err) {
            res.status(500).json(err);
          }
    },

    async addFriend(req, res) {
        try {
            const friend = User.findOneAndUpdate(
                { _id: params.userId },
                { $addToSet: { friends: params.friendId } },
                { new: true, runValidators: true }
            );
            if(!friend) {
                res.status(404).json({message: 'No user with this Id!'})
            }
            res.json(friend)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const friend = User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
            if(!friend) {
                res.status(404).json({message: 'No user with this Id!'})
            }
            res.json(friend)
        } catch (err) {
            res.status(500).json(err);
        }
    }

};
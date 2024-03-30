const connection = require('../config/connection');
const { Thought, User } = require('../models');
// Import functions for seed data
const { getRandomName, getRandomPost, } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }

    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }

    const users = [];
    const thoughts = [];

    for (let i = 0; i < 20; i++) {
        const username = getRandomName(20);
        const thoughtText = getRandomPost(20);


        users.push({username, email: `${username}123@mail.com`});
        thoughts.push({thoughtText});

    }

    const userData = await User.insertMany(users);

    for (let i = 0; i < userData.length; i++) {

      const thoughtData = await Thought.create({thoughtText: thoughts[i].thoughtText, username: userData[i].username});
      //thoughtdata reaction.push({})
      userData[i].thoughts.push(thoughtData._id);

      await userData[i].save()

    }

    // await Thought.insertOne({users: [...userData.map(({_id}) => _id)] });

    console.table(users);
    console.table(userData);
    console.info('Seeding complete! 🌱');
    process.exit(0);

});
const connection = require('../config/connection');
const { Thoughts, Users } = require('../models');
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
        const posts = getRandomPost(20);


        users.push({username});
        thoughts.push({posts});

    }

    const userData = await Users.insertMany(users, thoughts);

    await Thoughts.insertOne({users: [...userData.map(({_id}) => _id)] });

    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);

});
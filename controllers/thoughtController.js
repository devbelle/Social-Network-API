/// Use built in date method to get current date from activity 11
//lastAccessed: { type: Date, default: Date.now },

//update example in activity 14
// app.put('/find-one-update/:genre', async (req, res) => {
//     // TODO: Write a route that will find the first instance of a document that contains a name with the value equal to 'Kids'
//     try {
    
//       const filter = {name: 'kids'}
//       const update = {name: req.params.genre}
  
//       const result = await Genre.findOneAndUpdate(filter, update, {new: true});
  
//       res.status(200).json(result)
//       console.log(`Updated: ${result}`);
//     }
//     catch (err) {
//       console.log('Uh Oh, something went wrong');
//       res.status(500).json({ message: 'something went wrong' });
//     // Update that name with the value given from the URL param
//     // Return the updated document
//     }
//   });
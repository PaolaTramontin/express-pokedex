const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios'); 


// GET /pokemon - return a page with favorited Pokemon
//PART 3:
router.get('/', (req, res)=> {
  db.pokemon.findAll()
  .then(pokemon=>{
    res.render('index', {pokemon: pokemon, showButton: false})
  })
});
//get always renders 

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res)=>{
  db.pokemon.findOrCreate({
    where: {name: req.body.name},
  })
  .then(([createdFave, wasCreated ]) =>{
    res.redirect('/pokemon')
  })
 //res.send(req.body) //for our help
})

//you always got to redirect with post. the redicted alwys has to be an url pattern /something not file.

//PART 4:

router.get('/:idx', (req, res)=>{
  //let pokemonId= req.params.pokemonId
  let pokemonIndex = req.params.idx
  axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
  .then(response=>{
  // res.send(response.data)
    res.render('show', {pokemonIndex: response.data })  
    //console.log(response.data)
  }) 
  .catch(err =>{
    console.log(err)
})
})


module.exports = router;



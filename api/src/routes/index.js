const express = require('express');
const axios = require('axios');
const { Recipe, Diet_Type } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  API_KEY
} = process.env;

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//variables de prueba(retirar cuando esten las del front)

router.get(`/recipes`, async function(req, res){
  
  const {name} = req.query;

  const list = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}
  &addRecipeInformation=true&apiKey=${API_KEY}`)
  
  list ? res.send(list.data) : res.status(404).send("Recipe not found")
  
  });

  router.get(`/recipes/:id`, async function(req, res){
  
    const {id} = req.params;
    const food = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    res.json(food);
  
    });

  router.get(`/types`, async function(req, res){
       
          const types = await Diet_Type.findAll()
          if (types) {
              res.json(types);
          }
          else {
           const types = await Diet_Type.bulkCreate([
                {name : "Gluten Free"},
                {name : "Ketogenic"},
                {name : "Vegetarian"},
                {name : "Lacto-Vegetarian"},
                {name : "Ovo-Vegetarian"},
                {name : "Vegan"},
                {name : "Pescetarian"},
                {name : "Paleo"},
                {name : "Primal"},
                {name : "Low FODMAP"},
                {name : "Whole30"},
            ]);
            res.json(types)
          }
  });

router.post('/recipe', async function(req, res){
   
      const {id, title, calories, carbs, fat, image, protein, diets} = req.body;
     
      await Recipe.create({
          id,
          title,
          calories,
          carbs,
          fat,
          image,
          protein,
          diets
      })
      
      });
    
module.exports = router;

const {Router} = require('express');
const axios = require('axios');
const { Recipe, Diet_Type } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  API_KEY
} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get(`/recipes`, async function(req, res){
  try{
  const {name} = req.query;

  const list = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}
  &addRecipeInformation=true&apiKey=${API_KEY}`)
  
  list ? res.send(list.data) : res.status(401).send("Recipe not found")
}
catch(error) {
  res.status(404).send(error)
}
  });
//---------------------------------------------------------------------------------------
  router.get(`/recipes/:id`, async function(req, res){
  try {
    const {id} = req.params;
    const food = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    food ? res.json(food.data) : res.status(401).send("Recipe not found")
  }
  catch(error) {
    res.status(404).send(error)
  }
 });
//---------------------------------------------------------------------------------------
  router.get(`/types`, async function(req, res){
     try{  
          const types = await Diet_Type.findAll()
          if (types.length === 0) {
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
          res.json(types);
        }
    catch(error) {
      res.status(401).send(error)
    }
  });
//---------------------------------------------------------------------------------------
router.post('/recipe', async function(req, res){
   try {
      const {name, summary, points, healthScore, steps, diets} = req.body;
     
      await Recipe.create({
          name,
          summary,
          points,
          healthScore,
          steps,
          diets
      })
      res.send(`Recipe "${name}" successfully created.`)
    }
  catch(error){
    res.status(401).send(error)
  }
});
    
module.exports = router;

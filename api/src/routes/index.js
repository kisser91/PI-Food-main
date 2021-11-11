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

  let getApiCall = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}
  &addRecipeInformation=true&apiKey=${API_KEY}`);
  let array = (Object.values(getApiCall.data.results));
  let foodArray = await Promise.all(array.map(async (el) => {
    /* en dietsArray tengo [ 'vegetarian', false ],
  [ 'vegan', false ],
  [ 'glutenFree', false ] */
  let diets = [];
  let dietsArray = Object.entries(el).splice(0, 3).map(el=> {
      if (el[1]) diets.push(el[0])
    })
      return {
      name: el.title,
      summary: el.summary,
      points: el.spoonacularScore,
      healthScore: el.healthScore,
      steps: el.analyzedInstructions,
      diets: diets
  }}))

  let getDbInfo = async () => {
    return await Recipe.findAll()
  }
    const getAll = async () => {
    let apiInfo = foodArray;
    let dbInfo = getDbInfo();
    const info = apiInfo.concat(dbInfo);
     info ? res.json(info) : res.status(401).send("Recipe not found")
  }
  getAll();
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
 /* router.get("/pokemons/:id", async(req,res)=> {
    const id = parseInt(req.params.id); 
    console.log(id);
    let pokemonsAll = await getAll();
    console.log(pokemonsAll);

    if(id){
        let pokemonId = pokemonsAll.filter(el => el.id === id)
        pokemonId
        ? res.status(200).send(pokemonId) 
        : res.status(404).send('El pokemon solicitado no existe.');
    
    }
    else {
        res.status(200).send(pokemonsAll);
    }
}); */
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
      const {name, summary, points, healthScore, steps, createdInDb, diets} = req.body;
     
     let recipeCreated = await Recipe.create({
          name,
          summary,
          points,
          healthScore,
          steps,
          createdInDb
      })
      let dietTypesDb = await Diet_Type.findAll({
        where: {name : diets}
      })
      recipeCreated.addDiet_Type(dietTypesDb)
      res.send(`Recipe "${name}" successfully created.`)
    }
  catch(error){
    res.status(401).send(error)
  }
});
    
module.exports = router;

const {Router} = require('express');
const axios = require('axios');
const { Recipe, Diet_Type } = require('../db.js');
const {Op} = require("sequelize");
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
  const {title} = req.query;
 
  let getApiCall = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${title}
  &addRecipeInformation=true&apiKey=${API_KEY}`);
  //me quedo con los datos brutos en un array
  
  let array = (Object.values(getApiCall.data.results));
 
  let receta = await Promise.all(array.map(async (el) => {
    //me quedo solo con la informacion que necesito
      return {
      diets: el.diets,
      title: el.title,
      summary: el.summary,
      points: el.spoonacularScore,
      healthScore: el.healthScore,
      steps: el.analyzedInstructions,
  }}))
  let getDbInfo = async () => {
    return await Recipe.findAll({
      where: {
        title: {
          [Op.iLike] : `%${title}%`
  }}})
}
    const getAll = async () => {
    let apiInfo = receta;
    let dbInfo = await getDbInfo();
    const info = dbInfo.concat(apiInfo);
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

    let getDbInfo = async () => {
      return await Recipe.findOne({
        where: {
          id: id
    }})
    }
      const getAll = async () => {
      let apiInfo = receta;
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
      const {title, summary, points, healthScore, steps, createdInDb, diets} = req.body;
     
     let recipeCreated = await Recipe.create({
          title,
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
      res.send(`Recipe "${title}" successfully created.`)
    }
  catch(error){
    res.status(401).send(error)
  }
});
    
module.exports = router;

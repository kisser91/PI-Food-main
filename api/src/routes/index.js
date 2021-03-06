const {Router} = require('express');
const axios = require('axios');
const { Recipe, Diets } = require('../db.js');
const {Op, INTEGER, UUID} = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  API_KEY, SECAPI_KEY, TERAPI_KEY, CUARAPI_KEY, QUINAPI_KEY
} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get(`/recipes`, async function(req, res){
  try{
  const {title} = req.query;
 
  let getApiCall = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${title || ""}&number=100&addRecipeInformation=true&apiKey=${CUARAPI_KEY}`);
  //me quedo con los datos brutos en un array
  let apiData= getApiCall.data.results
  //me quedo solo con la informacion que necesito
  let receta = apiData.map(el => {
      return {
      diets: el.diets,
      title: el.title,
      summary: el.summary,
      points: el.spoonacularScore,
      healthScore: el.healthScore,
      steps: el.analyzedInstructions,
      image: el.image
  }})
  let getDbInfo = async () => {
    if(title) {
      return await Recipe.findAll({
        where: {
          title: {
            [Op.iLike] : `%${title}%`
    }}, include: {
      model: Diets,
      attributes: ["title"],
      through: {attributes: []}
    } 
  })}
  else {
    return await Recipe.findAll({
      include: { model: Diets,
        attributes: ["title"],
        through: {attributes: []}}
    })
  }
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
  
    const {id} = req.params;
    try {
      if (id.length < 20) {
      let getApiCall =  await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${CUARAPI_KEY}`);
      let apiInfo = getApiCall.data
      let receta = {
        diets: apiInfo.diets,
        title: apiInfo.title,
        summary: apiInfo.summary,
        points: apiInfo.spoonacularScore,
        healthScore: apiInfo.healthScore,
        steps: apiInfo.analyzedInstructions,
        image: el.image
        }
      res.json(receta)
    } 
    else {
      let dbInfo = await Recipe.findOne({
        where: {
          id: id
        }, 
        include: {
        model: Diet_Type,
        attributes: ["id", "title"],
        through: {attributes: []}
        }})
      res.json(dbInfo)
    }
  }
    catch(error){
      res.status(404).send(error)
    }
 });
 //---------------------------------------------------------------------------------------
  router.get(`/types`, async function(req, res){
     try{  
          const types = await Diets.findAll()
          if (types.length === 0) {
            const types = await Diets.bulkCreate([
              {title : "Gluten Free"},
              {title : "Ketogenic"},
              {title : "Vegetarian"},
              {title : "Lacto-Vegetarian"},
              {title : "Ovo-Vegetarian"},
              {title : "Vegan"},
              {title : "Pescetarian"},
              {title : "Paleo"},
              {title : "Primal"},
              {title : "Low FODMAP"},
              {title : "Whole30"},
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
      const {title, summary, points, healthScore, steps, image, createdInDb, diets} = req.body;
     
     let recipeCreated = await Recipe.create({
          title,
          summary,
          points,
          healthScore,
          steps,
          image,
          createdInDb
      })
      let dietTypesDb = await Diets.findAll({
        where: {title : diets}
      })
      recipeCreated.addDiets(dietTypesDb)
      res.send(`Recipe "${title}" successfully created.`)
    }
  catch(error){
    res.status(401).send(error)
  }
});
    
module.exports = router;

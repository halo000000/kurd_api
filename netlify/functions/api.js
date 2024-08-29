const express = require('express');
const data_boy = require("./boy_name_kurish.json");
const data_gril = require("./gril_name_kurish.json");
const serverless = require('serverless-http');
const router = express.Router();



const app = express();
const port = 3000;




router.get('/', (req, res) => {

res.send("base URL for the Api ");
});

// boy random rout 
router.get("/boy-random",(req,res)=>{
    let random = Math.floor(Math.random()*data_boy.length);
    res.json(data_boy[random]);
})


// gril random rout 
router.get("/gril-random",(req,res)=>{
    let random = Math.floor(Math.random()*data_gril.length);
    res.json(data_gril[random]);
})

router.get('/random', (req, res) => {
  let all_names = [...data_boy,...data_gril]
  let random = Math.floor(Math.random()*all_names.length);
  res.json(all_names[random]);
});


// search gril  rout
router.get("/gril",(req, res)=>{
  let name =  req.query.name ;
  if(!name){
    res.send(" pleas provide a name in the query  ");
  }
  else{
  let gril = data_gril.find((item)=>{
    return item.name == name;
  })
  res.json(gril);
}
})



// search  boy  rout
router.get("/boy",(req, res)=>{

  let name =  req.query.name ;
  if(!name){
    res.send(" pleas provide a name in the query  ");
  }
   else{

  let boy = data_boy.find((item)=>{
    return item.name == name;
  })
  res.json(boy);
}
})

router.get('/zip', (req, res) => {
  
 
});

router.all('*', (req, res) => {
  res.status(404).send('<h1> 404 page not found</h1>');
});


// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });

// module.exports = app;

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);

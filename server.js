
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const res = require('express/lib/response');
const { response } = require('express');
const {CatagoryData} = require('./Catagory_Data')
const {CoverData} = require('./CoverData')

const PORT = process.env.PORT | 3001;

// const db=knex({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
//   }
// });
const users=[
  {
  'FullName':'Riyan',
  'UserName':'Riyan01',
  'password':'12345678'
},
{
'FullName':'John',
'UserName':'John Dove',
'password':'hello'
}];
const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get('/',(req,res)=>{
  try {
    res.status(200).json(CatagoryData);
    console.log(CatagoryData)
  } catch (error) {
    res.status(400).json(error)
  }
}
)
// FOR COVER IMAGES
app.get('/cover',(req,res)=>{
  try {
    res.status(200).json(CoverData);
    console.log(CoverData)
  } catch (error) {
    res.status(400).json(error)
  }
}
)

// FOR CATAGORIES NAME
app.get('/catagory',(req,res)=>{
  try {
    const catagory_name=CatagoryData.map(name=>name.Catagory_name);
    res.status(200).json(catagory_name);
    console.log(catagory_name)
  } catch (error) {
    res.status(400).json(error)
  }
}
)
// GETTING A PRODUCT IN A CATAGORY
app.get('/catagory/:catagoryId/product/:productId',(req,res)=>{
  let productId = req.params.productId;
  let catagoryId = req.params.catagoryId;
  try {
    const product=CatagoryData.map(name=>{
      if(name.Catagory_name===catagoryId)
      return name.Catagor_Products[productId];

    })
    res.status(200).json(product.filter((name)=>name!=null));
    console.log(product.filter((name)=>name!=null))
  } catch (error) {
    res.status(400).json(error)
  }
}
)
app.post('/',(req,res)=>{
  try {
  const response={FullName,UserName,password}=req.body;
  users.push(response)
  res.json(response); 
  } catch (error) {
    res.status(400).json(error)
  }
}
)
app.put('/',(req,res)=>{
  try {
  const response={FullName,UserName,password}=req.body;
  users.map((u)=>{
    if(u.FullName === response.FullName){
    res.status(400).json('user already exist'); 
    } 
    else
    res.status(200).json('user added'); 
    users.push(response)
  })
  res.json(response); 
  } catch (error) {
    res.status(400).json(error)
  }
}
)


// app.get('/', (req, res)=> {
//   db.select('*').from('users').then(data=>{
//   res.send(data);
// });
// })
// app.post('/message', (req, res) => {
// const {email,name,message}=req.body;
//  db('users')
//  .returning('*')
//   .insert({
//     name:name,
//     email:email,
//     message:message,
//     joined: new Date()
//  })
//   .then(user=>{
//     res.json(user[0]);
//   })
//   .catch(err=>res.status(400).json(err));
// })

// app.listen(process.env.PORT || 3001,() => {
//   console.log(`app is running on port ${process.env.PORT}`)
// })
app.listen(PORT,()=>{console.log(`server runs at port ${PORT}`)});
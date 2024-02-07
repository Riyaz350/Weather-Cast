const express = require('express')
require('dotenv').config();
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors({

    origin:[ 'http://localhost:5173',
            'http://localhost:5174',           ],
    credentials:true

}
))
app.use(express.json())





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://Weather-Man:AP5QBH0R0EnYRIIt@cluster0.gx7mkcg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {

    const users = client.db("Weather-Cast").collection("users");
 

  //   JWT TOKENS, COOKIES API

//   app.post('/jwt', async (req, res) => {
//     const user = req.body;
//     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
//     res.send({token});
//   })

    // HANDMADE MIDDLEWARES

    // const verifyToken = (req, res, next)=>{
    //   if(!req.headers.authorization){
    //     return res.status(401).send({message: 'FORBIDDEN ACCESS'})
    //   }
    //   const token = req.headers.authorization.split(' ')[1]
    //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
    //     if(err){
    //       return res.status(401).send({message: 'ACCESS DENIED'})
    //     } 
    //     req.decoded = decoded
    //     next()
    //   })
    // }




// PAYMENT


//   USER API

  app.get('/users', async(req, res)=>{
    const result = await users.find().toArray()
    res.send(result)
  })

  app.get('/users/:email', async(req, res)=>{
    const userEmail = req.params?.email
    const query = {email: userEmail}
    const result = await users.findOne(query)
    res.send(result)
  })
  
  app.post(`/users`, async(req, res)=>{
    const user = req.body
    const query = {email : req.body.email} 
    const find = await users.findOne(query)
    if(find){
      return res.send  ({message: 'user already exists', insertedId : null})
    }
    const result = await users.insertOne(user)
    res.send(result)
  })

  app.patch('/users/:email', async (req, res) => {

    const updatedUser = req.body;
    const userEmail = req.params.email;
    const filter = { email: userEmail };
    const updateDoc = {
        $set: {
            role: req.body.role,
        }

    };
    const result = await users.updateOne(filter, updateDoc);
    res.send(result);
  })

  
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('boss is sitting')
})


app.listen(port, ()=>{
    console.log(`Landlord is sitting on port ${port} `)
})

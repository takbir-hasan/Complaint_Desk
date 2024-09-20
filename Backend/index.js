import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();
const app = express()
const port = process.env.PORT || 3000
const URI = process.env.MongoDB
try {
  mongoose.connect(URI)
  console.log("Connected to MongoDB");
  
} catch (error) {
  console.log("Error",error);
  
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening http://www.localhost:${port}`)
})
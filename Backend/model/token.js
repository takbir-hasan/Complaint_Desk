import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
      token: String,
      expiresAt: { type: Date, expires: '20m' } 
    });
    
const Token = model('Token', tokenSchema);

export default Token;

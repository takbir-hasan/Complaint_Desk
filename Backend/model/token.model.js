import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: String,
    expiresAt: { type: Date, required: true }  // No need to add 'expires' here
});

// Create TTL index manually
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 600 }); // 600 seconds = 10 minutes

const Token = mongoose.model('Token', tokenSchema);

export default Token;

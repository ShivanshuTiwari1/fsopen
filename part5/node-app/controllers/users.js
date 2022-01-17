import express from "express";
// import { sign } from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from 'bcrypt'


const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
    const body = req.body;
    const saltRounds = 10;
    
    // <TODO>//Checking for unique username...
    
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    
    const savedUser = await user.save();
    
    res.json(savedUser);
})

userRouter.get('/', async (req, res) => {
    const users = await User.find().populate('blogs', { title: 1, author: 1, likes: 1, url: 1});
    res.json(users);
})

export default userRouter;
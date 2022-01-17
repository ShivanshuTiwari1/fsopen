import express from "express";
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
    const body = req.body;
    
    const user = await User.findOne({username: body.username})
    
    const passwordMatch = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
    
    if(!(user && passwordMatch))
    {
        return res.status(401).json({
            error: 'Invalid username or password'
        })
    }
    
    const userForToken = {
        username: user.username,
        id: user._id
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET)
    
    res.status(200).send({
        token,
        username: user.username,
        name: user.name
    })
})


export default loginRouter;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

// ======register user

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
            impression
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordhash = await bcrypt.hash(password,salt);

        const newUser=new User({
            firstName,
            lastName,
            email,
            password:passwordhash,
            picturePath,
            friends,
            location,
            occupation,
            impression:Math.floor(Math.random()*10000),
            viewedProfile:Math.floor(Math.random()*10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
// ============ loging in=======

export const login = async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"user does not exist"});

        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch) return res.status(400).json({msg:"Invalid Credintials"});

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token,user});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
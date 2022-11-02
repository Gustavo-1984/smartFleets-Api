import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

const checkAuth = async (req, res, next) => {
    
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, 'Super palabra');
            req.usuario = await Users.findById(decoded.id).select('-password -__v -token -createdAt -updatedAt');
            console.log(req.usuario)
            return next();
        } catch (error) {
           return res.status(404).json({mesg: "Hubo un error"})
        
        }
            
        }
        if (!token) {
            const error = new Error('No hay token');
            res.status(401).json({mesg: error.message})
        }
        next()
     }


export default checkAuth;
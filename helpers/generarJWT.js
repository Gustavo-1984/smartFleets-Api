import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()


const generateJWT = (id) =>{
    return jwt.sign({id}, process.env.SECRET_JWT, {
        expiresIn: "1h",
    })
}
export default generateJWT
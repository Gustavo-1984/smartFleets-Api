import jwt from 'jsonwebtoken';

const generateJWT = (id) =>{
    return jwt.sign({id}, "Super palabra", {
        expiresIn: "30d"
    })
}
export default generateJWT
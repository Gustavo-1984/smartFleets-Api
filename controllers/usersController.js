import Users from '../models/Users.js';
import generarId from '../helpers/generarId.js';
import generateJWT from '../helpers/generarJWT.js';


const newUser = async (req, res, next) =>{
    const {usuario} = req.body;
    const userExist = await Users.findOne({usuario}); 
    if(userExist){
        const error = new Error('El usuario ya existe');
        return res.status(400).json({mesg: error.message})
    }
    try {
        const user = new Users(req.body);
        user.token = generarId();
        await user.save();
        console.log(user)
        res.json({message: 'Usuario agregado correctamente'})
    } catch (error) {
        console.log(error)
        next()
    }
}

const viewUsers = async (req, res, next) =>{
    try {
        const users = await Users.find()
        res.json(users)
    } catch (error) {
        console.log(error);
        next();
    }
}

const getUser = async (req, res, next) =>{
    try {
        const user = await Users.findById(req.params.id);
        res.json(user)
    } catch (error) {
        console.log(error);
        next();
    }
}

const updateUser = async (req, res, next) =>{
    try {
        const user = await Users.findOneAndUpdate({_id: req.params.id}, 
            req.body,{
                new: true
        });
        res.json(user)
    } catch (error) {
        console.log(error);
        next();
    }
}

const deleteUser = async (req, res, next) =>{
    try {
        await Users.findOneAndDelete({_id: req.params.id})
        res.json({message: 'El usuario ha sido eliminado'})
    } catch (error) {
        console.log(error);
        next();
    }
}

const authUser = async (req, res, next) =>{
    const {usuario, password} = req.body;
    
    const user = await Users.findOne({usuario});
    console.log(user)
    if(!user){
        const error = new Error('El usuario no existe');
        return res.status(404).json({mesg: error.message})
    }

    //Comprobar password
    if (await user.isValidPassword(password)) {
         res.json({
             _id: user._id,
             user: user.usuario,
             token: generateJWT(user._id)
             })
    } else{
        const error = new Error('Password incorrecto');
        return res.status(404).json({mesg: error.message})
    }
}

const confirm = async (req, res) =>{
    const {token} = req.params
    const user = await Users.findOne({token})
    if(!user){
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }else{
        try {
            user.confirm = true
            user.token = ""
            await user.save()
            res.json({msg: "Usuario confirmado"})
            
        } catch (error) {
            console.log(error)
        }
    }
}

const newPassword = async (req, res) =>{
    const {usuario} = req.body
    const user = await Users.findOne({usuario})
    if(!user){
        const error = new Error("El usuario no existe")
        return res.status(404).json({msg: error.message})
    }
    try {
        user.token = generarId()
        await user.save()
        res.json({msg: "Enviando token"})
    } catch (error) {
        console.log(error)
    }

}

const tokenValid = async(req, res) =>{
    const {token} = req.params

    const tokenValid = await Users.findOne({token})

    if (tokenValid) {
        res.json({msg: "token valido!"})
    }else{
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }
}

const uploadPassword = async (req, res) =>{
    const {token} = req.params
    const {password} = req.body
    const user = await Users.findOne({token})
    if(!user){
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }else{
        try {
            user.password = password
            user.token = ""
            await user.save()
            res.json({msg: "Contraseña actualizada"})
            
        } catch (error) {
            console.log(error)
        }
    }
}

const perfil = async (req, res) =>{
  
    const {usuario} = req
    console.log(usuario)
    res.json(usuario)
   
}






export {newUser, perfil, viewUsers, getUser, updateUser, deleteUser, authUser, newPassword, tokenValid, confirm, uploadPassword}
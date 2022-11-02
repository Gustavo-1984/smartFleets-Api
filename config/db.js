import mongoose from "mongoose";


const conectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb://localhost:27017/rest_api', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `${connection.connection.host}/${connection.connection.port}`
        console.log(`MongoDB conectado en ${url}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default conectDB;
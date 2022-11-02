import mongoose from 'mongoose';


const vehiculosSchema = mongoose.Schema({
    tag: {
        type: String,
        trim: true,
        unique: true
    },
    placas: {
        type: String,
        trim: true
    },
    modelo: {
        type: String,
        trim: true
    },
    marca: {
        type: String,
        trim: true
    },
    numeroEconomico: {
        type: String,
        trim: true
    },
    odometro: {
        type: Number,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    isActive: Boolean,
    user: {type: mongoose.Types.ObjectId, ref: 'Users'},
});

const Vehiculos = mongoose.model('Vehiculos', vehiculosSchema);
export default Vehiculos;
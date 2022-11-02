import mongoose from 'mongoose';


const usersSchema = mongoose.Schema({
    venta: {
        type: Number,
    },
    litros: {
        type: Number,
    },
    tag: {
        type: String,
        trim: true,
    },
    serialNumber:{
        type: String,
    },
    user: {type: mongoose.Types.ObjectId, ref: 'Users'},
  
},

{
    timestamps: true
});

const Ventas = mongoose.model('Ventas', usersSchema);
export default Ventas;
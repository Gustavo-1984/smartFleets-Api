import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usersSchema = mongoose.Schema({
    usuario: {
        type: String,
        trim: true,
        
    },
    password: {
        type: String,
        trim: true
    },

        isActive: Boolean,
    confirm: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        trim: true,
        
    },
   
    vehiculos: [{type: mongoose.Types.ObjectId, ref: 'Vehiculos'}],
    ventas: [{type: mongoose.Types.ObjectId, ref: 'Ventas'}],
    devices: [{type: mongoose.Types.ObjectId, ref: 'Devices'}]
 },{
    timestamps: true
 });
usersSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
   
})

usersSchema.methods.isValidPassword = async function(passwordForm) {
    return await bcrypt.compare(passwordForm, this.password);
}

const Users = mongoose.model('Users', usersSchema);
export default Users;
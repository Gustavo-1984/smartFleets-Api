import mongoose from 'mongoose';


const devicesSchema = mongoose.Schema({
    serialNumber: {
        type: String,
        trim: true,
        
    },
    dId: {
        type: String,
        trim: true,
        
    },
    isActive: Boolean,
    user: {type: mongoose.Types.ObjectId, ref: 'Users'}
},{
    timestamps: true
});

const Devices = mongoose.model('Devices', devicesSchema);
export default Devices;
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomServiceSchema  = new Schema({
    room_id:{
        type: String,
        required: true,
        unique: true,
        maxlength: 3 // Maximum of 3 characters
    },
    room_name:{
        type: String,
        required: true,
    },
    room_type:{
        type: String,
        required: true,
    },
    room_price:{
        type: Number,
        required: true,
    },
    room_status:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false,
    },
    description:{
        type: String,
        required: false,
    },
});


const RoomService = mongoose.model("roomservice", roomServiceSchema);

export default RoomService;
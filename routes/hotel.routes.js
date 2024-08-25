import express from 'express';
import RoomService from '../models/roomservice/roomservice.js';

const router = express.Router();

//หาข้อมูลทั้งหมด
router.get('/', async (req, res, next) => {
  try{
    const roomservice = await RoomService.find();
    res.json(roomservice);
  }catch(err){
    next(err);
  }
});

//สร้างข้อมูลใหม่ โดยใช้ post และส่งข้อมูลที่ต้องการเพิ่มเข้ามา
router.post('/create-room', async(req, res, next) => {  
    try{
        const create_roomservice = await RoomService.create(req.body);
        console.log(req.body);
        res.status(201).json(create_roomservice);
    }catch(err){
        
        next(err);
    }
    
});

//หาข้อมูลโดยการใช้ room_id ที่เราต้องการ เพราะ room_id เป็น unique จึงสามารถใช้ได้ 
router.put('/update-room', async (req, res, next) => {
    try {
        const { room_id, ...updateData } = req.body; // Extract room_id and the rest of the data

        // Validate if room_id is provided
        if (!room_id) {
            return res.status(400).json({ error: 'Room ID is required' });
        }

        // Find the room by room_id and update
        const update_roomservice = await RoomService.findOneAndUpdate(
            { room_id: room_id },
            { $set: updateData },
            { new: true }
        );

        if (!update_roomservice) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.status(200).json(update_roomservice);
        console.log('Update complete:', update_roomservice);
    } catch (err) {
        next(err);
    }
});

//ลบข้อมูลโดยใช้ room_id ที่เราต้องการลบ
router.delete('/delete-room/:room_id', async (req, res, next) => {
    try {
        const room_id = req.params.room_id;

        // Find the room by room_id
        const deleteroom = await RoomService.findOne({ room_id: room_id });
        if (!deleteroom) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Delete the room by room_id
        await RoomService.deleteOne({ room_id: room_id });

        res.status(200).json({ message: "Room has been deleted" });
        console.log("Room deleted: ", deleteroom);
    } catch (err) {
        next(err);
    }
});

export default router;
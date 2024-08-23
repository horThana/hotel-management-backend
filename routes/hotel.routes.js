import express from 'express';
import RoomService from '../models/roomservice/roomservice.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try{
    const roomservice = await RoomService.find();
    res.json(roomservice);
  }catch(err){
    next(err);
  }
});

router.post('/create-room', async(req, res, next) => {  
    try{
        const create_roomservice = await RoomService.create(req.body);
        console.log(req.body);
        res.status(201).json(create_roomservice);
    }catch(err){
        
        next(err);
    }
    
});

router.put('/update-room/:id', async (req, res, next) => {
    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid Room ID' });
        }

        // Log request details
        console.log('Request Params:', req.params);
        console.log('Request Body:', req.body);

        const update_roomservice = await RoomService.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
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

router.delete('/delete-room/:id', async(req, res, next) => {
    
    try{
        const id = req.params.id;

        const deleteroom = await RoomService.findById({_id: id});
        if(!deleteroom){
            return res.status(404).json({message: "Room not found"});
        }
        await RoomService.findByIdAndDelete(id);

        res.status(200).json({message: "Room has been deleted"});
        console.log(deleteroom + "complete to delete");
    }catch(err){
        next(err);
    }
});

export default router;
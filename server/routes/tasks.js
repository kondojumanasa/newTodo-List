const express=require('express');
const Task =require('../models/task');
const router=express.Router();

// Add new task 

router.post('/',async (req,res)=>{
    const task =  new Task({title:req.body.title});
    await task.save();
    res.json(task);
})

//Get all tasks

router.get('/',async (req,res)=>{
    const tasks = await Task.find();
    res.json(tasks)
});

//update a atsk
router.put('/:id',async (req,res)=>{
    const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.json(task);
})

//delete a task 
router.delete('/:id',async (req,res)=>{
   await Task.findByIdAndDelete(req.params.id);
   res.json({messgae:'Task Deleted'});
});

module.exports= router;

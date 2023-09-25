const Task = require('../models/task');
const express = require('express');
const router = express.Router();

router.get('/', async function(req, res){
    const tasks = await Task.find({}).lean();
    console.log(tasks);
    res.render('index', {title:'Tasks', tasks});
});

router.get('/create', function(req, res){
    res.render('create', {title:'Add Task'});
});
router.post('/create', async function(req, res){
    const title = req.body.title;
    const task = new Task({title, completed:false});
    await task.save();
    res.redirect('/');
});
router.post('/complete', async function (req, res) {
    const id = req.body.id;
    const task = await Task.findById(id);
    
    // Инвертируем значение completed
    task.completed = !task.completed;
    
    await task.save();
    res.redirect('/');
});

router.get('/edit/:id', async function(req, res){
    const id = req.params.id;
    const task = await Task.findOne({_id:id}).lean();
    res.render('edit', {title:'Edit', task});
});

router.post('/edit/:id', async function(req, res){
    const id = req.params.id;
    const task = await Task.findOne({_id:id});
    task.title = req.body.title;
    await task.save();
    res.redirect('/')
});

router.post('/delete', async function(req, res){
    const id = req.body.id;
    await Task.deleteOne({_id:id});
    res.redirect('/');
});


module.exports = router;
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// Указываем явное имя коллекции "tasks" в базе данных "todos"
const Task = mongoose.model('Task', taskSchema, 'tasks');

module.exports = Task;
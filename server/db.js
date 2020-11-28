const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  createdBy: { type: String, required: true },
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;
    },
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

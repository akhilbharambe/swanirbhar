const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
});

module.exports = mongoose.model('Lesson', lessonSchema);

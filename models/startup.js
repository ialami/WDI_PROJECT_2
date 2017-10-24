const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

const startupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  founders: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  vision: {
    type: String,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  incubator: {
    type: String
    // required: true
  },
  partnering: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  fundingtype: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [ commentSchema ]
});

startupSchema.methods.belongsTo = function startupBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Startup', startupSchema);

import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del evento es requerido'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true,
    maxlength: 500
  },
  date: {
    type: Date,
    required: [true, 'La fecha del evento es requerida']
  },
  location: {
    type: String,
    required: [true, 'La ubicación es requerida'],
    trim: true
  },
  venue: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  ticketsAvailable: {
    type: Number,
    min: 0,
    default: 0
  },
  category: {
    type: String,
    enum: ['recital', 'festival', 'meetup', 'otro'],
    default: 'recital'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

eventSchema.index({ title: 'text', description: 'text' });

const Event = mongoose.model('Event', eventSchema);

export default Event;

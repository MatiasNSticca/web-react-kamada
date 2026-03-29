import Event from '../models/Event.js';

export const getAllEvents = async (query = {}) => {
  const { 
    page = 1, 
    limit = 20, 
    category, 
    active, 
    search,
    upcoming,
    sortBy = 'date',
    sortOrder = 'asc'
  } = query;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (active !== undefined) {
    filter.active = active === 'true';
  }

  if (upcoming === 'true') {
    filter.date = { $gte: new Date() };
    filter.active = true;
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } }
    ];
  }

  const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  const events = await Event.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Event.countDocuments(filter);

  return {
    events,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

export const getEventById = async (id) => {
  const event = await Event.findById(id);

  if (!event) {
    throw new Error('Evento no encontrado');
  }

  return event;
};

export const createEvent = async (eventData) => {
  const event = await Event.create(eventData);
  return event;
};

export const updateEvent = async (id, eventData) => {
  const event = await Event.findByIdAndUpdate(
    id,
    eventData,
    { new: true, runValidators: true }
  );

  if (!event) {
    throw new Error('Evento no encontrado');
  }

  return event;
};

export const deleteEvent = async (id) => {
  const event = await Event.findByIdAndDelete(id);

  if (!event) {
    throw new Error('Evento no encontrado');
  }

  return event;
};

export default {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};

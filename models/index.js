const User = require('./User');
const Event= require('./Event');
const Message = require('./Message');
const Category = require ('./Category')
const UserEvent = require ('./UserEvent')
const Tag = require ('./Tag')
const EventTag = require ('./EventTag')


//User creator

User.hasMany(Event,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Event.belongsTo(User, {
  foreignKey: 'user_id'
})


//Users and Events

User.belongsToMany(Event, {
  through: {
    model:UserEvent,
    unique: false
  },

  as: 'participating'

});

Event.belongsToMany(User, {
  through: {
    model:UserEvent,
    unique: false
  },
  
  as: 'participants'
});

//Events and messages

Event.hasMany(Message, {
  foreignKey: 'event_id',
  onDelete: 'CASCADE'
});

Message.belongsTo(Event, {
  foreignKey: 'event_id'
});

//Categories and Events

Category.hasMany(Event,{
  foreignKey: 'category_id',
})
Event.belongsTo(Category, {
  foreignKey: 'category_id',
})


//Users and Messages

User.hasMany(Message, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Message.belongsTo(User, {
  foreignKey: 'user_id'
});

//Events and Tags

Event.belongsToMany(Tag, {
  through: {
    model: EventTag,
    unique: false
  },
  as: 'tagged_events'
});

Tag.belongsToMany(Event, {
  through: {
    model: EventTag,
    unique: false
  },
  as: 'event_tags'
});


module.exports = { User, Event, Message, Category, UserEvent, Tag, EventTag };


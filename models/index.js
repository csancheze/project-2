const User = require('./User');
const Event= require('./Event');
const Message = require('./Message');
const Category = require ('./Category')
const UserEvent = require ('./UserEvent')

//Users and Events

User.belongsToMany(Event, {
  through: {
    model:UserEvent,
    unique: false
  },
  
  as: 'created_events'
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

module.exports = { User, Event, Message };

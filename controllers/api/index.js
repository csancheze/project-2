const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const messagesRoutes = require('./messageRoutes');
<<<<<<< HEAD
=======
const tagRoutes = require('./tagRoutes')
>>>>>>> ac11eb2be8361b976287ac6376011cd915aa8a07
const userEventsRoutes = require('./userEventRoutes');
const categoriesRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/messages', messagesRoutes);
<<<<<<< HEAD
=======
router.use('/tags', tagRoutes)
>>>>>>> ac11eb2be8361b976287ac6376011cd915aa8a07
router.use('/categories', categoriesRoutes);
router.use('/userEvents', userEventsRoutes);

module.exports = router;

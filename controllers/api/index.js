const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const messagesRoutes = require('./messageRoutes');
const userEventsRoutes = require('./userEventRoutes');
const categoriesRoutes = require('./categoryRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/messages', messagesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/userEvents', userEventsRoutes);

module.exports = router;

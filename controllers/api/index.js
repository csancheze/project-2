const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const messagesRoutes = require('./messageRoutes');
const userEventsRoutes = require('./userEventRoutes');
const categoriesRoutes = require('./categoryRoutes');
const tagRoutes = require('./tagRoutes');
const eventTagRoutes = require('./eventTagRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/messages', messagesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/userEvents', userEventsRoutes);
router.use('/tags', tagRoutes);
router.use('/event_tags', eventTagRoutes);

module.exports = router;

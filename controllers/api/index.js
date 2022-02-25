const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const messagesRoutes = require('./messageRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/messages', messagesRoutes);

module.exports = router;

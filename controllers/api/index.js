const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const messagesRoutes = require('./messageRoutes');
const tagRoutes = require('./tagRoutes')

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/messages', messagesRoutes);
router.use('/tags', tagRoutes)

module.exports = router;

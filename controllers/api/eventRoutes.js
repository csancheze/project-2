const router = require('express').Router();
const { Event } = require('../../models');
const withAuth = require('../../utils/auth')

// CREATE new event
router.post('/', withAuth, async (req, res) => {
    try {
        const dbeventData = await Event.create({
            ...req.body,
            user_id: req.session.user_id

        });

        res.status(201).json(dbeventData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

module.exports = router;

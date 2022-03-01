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

// UPDATE an event
router.put('/:id', withAuth, async (req, res) => {
    try {
      const eventData = await Event.update({
        title: req.body.title,
        content: req.body.content,
        date_celebration: req.body.date_celebration,
        category_id: req.body.category_id,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
      );
      if (!eventData) {
        res.status(404).json({message: 'No Event found with this id!'});
        return;
      }
      res.status(200).json(eventData)
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE an event
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const eventData = await Event.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!eventData) {
        res.status(404).json({ message: 'No Event found with this id!' });
        return;
      }
  
      res.status(200).json(eventData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

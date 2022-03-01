const router = require('express').Router();
const { UserEvent } = require('../../models');
const withAuth = require('../../utils/auth')

//CREATE a participant on event instance
router.post('/',  withAuth, async (req, res) => {
    try {
        const newParticipant = await UserEvent.create({
          user_id: req.session.user_id,
          event_id: req.body.event_id,
        });
  
      res.status(200).json(newParticipant);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  //DELETE a participant on event instance
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const ParticipantData = await UserEvent.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!ParticipantData) {
        res.status(404).json({ message: 'The participang has not been found in this event!' });
        return;
      }
  
      res.status(200).json(ParticipantData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

const router = require('express').Router();
const { EventTag } = require('../../models');
const withAuth = require('../../utils/auth')


  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const array = req.params.id.split("+")
      console.log(array)
      console.log(array[0])
      console.log(array[1])
      const eventTagData = await EventTag.destroy({
        where: {
          tag_id: array[0],
          event_id: array[1]
        },
      });
  
      if (!eventTagData) {
        res.status(404).json({ message: 'That tag has not been found in this event!' });
        return;
      }
  
      res.status(200).json(eventTagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

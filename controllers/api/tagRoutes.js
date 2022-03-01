const router = require('express').Router();
const { Tag, Event, EventTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include:[{ model: Event, through: EventTag, as: 'tagged_events'}]
    });
    res.status(200).json(tagData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
    try {
      const tagData = await Tag.findByPk(req.params.id, {
        include: [{ model: Event, through: EventTag, as: 'taggged_events' }]
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });



router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
        tag_name: req.body.tag_name
        })
    const newTagData = await Tag.findAll({
        where: { tag_name: req.body.tag_name}
    })
    const eventTagData = await EventTag.create({
        event_id: req.body.eventId,
        tag_id: newTagData.id ,
    })

    res.status(200).json(tagData);
    res.status(200).json(eventTagData)
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id:req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({message: 'No tag found with this id!'})
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});



module.exports = router;

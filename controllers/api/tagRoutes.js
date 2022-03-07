const router = require('express').Router();
const { Tag, EventTag } = require('../../models');

//Create a tag (if it is not created) and an event tag relation
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll();
    const tags = tagData.map((tag) => tag.get({ plain: true }));

    console.log(tags)
    const tagsArray = []
    for (i = 0; i < tags.length; i++) {
      tagsArray.push(tags[i].tag_name)
    }
    console.log(tagsArray)

    if (!tagsArray.includes(req.body.tag_name)) {
      const newTag = await Tag.create({
        tag_name: req.body.tag_name
      })
      console.log(newTag)
    }

    const newTagData = await Tag.findAll({
      where: { tag_name: req.body.tag_name }
    })
    console.log(newTagData)

    const eventTagData = await EventTag.create({
      event_id: req.body.eventId,
      tag_id: newTagData[0].id,
    })

    res.status(200).json(eventTagData)
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete the tag
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' })
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

//Get all tags
router.get('/all', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      attributes:  ['tag_name'] 
    });

    if (!tagsData) {
      res.status(404).json({ message: 'No tags found' });
      return;
    }
    const tags = tagsData.map((tag) => tag.get({ plain: true }));
    tags.sort((a, b) => (a.tag_name > b.tag_name) ? 1 : ((b.tag_name > a.tag_name) ? -1 : 0));
    const tagsArray = []
    for (i = 0; i < tags.length; i++) {
      tagsArray.push(tags[i].tag_name)
    }
//    console.log(tagsArray);

    res.status(200).json(tagsArray);
    


  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

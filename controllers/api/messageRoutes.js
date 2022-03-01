const router = require('express').Router();
const { Message } = require('../../models');
const withAuth = require('../../utils/auth')

//CREATE a message
router.post('/',  withAuth, async (req, res) => {
    try {
      const newMessage = await Message.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newMessage);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// UPDATE a message
router.put('/:id', withAuth, async (req, res) => {
    try {
      const messageData = await Message.update({
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
      );
      if (!eventData) {
        res.status(404).json({message: 'No Message found with this id!'});
        return;
      }
      res.status(200).json(messageData)
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE a message
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const messageData = await Message.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!messageData) {
        res.status(404).json({ message: 'No Event found with this id!' });
        return;
      }
  
      res.status(200).json(messageData);
    } catch (err) {
      res.status(500).json(err);
    }
  });




module.exports = router;

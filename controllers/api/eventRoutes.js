const router = require('express').Router();
const { Event, Category, User, UserEvent} = require('../../models');
const withAuth = require('../../utils/auth')
const nodemailer = require('nodemailer')
const generateEmail = require('../../utils/emailGenerator')
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
<<<<<<< HEAD
    user: process.env.USERNAME,
    pass: process.env.USER_PW
=======
    user: USERNAME,
    pass: USER_PW
>>>>>>> f38fffcf8ab65e5a2c5eddabf9bb9bfc04146487
  },
  tls: {
    rejectUnauthorized: false
}
})



// CREATE new event
router.post('/', withAuth, async (req, res) => {
    try {
        const dbeventData = await Event.create({
            ...req.body,
            user_id: req.session.user_id
        });

        const categoryeventData = await Category.findByPk(req.body.category_id,{
          include: [
          {
              model:Event,
              include: [
                  {
                  model: User,
                  through: UserEvent,
                  as: 'participants'
                  },
              ],
          },
          ],
      });

      const category = categoryeventData.get({ plain: true });

      const arrEmail = []
      for(i=0; i<category.events.length; i++){
          for(j=0; j<category.events[i].participants.length; j++){
          if (!arrEmail.includes(category.events[i].participants[j].email))
              arrEmail.push(category.events[i].participants[j].email)
          }
      }
      console.log(arrEmail)
      console.log(category.name)

      const mailOptions = {
          from: `umeetmailer@gmail.com`,
          to: arrEmail,
          subject: `New Event`,
          text: `Hey! Someone has created a new event that might interest you! Come back to see what's happening at Ü Meet`,
          html: generateEmail(category.name,category.id),
          replyTo: `umeet.mailer@gmail.com`
      }
      transporter.sendMail(mailOptions, function(err, res) {
          if (err) {
          console.error('there was an error: ', err);
          } else {
          console.log('here is the res: ', res)
          }
      })

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
        link: req.body.link
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

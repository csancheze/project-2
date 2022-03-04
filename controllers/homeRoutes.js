const router = require('express').Router();
const { UserEvent, Message, Event, User, Category, Tag, EventTag } = require('../models');
const withAuth = require('../utils/auth');
const categoriesData = require('../seeds/categoriesData.json')

//This gets all the categories with each event. This can be used for the homepage to show all categories and some info of the event and the creator


router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Event,
          include: {
            model: User,
            attributes: ['name']
          }
        },
      ],
    });

    const tagData = await Tag.findAll({
    })
  
  
    const tags = tagData.map((tag) => tag.get({ plain: true }));

    if (categoryData == "") {
      const createCategories = await Category.bulkCreate(categoriesData, {
        individualHooks: true,
        returning: true,
      })
      console.log(createCategories)
    }
    const categories = categoryData.map((category) => category.get({ plain: true }));

    res.render('homepage', {
      tags,
      categories,
      logged_in: req.session.logged_in
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

//This should be the get call for each category after clicking the category, it includes the event and user creator

router.get('/category/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Event,
          include: {
            model: User,
            attributes: ['name']
          }
        },
      ],
    });

    const now = new Date()
    now.setHours(now.getHours()-2)

    const category = categoryData.get({ plain: true });
    console.log(category);
    category.events = category.events.filter(event => event.date_celebration.getTime() >= now.getTime());
    category.events.sort((a, b) => (a.date_celebration > b.date_celebration) ? 1 : ((b.date_celebration > a.date_celebration) ? -1 : 0));


    res.render('category', {
      ...category,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});



//This should be the get call for each event after clicking it in the category, it includes the user as participants and the messages 

router.get('/event/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Tag,
          through: EventTag,
          as: 'event_tags'
        },
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: User,
          through: UserEvent,
          attributes: ['name'],
          as: 'participants'
        },
        {
          model: Category,
          attributes: ['name']
        },

        {
          model: Message,
          include: [
            {
              model: User,
              attributes: ['name']
            }
          ],
        },
      ],
    });

    const event = eventData.get({ plain: true });

    res.render('event', {
      ...event,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/event_editor/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Category,
          attributes: ['name']
        },
      ],
    });

    const event = eventData.get({ plain: true });
    const categoryData = await Category.findAll()

    const categories = categoryData.map((category) => category.get({ plain: true }));

    res.render('event_editor', {
      categories,
      ...event,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});
// This is the profile which renders the user information including created events

router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });

    const categoryData = await Category.findAll()
    const user = userData.get({ plain: true });
    user.events.sort((a, b) => (a.date_celebration > b.date_celebration) ? 1 : ((b.date_celebration > a.date_celebration) ? -1 : 0));
    const categories = categoryData.map((category) => category.get({ plain: true }));



    res.render('profile', {
      categories,
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//This is the page for the users to view the events in which they are participants
router.get('/myevents', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Event,
          through: UserEvent,
          as: 'participating'
        },
      ]
    });

    const user = userData.get({ plain: true });
    user.participating.sort((a, b) => (a.date_celebration > b.date_celebration) ? 1 : ((b.date_celebration > a.date_celebration) ? -1 : 0));

    res.render('myevents', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//This for tags
router.get('/tag/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Event, through: EventTag, as: 'tagged_events' }]
    });

    console.log(tagData)

    if (!tagData) {
      res.status(404).json({ message: 'No events found with this tag!' });
      return;
    }

    const now = new Date()
    now.setHours(now.getHours()-2)

    const tag = tagData.get({ plain: true });
    console.log(tag)
    tag.tagged_events =  tag.tagged_events.filter(event => event.date_celebration.getTime() >= now.getTime());
    tag.tagged_events.sort((a, b) => (a.date_celebration > b.date_celebration) ? 1 : ((b.date_celebration > a.date_celebration) ? -1 : 0));

    res.render('tagged_events', { 
      ...tag,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/addtags/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [
         {
          model: Tag,
          through: EventTag,
          as: 'event_tags'
        },
      ],
    });

    const tagData = await Tag.findAll()

    const tags = tagData.map((tag) => tag.get({ plain: true }));
    const event = eventData.get({ plain: true });

    res.render('addtags', { 
      tags,
      ...event,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});





module.exports = router
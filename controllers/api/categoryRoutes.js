const router = require('express').Router();
const { Category, User, UserEvent } = require('../../models');
const withAuth = require('../../utils/auth')


// CREATE new category
router.post('/', withAuth, async (req, res) => {
    try {
        const dbCategoryData = await Category.create({
            ...req.body,
        });

        res.status(201).json(dbCategoryData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.put('/:id', withAuth, async (req, res) => {
    try {
      const categoryData = await Category.update({
        icon: "bi bi-heart"
      },
      {
        where: {
          name : "Health"
        },
      }
      );
      if (!categoryData) {
        res.status(404).json({message: 'No Category found with this id!'});
        return;
      }
      res.status(200).json(categoryData)
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;

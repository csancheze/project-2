const router = require('express').Router();
const { Category } = require('../../models');
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

module.exports = router;
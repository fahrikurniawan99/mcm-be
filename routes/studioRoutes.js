const express = require('express');
const router = express.Router();
const studioController = require('../controllers/studioControllers');
const validate = require('../middlewares/validationMiddleware');

const studioRules = {
    name: 'required|string',
};

router.get('/', studioController.getAllStudios);
router.post('/', validate(studioRules), studioController.createStudio);
router.get('/:id', studioController.getStudioById);
router.put('/:id', studioController.updateStudio);
router.delete('/:id', studioController.deleteStudio);

module.exports = router;

const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/showtimeControllers');
const validate = require('../middlewares/validationMiddleware');

const showtimeRules = {
    time: 'required|date',
    filmId: 'required|integer',
};

router.get('/', showtimeController.getAllShowtimes);
router.post('/', validate(showtimeRules), showtimeController.createShowtime);
router.get('/:id', showtimeController.getShowtimeById);
router.put('/:id', showtimeController.updateShowtime);
router.delete('/:id', showtimeController.deleteShowtime);

module.exports = router;

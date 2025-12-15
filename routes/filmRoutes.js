const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmControllers');
const validate = require('../middlewares/validationMiddleware');

const filmRules = {
    title: 'required|string',
    description: 'string',
    duration: 'required|integer',
    studioId: 'required|integer'
};

router.get('/', filmController.getAllFilms);
router.post('/', validate(filmRules), filmController.createFilm);
router.get('/:id', filmController.getFilmById);
router.put('/:id', filmController.updateFilm);
router.delete('/:id', filmController.deleteFilm);

module.exports = router;

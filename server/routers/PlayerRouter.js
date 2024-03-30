const Router = require('express');
const router = Router();

const PlayersController = require('../controllers/PlayersController');

router.post('/', PlayersController.create);
router.get('/', PlayersController.getAll);
router.get('/:id', PlayersController.getOne);

module.exports = router;
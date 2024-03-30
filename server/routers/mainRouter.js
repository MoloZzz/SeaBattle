const Router = require('express');
const router = Router();

const playerRouter = require('./PlayerRouter');


router.use('/player', playerRouter);


module.exports = router;
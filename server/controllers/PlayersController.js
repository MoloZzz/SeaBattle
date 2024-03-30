const ApiError = require('../errors/ErrorApi');
const {Player} = require('../DataBase/models');

class PlayerController{
    
    async create(req, res, next) {
        try {
          const {name,password} = req.body;
          if(!name || !password){
            return next(ApiError.badRequest("name or password is not entered"));
          }
          const newPlayer = Player.create(name,password);
          res.json(newPlayer);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        const players = await Player.findAll();
        return res.json(players);
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if(!id){
                return next(ApiError.NotFound("The requested resource with the given ID was not found in the database"));
            }
            const player = await Player.findByPk(id);
            return res.json(player);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new PlayerController();
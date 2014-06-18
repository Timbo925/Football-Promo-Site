var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;
var playerSchema = require('../model/player').playerSchema
var Player = require('../model/team').Player

var teamSchema = mongoose.Schema({
   name   : String,
   ranking: Number,
   players : [{type: ObjectId, ref: 'player'}]
   })

var Team = mongoose.model('team', teamSchema);

exports.Team = Team
exports.teamSchema = teamSchema

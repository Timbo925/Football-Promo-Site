var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;
var playerSchema = require('../model/player').playerSchema
var Player = require('../model/team').Player

var teamSchema = mongoose.Schema({
   name   : {type: String, required: true},
   country: {type: String, required: true},
   players : [{type: ObjectId, ref: 'player'}]
   })

teamSchema.pre('remove', function (next) {
   this.model('player').update(
      {_id : {$in: this.player}},
      {$pull : {players : this._id}},
      {multi: true},
      next
   );
});


var Team = mongoose.model('team', teamSchema);

exports.Team = Team
exports.teamSchema = teamSchema

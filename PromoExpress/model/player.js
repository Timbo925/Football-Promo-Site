var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;
var teamSchema = require('../model/team').teamSchema
var Team = require('../model/team').Team

var playerSchema = mongoose.Schema({
      name   : String,
      team   : [{type: ObjectId, ref : 'team'}]//{type : mongoose.Schema.Types.ObjectId, ref : 'team'}
});

playerSchema.methods.speak = function () {
   var text = "My name is " + this.name + '.'
   return text
}

playerSchema.pre('remove', function (next) {
   this.model('team').update(
      {_id : {$in: this.team}},
      {$pull : {players : this._id}},
      {multi: true},
      next
   );
});

var Player = mongoose.model('player', playerSchema) //Naam van de database

exports.Player = Player;
exports.playerSchema = playerSchema

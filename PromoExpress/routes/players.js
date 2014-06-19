var express = require('express');
var router = express.Router();
var PlayersDao = require('../dao/playersDao').PlayersDao

var mongoose = require('mongoose')
var Player = require('../model/player').Player
var playerSchema = require('../model/player').playerSchema
var Team = require('../model/team').Team

router.get('/', function(req, res) {
   Player.find().populate('team').exec(function (err, players) {
      if (err) res.json(500,new Error(err))
      res.json(200,players)
   })
});

//Ceating new player with name
router.post('/', function(req, res) {
   var body = req.body
   if (body.name == null) {
      res.json({message : "no name given"})
   } else {
      var player = new Player()
      player.name = body.name
      if (body.team != null) {
         for (var i = 0; i < body.team.length; i++) {
            player.team.addToSet(body.team[i]) //Toevoegen van id's van set
         }
      }

      player.save(function (err, player) {
         if (err) {
            console.error(err)
            res.json({message : "Player not saved to db"})
         } else {
            res.json(player)
         }

      })

   }
});

//Will delete itselve from teams
router.delete('/:id', function(req, res) {
   var id = req.params.id;
   Player.findById(id, function (err, player) {
      if (err) console.error(err)
      if (player == null) {
         res.json(500, 'User not found')
      } else {
         console.log("Delete player: " + player)
         player.remove( function (err, res ) {
            if (err) console.error(err)
            res.json(200)
         })
      }
   })
});


//TODO fix toeveogen/verwijderen teams
router.put('/:id', function(req, res) {
   var id = req.params.id;
   var body = req.body
   Player.findById(id, function (err, player) {
      if (err) console.error(err)

      if (body.name != null) {
         player.name = body.name;
      }
      if (body.team != null) {
         player.team = [];
         for (var i = 0; i < body.team.length; i++) {
            player.team.addToSet(body.team[i]) //Toevoegen van id's van set
         }
      }

      player.save(function (err, player) {
         if (err) {
            console.error(err)
            res.json({message : "Player not saved to db"})
         } else {
            res.json(player)
         }

      })

   })
});

// Retreives the player with team populated
router.get('/:id', function(req, res) {
   var id = req.params.id;
   Player.findById(id).populate('team').exec(function (err, player) {
      if (err) console.error(err)
      res.json(200, player)
   })
});

//////////

router.get('/test' , function (req,res) {
   var player1 = new Player({name: 'Timbo', age : 22})
   var team1 = Team({name: 'Belgie', ranking : 5})

   player1.team.push(team1);
   console.log(player1)

   team1.players.push(player1);
   console.log(team1)

   player1.save(function (err, player) {
      if (err) return console.error(err);
      team1.save(function (err, team) {
         if (err) return console.error(err)
         res.json(200, team)
      })
   })
})



module.exports = router;

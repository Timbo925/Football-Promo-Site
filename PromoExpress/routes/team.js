var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var Team = require('../model/team').Player
var teamSchema = require('../model/team').playerSchema


router.get('/', function(req, res) {
   Team.find().populate('player').exec(function (err, players) {
      if (err) res.json(500,new Error(err))
      res.json(200,players)
   })
});

router.post('/', function(req, res) {
   var body = req.body
   if (body.name == null || body.country == null) {
      res.json({message : "Request needs to contain {name : String, country : String}"})
   } else {
      var team = new Team({name: body.name, country: body.country})
      team.save(function (err, team) {
         if (err) {
            console.error(err)
            res.json({message : "Team not saved to db"})
         } else {
            res.json(team)
         }
      })
   }
});

router.delete('/:id', function(req, res) {
   var id = req.params.id;
   Team.findById(id, function (err, team) {
      if (err) console.error(err)
      if (team == null) {
         res.json(500, 'User not found')
      } else {
         console.log("Delete team: " + team)
         team.remove( function (err, res ) {
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
   Team.findById(id, function (err, team) {
      if (err) console.error(err)

      if (body.name != null) {
         team.name = body.name;
      }
      if (body.country != null) {
         team.country = body.country
      }

      team.save(function (err, player) {
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
   Team.findById(id).populate('player').exec(function (err, team) {
      if (err) console.error(err)
      res.json(200, team)
   })
});

module.exports = router;

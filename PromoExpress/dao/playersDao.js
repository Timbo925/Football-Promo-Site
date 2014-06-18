var CollectionDriver = require('./collectionDriver').CollectionDriver;

PlayersDao = function(db) {
   console.log('New PlayerDao')
  this.collectionDriver = new CollectionDriver(db);
};

PlayersDao.prototype.findAll = function(callback) {
   this.collectionDriver.findAll('players', function(err, result) {
      if (err) callback(err);
      else callback(null, result)
   })
};

PlayersDao.prototype.get = function(id, callback) {
   this.collectionDriver.get('players', id,function(err, result) {
      if (err) callback(err)
      else callback(null, result)
   })
}

PlayersDao.prototype.update = function(obj, id, callback) {
   this.collectionDriver.update('players', id,function(err, result) {
      if (err) callback(err)
      else callback(null, result)
   })
}

PlayersDao.prototype.save = function(obj, callback) {
   if (obj.name == null) callback(new Error("Wrong params to safe player"))
   else {
      this.collectionDriver.save('players',obj, function(err, result) {
         if (err) callback(err)
         else callback(null, result)
      })
   }
}

PlayersDao.prototype.delete = function(entityId, callback) {
   this.collectionDriver.delete('players', entityId, function(err, result) {
      if (err) callback(err)
      else callback(null, result)
   })
}

exports.PlayersDao = PlayersDao;

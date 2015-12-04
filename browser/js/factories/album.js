app.factory('AlbumFactory', function($http, StatsFactory) {
  var fetchAll = function(){
    return $http.get('/api/albums/')
    .then(res => $http.get('/api/albums/' + res.data[1]._id))
    .then(res => res.data)
    .then(album => {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.songs.forEach(function(song){
        song.audioUrl = '/api/songs/' + song._id + '.audio';
      });
      return album;
    })
    .then(function resolve(album) {
      return StatsFactory.totalTime(album)
      .then(function resolve(totalTime) {
        album.totalTime = totalTime;
        return album;
      });
    })
  }

  return {
    fetchAll: fetchAll
  }

})

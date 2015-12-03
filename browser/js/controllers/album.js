app.controller('AlbumCtrl', function($scope, $http, $rootScope, StatsFactory) {

  // load our initial data
  $http.get('/api/albums/')
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
      debugger;
      album.totalTime = totalTime;
      return album;
    });
  })
  .then(function resolve(album) {
    $scope.album = album;
  })
  .catch(console.error.bind(console));

  // main toggle
  $scope.toggle = function(song) {
    PlayerFactory.toggle(song)
  }

  // // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num%m)+m)%m; };

  // jump `val` spots in album (negative to go back)
  function skip (val) {
    var idx = PlayerFactory.retrieveIdx($scope.album, val);
    $rootScope.$broadcast('play', $scope.album.songs[idx]);
  };
  function next () { skip(1); };
  function prev () { skip(-1); };

});

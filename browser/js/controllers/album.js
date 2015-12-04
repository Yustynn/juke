app.controller('AlbumCtrl', function($scope, $http, $rootScope, AlbumFactory, PlayerFactory) {

  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;


  AlbumFactory.fetchAll()
  .then(function(album){
    console.log(album)
    PlayerFactory.setAlbum(album);
    $scope.album = album;
  })
  .catch(console.error.bind(console));

  // main toggle
  $scope.toggle = function(song) {
    console.log($scope.album);
    console.log(song);
    PlayerFactory.toggle(song)
  }

  // // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num%m)+m)%m; };

  // jump `val` spots in album (negative to go back)
  // function skip (val) {
  //   var idx = PlayerFactory.retrieveIdx($scope.album, val);
  //   PlayerFactory.play()
  //   // $rootScope.$broadcast('play', $scope.album.songs[idx]);
  // };
  // function next () { skip(1); };
  // function prev () { skip(-1); };

});

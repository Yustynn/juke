app.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory){

  audio.addEventListener('ended', function () {
    $scope.next();
  });
  audio.addEventListener('timeupdate', function () {
    $scope.progress = 100 * audio.currentTime / audio.duration;
    $scope.$digest();
  });

  // state variables
  $scope.currentSong;
  $scope.playing = false;

  // // main toggle
  // $scope.toggle = function (song) {
  //   if ($scope.playing) $rootScope.$broadcast('pause');
  //   else $rootScope.$broadcast('play', song);
  // }

  // main toggle
  $scope.toggle = function(song) {
    PlayerFactory.toggle(song)
  }
  // // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  $scope.next = function() {
    PlayerFactory.next();
  }

  $scope.prev = function() {
    PlayerFactory.next();
  }
  // // outgoing events (to Album)
  // $scope.next = function(){ $rootScope.$broadcast('next'); };
  // $scope.prev = function(){ $rootScope.$broadcast('prev'); };

});

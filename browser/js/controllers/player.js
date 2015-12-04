app.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory){

  // state variables
  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;
  // main toggle
  $scope.toggle = function(song) {
    PlayerFactory.toggle(song)
  }

  $scope.next = function() {
    //solve the album problem: how do we access albums in the player.js file
    PlayerFactory.next();
  }

  $scope.prev = function() {
    PlayerFactory.prev();
  }

  $scope.progress = function() {
    return PlayerFactory.getProgress();
  }

});

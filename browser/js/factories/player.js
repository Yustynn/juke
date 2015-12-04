app.factory('PlayerFactory', function($rootScope) {

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num%m)+m)%m; };

  // initialize audio player
  var audio = document.createElement('audio'),
    playing = false,
    currentSong = null,
    album = null,
    progress = null;

  var factoryExports = {
    setAlbum: function(newAlbum) {
      album = newAlbum;
    },
    toggle: function(song) {
      playing ? this.pause() : this.play(song);
    },
    skip: function(val) {
      if (!currentSong) return;
      var idx = album.songs.indexOf(currentSong);
      idx = mod( (idx + (val || 1)), album.songs.length );
      this.play(album.songs[idx]);
    },
    play: function(song) {
      this.pause();
      song === currentSong ? this.resume() : this.start(song);
    },
    start: function(song) {
      playing = true;
      // switch to and play new song
      currentSong = song;
      audio.src = song.audioUrl;
      audio.load();
      audio.play();
    },
    pause: function() {
      audio.pause();
      playing = false;
    },
    resume: function() {
      playing = true;
      audio.play();
    },
    isPlaying: function() {
      return playing;
    },
    getCurrentSong: function() {
      return currentSong;
    },
    next: function() {
      this.skip(1);
    },
    prev: function() {
      //how does next and previous access album. do we need an http request?
      this.skip(-1);
    },
    getProgress: function() {
      return progress;
    }
  }


  audio.addEventListener('ended', function () {
    factoryExports.next();
  });
  audio.addEventListener('timeupdate', function () {
    progress = 100 * audio.currentTime / audio.duration;
    $rootScope.$digest();
  });

  return factoryExports;
});

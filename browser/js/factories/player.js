app.factory('PlayerFactory', function() {
  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num%m)+m)%m; };

  // jump `val` spots in album (negative to go back)
  function


  // initialize audio player
  var audio = document.createElement('audio'),
    playing = false;
    currentSong = null;

  return {
    toggle: function(song) {
      playing ? this.pause() : this.play();
    },
    skip: function(album, val) {
      if (!currentSong) return;
      var idx = album.songs.indexOf(currentSong);
      idx = mod( (idx + (val || 1)),]album.songs.length );
      this.play(album.songs[idx]);
    },
    play: function(song) {
      this.pause();
      song === currentSong ? this.resume() : this.start(song);
    },
    start: function(song) {
      playing = true;
      // switch to and play new son
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
    next: function(album) {
      skip(album, 1);
    },
    previous: function(album) {
      //how does next and previous access album. do we need an http request?
      skip(album,-1);
    },
    getProgress: function() {

    }
  }
});

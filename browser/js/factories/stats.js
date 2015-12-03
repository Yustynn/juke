app.factory('StatsFactory', function($q) {
  return {
    totalTime: function(album) {
      var audio = document.createElement('audio');
      return $q(function(resolve, reject) {
        var sum = 0, n = 0;

        function resolveOrRecur() {
          if (n >= album.songs.length) resolve(sum);
          else audio.src = album.songs[n++].audioUrl;
        }
        audio.addEventListener('loadedmetadata', function() {
          sum += audio.duration;
          resolveOrRecur();
        });
        resolveOrRecur();
      });
    }
  };
});

PostFirst = (function() {
  var API_HOST = 'https://carealot.singly.com';

  function check(tab) {
    $('#checking .url').text(tab.title);
    fetchLinks(function(links) {
      var link = links[tab.url];
      if (link) {
        fillPosters(link);
        $('#checking, #already_posted').toggle();
      } else {
        $('#checking, #post').toggle();
      }
    });
  }

  function fetchLinks(done) {
    $.getJSON(api('/services/twitter/timeline'), {
      access_token: auth.getAccessToken(),
      limit: 300
    }, function(tweets) {
      var links = {};
      _.each(tweets, function(tweet) {
        var urls = tweet.data.entities.urls;
        _.each(urls, function(url) {
          url = url.expanded_url;
          console.log(tweet, url);
          if (url) {
            if (!links[url]) links[url] = [];
            links[url].push({
              name: tweet.data.user.name,
              time: tweet.data.created_at
            });
          }
        });
      });
      done(links);
    }).error(error);
  }

  var TIME_EX = /[^\s]+ ([^\s]+ [^\s]+) .*/;
  function fillPosters(posters) {
    var list = $('#already_posted .posters');
    _.each(posters, function(poster) {
      list.append($('<li>').append(
        $('<span>', {'class': 'name'})
          .text(poster.name),
        $('<span>', {'class': 'time'})
          .text(' on ' + poster.time.match(TIME_EX)[1])
      ));
    });
  }

  function api(path) {
    return API_HOST + path;
  }

  function error() {
    $('#checking, #error').toggle();
  }

  return {
    check : check
  };
})();

var auth = new OAuth2('singly', {
  client_id: 'postfirst',
  client_secret: '46486d124edb2bafa8f7f429a91cd',
  api_scope: 'twitter'
});

auth.authorize(function() {
  chrome.tabs.getSelected(null, function(tab) {
    PostFirst.check(tab);
  });
});

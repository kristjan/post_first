if (typeof PostFirst === 'undefined') PostFirst = {};

PostFirst.Options = (function() {
  function init() {
    var token = PostFirst.Util.accessToken();
    if (token) {
      $.getJSON(PostFirst.Util.api('/profiles'), {
        access_token: token
      }, function(profiles) {
        buildLogins(profiles);
      });
    } else {
      buildLogins({});
    }
  }

  function buildLogins(profiles) {
    var services = $('#services');
    _.each(PostFirst.SERVICES, function(service) {
      var li = $('<li>').text(service + ' ');
      if (profiles[service]) {
        li.append('&#10004;');
      } else {
        li.append(
          $('<a>', { href: '#' })
            .text("Connect")
            .click({service: service}, authorizeService)
        );
      }
      services.append(li);
    });
  }

  function authorizeService(evt) {
    evt.preventDefault();
    var token = PostFirst.Util.accessToken();
    if (token) {
      chrome.tabs.create({
        url: PostFirst.API_HOST + '/oauth/authorize?' + $.param({
               client_id: PostFirst.CLIENT_ID,
               redirect_uri: PostFirst.REDIRECT_URI,
               service: evt.data.service
        })
      });
    } else {
      var auth = new OAuth2('singly', {
        client_id: PostFirst.CLIENT_ID,
        client_secret: PostFirst.CLIENT_SECRET,
        api_scope: evt.data.service
      });
      auth.authorize(function() {
        location.reload();
      });
    }
  }

  return {
    init : init
  };
})();

$(PostFirst.Options.init);

var auth = new OAuth2('singly', {
  client_id: 'postfirst',
  client_secret: '46486d124edb2bafa8f7f429a91cd',
  api_scope: 'twitter'
});

auth.authorize(function() {
  $('#content').append(
    $('<p>').text(auth.getAccessToken())
  );
});

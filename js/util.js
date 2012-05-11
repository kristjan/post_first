if (typeof PostFirst === 'undefined') PostFirst = {};

PostFirst.EXTENSION_ID = 'cepnecmfgkbbjeiklllgikojljahmhmk';
PostFirst.API_HOST = 'https://api.singly.com';
PostFirst.SERVICES = [
  'facebook',
  'linkedin',
  'tumblr',
  'twitter'
];
PostFirst.CLIENT_ID = '78a8e12f4d819b10cf1b039565263a74';
PostFirst.CLIENT_SECRET = 'b9243d5314e6edc7dd3b6f207bcfaff0';
PostFirst.REDIRECT_URI = 'https://api.singly.com/robots.txt';

PostFirst.Util = {
  accessToken: function() {
    return localStorage.singly_accessToken;
  },
  api: function(path) {
    return PostFirst.API_HOST + path;
  }
};


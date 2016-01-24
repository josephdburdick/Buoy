let facebookAccessToken = () => {
  let
    appId = process.env.FB_appId,
    secret = process.env.FB_appSecret,
    token = HTTP.get('https://graph.facebook.com/v2.5/oauth/access_token?client_id='+appId+'&amp;client_secret='+ secret +'&amp;grant_type=client_credentials');
    return token;
};

Modules.server.facebookAccessToken = facebookAccessToken;

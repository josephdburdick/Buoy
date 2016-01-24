let facebookGraphAPI = (params) => {

  let
    prefix = "https://graph.facebook.com/v2.5",
    accessToken = params.token,
    query = params.query,
    affix = "&access_token=";
  console.log(prefix + query + affix + accessToken);
  return (prefix + query + affix + accessToken);
};


Modules.both.facebookGraphAPI = facebookGraphAPI;


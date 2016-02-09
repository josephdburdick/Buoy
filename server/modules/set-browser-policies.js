let setBrowserPolicies = () => {

  var trusted = [
    '*.apis.google.com',
    '*.googleapis.com',
    '*.gstatic.com',
    '*.google-analytics.com',
		'*.fbcdn.net',
		'*.facebook.com',
		'*.google.com'
  ];

  _.each(trusted, function (origin) {
    //origin = "https://" + origin;
    BrowserPolicy.content.allowOriginForAll(origin);
    BrowserPolicy.content.allowFrameOrigin(origin);
    BrowserPolicy.content.allowEval(origin);
  });

	BrowserPolicy.content.allowImageOrigin('http://lorempixel.com');
	BrowserPolicy.content.allowOriginForAll('graph.facebook.com');
  BrowserPolicy.content.allowImageOrigin('https://maps.gstatic.com');
  BrowserPolicy.content.allowImageOrigin('http://chart.apis.google.com');
  BrowserPolicy.content.allowFontOrigin('https://fonts.gstatic.com');
  BrowserPolicy.content.allowFontOrigin('https://fonts.googleapis.com');
  BrowserPolicy.content.allowInlineStyles('https://fonts.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('http://www.youtube.com');

};

Modules.server.setBrowserPolicies = setBrowserPolicies;

let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
	 _extendAccounts();
  _generateAccounts();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {};
var _extendAccounts = () => Modules.server.extendAccounts();
var _generateAccounts = () => Modules.server.generateAccounts();

Modules.server.startup = startup;

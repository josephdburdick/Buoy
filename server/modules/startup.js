let startup = () => {
	_extendAccounts();
  _setEnvironmentVariables();
  _serviceConfiguration();
  _setBrowserPolicies();
  _generateAccounts();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();
var _serviceConfiguration = () => Modules.server.serviceConfiguration();
var _setBrowserPolicies = () => {};
var _extendAccounts = () => Modules.server.extendAccounts();
var _generateAccounts = () => Modules.server.generateAccounts();

Modules.server.startup = startup;

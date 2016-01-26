let startup = () => {
	_extendAccounts();
  _setEnvironmentVariables();
  _serviceConfiguration();
  _setBrowserPolicies();
  _generateAccounts();
};

let _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();
let _serviceConfiguration = () => Modules.server.serviceConfiguration();
let _setBrowserPolicies = () => {};
let _extendAccounts = () => Modules.server.extendAccounts();
let _generateAccounts = () => Modules.server.generateAccounts();

Modules.server.startup = startup;

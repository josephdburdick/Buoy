let startup = () => {
	_facebookGraphAPIString();
};

let _facebookGraphAPIString = () => Modules.both.facebookGraphAPIString;

Modules.both.startup = startup;

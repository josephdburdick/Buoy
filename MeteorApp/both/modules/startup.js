let startup = () => {
	_text();
	_facebook();
};

let _facebook = () => Modules.both.facebook;
let _text = () => Modules.both.text;

Modules.both.startup = startup;

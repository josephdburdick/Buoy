let text = {

	truncateWords: (str, options) => {
		let
			truncatedString,
			settings = {
				hasEllipsis: false,
				max: 5
			};
		settings = Object.assign(settings, options);

		if (str.split(" ").length > settings.max){
			truncatedString = str.split(" ").splice(0, settings.max).join(" ");
			truncatedString += settings.hasEllipsis ? "…" : "";
		}

		return truncatedString;
	},
	truncateString: (str, options) => {
		let
			truncatedString,
			settings = {
				hasEllipsis: false,
				max: 5
			};
		settings = Object.assign(settings, options);
		if (str.length > settings.max){
			truncatedString = str.splice(0, settings.max);
			truncatedString += settings.hasEllipsis ? "…" : "";
		}

		return truncatedString;
	}
}

Modules.both.text = text;

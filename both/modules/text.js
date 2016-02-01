let text = {

	truncateWords: (str, options) => {
		let
			truncatedString,
			settings = {
				hasEllipsis: false,
				stringLength: 5
			};
		settings = Object.assign(settings, options);

		truncatedString = str.split(" ").splice(0, settings.stringLength).join(" ");
		truncatedString += settings.hasEllipsis ? "…" : "";

		return truncatedString;
	},
	truncateString: (str, options) => {
		let
			truncatedString,
			settings = {
				hasEllipsis: false,
				stringLength: 5
			};
		settings = Object.assign(settings, options);

		truncatedString = str.splice(0, settings.stringLength);
		truncatedString += settings.hasEllipsis ? "…" : "";

		return truncatedString;
	}
}

Modules.both.text = text;

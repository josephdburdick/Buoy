Template.secondaryNav.onRendered(() => {
	let
		self = Template.instance(),
		$primaryNav = $('#primary-nav'),
		$secondaryNav = $('#secondary-nav'),
		secondaryNavLimit = $secondaryNav.offset().top, //- $primaryNav.outerHeight(),
		$navClone;

	$(window).on('scroll', () => {
		let
			st = $(this).scrollTop(),
			decoyID = 'secondary-nav_decoy',
			secondaryNavDecoyHTML = `<div id="${decoyID}" style="height: ${$secondaryNav.outerHeight()}px;"></div>`,
			$decoyEl;


		if (st <= secondaryNavLimit){
			$primaryNav.removeClass('beyondViewport-top');
			$secondaryNav.removeClass('navbar-fixed-top');
			if ($(`#${decoyID}`).length){
				$(`#${decoyID}`).remove();
			}
		} else {
			$secondaryNav.addClass('navbar-fixed-top');
			$primaryNav.addClass('beyondViewport-top');
			if (!$(`#${decoyID}`).length){
				$decoyEl = $(`#${decoyID}`);
				$secondaryNav.after(secondaryNavDecoyHTML);
			}
		}
	});
});

Template.secondaryNav.helpers({
	'activeTemplateName': () => {
		return Template.instance().data.activeTemplateName
	}
})

var PizzaThemeGlobalVariables = {};
$(document).ready(function() {
	$('.open-menu').click(function(event) {
		event.preventDefault();
		$('.main-sidebar').addClass('visible');
	});
	$('.main-sidebar__close').click(function(event) {
		event.preventDefault();
		$('.main-sidebar').removeClass('visible');
	});

	PizzaThemeGlobalVariables.changeSelectWidthOnChange =  function(el)  {
		var container = $(el).parents('.custom-select__wrapper');
		var text = $(container).find('.custom-select option:selected').text();
		$(container).find(".custom-select--compute-value").html(text);
		var width = $(container).find(".custom-select--compute").width();
		$(container).find("select.custom-select").width(width);
	};
	
	$('.custom-select').change(function(event) {
		PizzaThemeGlobalVariables.changeSelectWidthOnChange($(this));
	});
	$('.district-change__select').on('change', function() {
		var selectedDistrict = $(this).val();
		if(selectedDistrict == 'all') {
			$('.contacts__sidebar-list-item').removeClass('unvisible');
		}else {
			$('.contacts__sidebar-list-item').removeClass('unvisible');
			$('.contacts__sidebar-list-item').not(' [data-district=' + selectedDistrict +'] ').addClass('unvisible');
		}
	});

	var headingHeight = $('.site-header__top').height();
	$(window).scroll(function(event) {
		if ( $(document).scrollTop() > headingHeight ) {
 			$('.site-header').addClass('fixed');
		} else {
			$('.site-header').removeClass('fixed');
		}
	});
	$('.catalog__slider').slick({
		arrows: false,
		dots: true,
	});

	$('.catalog__sort-by').click(function(event) {
		event.preventDefault();
		$(this).toggleClass('active');
	});

	$('.item__img-zoom').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom',
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300
		}
	});
	PizzaThemeGlobalVariables.updateSpinner = function (obj) {
		var contentObj = $(obj).parents('.item__count-wrapper').find('.qty');
		var value = parseInt(contentObj.val());
		if($(obj).hasClass('item__count_plus')) {
			value++;
		} else {
			if(!(value <= 1)) {
				value--;
			}
		}
		contentObj.val(value);
	}
	$('.need-validate').blur(function(event) {
		var val = $(this).val();
		if (val <= 0 || val == '' ) {
			val = 1;
		} else {
			val = Math.ceil(val);
		}
		$(this).val(val);
	});

});


$(window).load(function() {
	function setSelectWidth() {
		$('.custom-select__wrapper').each(function(index, el) {
			$(this).find(".custom-select--compute-value").html($(this).find('.custom-select option:selected').text());
			$(this).find("select.custom-select").width($(this).find(".custom-select--compute").width());
		});
	}
	setSelectWidth()
});
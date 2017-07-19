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
	function setSelectWidth() {
		$('.custom-select__wrapper').each(function(index, el) {
			$(this).find(".custom-select--compute-value").html($(this).find('.custom-select option:selected').text());
			$(this).find("select.custom-select").width($(this).find(".custom-select--compute").width());
		});
	}
	PizzaThemeGlobalVariables.changeSelectWidthOnChange =  function(el)  {
		var container = $(el).parents('.custom-select__wrapper');
		var text = $(container).find('.custom-select option:selected').text();
		$(container).find(".custom-select--compute-value").html(text);
		var width = $(container).find(".custom-select--compute").width();
		$(container).find("select.custom-select").width(width);
	};
	setSelectWidth()
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


});
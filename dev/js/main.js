var PizzaThemeGlobalVariables = {};
function setSelectWidth() {
	$('.custom-select__wrapper').each(function(index, el) {
		$(this).find(".custom-select--compute-value").html($(this).find('.custom-select option:selected').text());
		$(this).find("select.custom-select").width($(this).find(".custom-select--compute").width());
	});
}
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
	
	$('#app').on('change', '.custom-select', function(event) {
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

	$('.datepicker').datepicker({
		format: 'dd.mm.yyyy',
		language: 'ru',
		autoclose: true,
	});

	$('.catalog__slider').slick({
		arrows: false,
		dots: true,
	});

	$('.catalog__sort-by').click(function(event) {
		event.preventDefault();
		$(this).toggleClass('active');
	});

	$('.zoom-img').magnificPopup({
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

	$('.open-popup').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
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

	$('.item__add-to-cart').click(function(event) {
		event.preventDefault();
		showCartOk($(this));
	});

	function showCartOk(target) {
		var container = target.parents('.item');
		var text = $('<div class="cart-ok"><p>Товар добавлен в корзину</p></div>').hide();
		$(container).append(text);
		$(text).show('normal');
		setTimeout(function() {
			$(container).find('.cart-ok').hide('normal');
			setTimeout(function() {
				$(container).find('.cart-ok').remove();
			}, 500);
		}, 1500);
	}
	Inputmask({"mask": "+7 (999) 999-99-99"}).mask(document.querySelectorAll("input[type=tel]"));
});
$(window).load(function() {
	setSelectWidth();
});


Parsley.addValidator('validatephone', {
	validateString: function(value, requirement) {
		return value.indexOf('_') !== -1 ? false : true;
	}
});


//Vue.JS


var vm = new Vue({
	el: '#app',
	data: {
		showRegisterLink: true,
		showChilds: true,
		childsArr: [
			{
				day: '',
				month: '',
				year: '',
			}
		],
		restaurants: {},
		userInfo: {
			loggedIn: true,
			userName: 'testname',
			userPhoneNumber: '12345678988',
			pizzents: '110',
			email: 'test@test.com',
			savedAddresses: [
				{
					city: 'Нижний Новгород',
					street: 'Ванеева',
					house: '25/88',
					building: '',
					apartment: '200',
				},
				{
					city: 'Бор',
					street: 'Белинского',
					house: '83',
					building: '2',
					apartment: '',
				}
			],
			newAddress: {
				city: '',
				street: '',
				house: '',
				building: '',
				apartment: '',
			},
			editedInfo: {
				userName: 'testname',
				userPhoneNumber: '12345678988',
				email: 'test@test.com',
			},
			editedPassword: {
				oldPassword: '',
				newPassword: '',
				repeatNewPassword: '',
			}
		},
		cartPage: {
			pickup: false,
			currentCity: '',
			currentDistrict: '',
			currentRestaurant: '',
			currentSavedAddress: '',
		},
		cabinet: {
			editInfo: false,
			editAddress: false,
			editPass: false,
			isLoading: false,
		},
	},
	methods: {
		setDefaultDistrict: function() {
			this.cartPage.currentDistrict = this.cartPage.currentCity.districts[0];
			this.setDefaultRestaurant();
		},
		setDefaultRestaurant: function() {
			this.cartPage.currentRestaurant = this.cartPage.currentDistrict.restaurants[0];
		},
		saveAddress: function() {
			if(this.userInfo.savedAddresses.length < 4) {
				var newAddress = this.userInfo.newAddress;
				if(newAddress.street && newAddress.house) {
					this.cabinet.isLoading = true;
					var _self = this;
					setTimeout(function() {
						alert('done');
						_self.userInfo.savedAddresses.push({
							city: _self.userInfo.newAddress.city,
							street: _self.userInfo.newAddress.street,
							house: _self.userInfo.newAddress.house,
							building: _self.userInfo.newAddress.building,
							apartment: _self.userInfo.newAddress.apartment,
						});
						newAddress.street = '';
						newAddress.house = '';
						newAddress.building = '';
						newAddress.apartment = '';
						_self.cabinet.isLoading = false;
					}, 3000);
					
				} else {
					alert('Заполните улицу и дом')
				}
			} else {
				alert('Извините, можно сохранить максимум 4 адреса.')
			}
		},
		removeAddress: function(index) {
			this.cabinet.isLoading = true;
			var _self = this;
			if(confirm('Удалить?')) {
				setTimeout(function() {
					_self.userInfo.savedAddresses.splice(index, 1);
					_self.cabinet.isLoading = false;
				}, 2000);
			}
		},
		setDefaultInfo: function() {
			this.cabinet.editInfo = !this.cabinet.editInfo;
			this.userInfo.editedInfo.userName = this.userInfo.userName;
			this.userInfo.editedInfo.userPhoneNumber = this.userInfo.userPhoneNumber;
			this.userInfo.editedInfo.email = this.userInfo.email;
		},
		saveNewInfo: function(e) {
			if(this.userInfo.userName !== this.userInfo.editedInfo.userName ||
			this.userInfo.userPhoneNumber !== this.userInfo.editedInfo.userPhoneNumber || 
			this.userInfo.email !== this.userInfo.editedInfo.email) {
				var _self = this;
				if($(e.target).parsley().validate()) {
					this.cabinet.isLoading = true;
					setTimeout(function() {
							alert('done');
						_self.cabinet.isLoading = false;
					}, 3000);
				}
			}
		},
		saveNewPassword: function(e) {
			var _self = this;
			if($(e.target).parsley().validate()) {
				this.cabinet.isLoading = true;
				setTimeout(function() {
					_self.userInfo.editedPassword.newPassword = '';
					_self.userInfo.editedPassword.repeatNewPassword = '';
					_self.userInfo.editedPassword.oldPassword = '';
					alert('done');
					_self.cabinet.isLoading = false;
				}, 3000);
			}
		},
		register: function(e) {
			var _self = this;
			if($(e.target).parsley().validate()) {
				this.cabinet.isLoading = true;
				setTimeout(function() {
					
					alert('done');
					_self.cabinet.isLoading = false;
				}, 3000);
			}
		},
		login: function(e) {
			var _self = this;
			if($(e.target).parsley().validate()) {
				this.cabinet.isLoading = true;
				setTimeout(function() {
					
					alert('done');
					_self.cabinet.isLoading = false;
				}, 3000);
			}
		},
		comicsPopup: function(e) {
			var _self = this;
			if($(e.target).parsley().validate()) {
				this.cabinet.isLoading = true;
				setTimeout(function() {
					
					alert('done');
					_self.cabinet.isLoading = false;
				}, 3000);
			}
		},
		masterClassPopup: function(e) {
			var _self = this;
			if($(e.target).parsley().validate()) {
				this.cabinet.isLoading = true;
				setTimeout(function() {
					
					alert('done');
					_self.cabinet.isLoading = false;
				}, 3000);
			}
		},
		birthdayPopup: function(e) {
			var _self = this;
			if($(e.target).parsley().validate()) {
				this.cabinet.isLoading = true;
				setTimeout(function() {
					
					alert('done');
					_self.cabinet.isLoading = false;
				}, 3000);
			}
		},
		addChild: function() {
			this.childsArr.push({
				day: '',
				month: '',
				year: '',
			});
		},
		removeChild: function(i) {
			this.childsArr.splice(i, 1);
		},
		simpleFormSend: function(e) {
			if($(e.target).parsley().validate()) {
				alert('ok')
			}
		},
		cartFormSubmit: function(e) {
			if($(e.target).parsley().validate()) {
				alert('ok')
			}
		}
	},
	computed: {
		
	},
	watch: {
		'cartPage.pickup': function() {
			setTimeout(function() {
				setSelectWidth();
			}, 10);
		}
	},
	directives: {
		'input-mask': {
			bind: function(el, obj, vModel) {
				Inputmask().mask(el);
			}
		}
	}
})

Vue.prototype.$first = function (item, list) {
	return item === list[0]
}

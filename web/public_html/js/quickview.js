var QuickView = {

	DATA_PRODUCT: 'data-product',

	/**
	 * Default options
	 * @enum {string}
	 */
	options: {
		buttonText: 'Quick View',
		buttonColor: '#f7f7f7',
		gradientColor: '#dcdbdb',
		textColor: '#000000'
	},

	/**
	 * Set the options for the QuickView
	 *
	 * @param {Object.<string, string>} opt
	 */
	setOptions: function(opt) {
		for (var key in opt) {
			QuickView.options[key] = opt[key];
		}
	},

	/**
	 * Initialize the container
	 *
	 * @param {string|Element|jQuery} container
	 */
	init: function(container) {

		container = $(container);
		var pid = container.attr(QuickView.DATA_PRODUCT);
		var btn = QuickView.createButton(pid);
		var img = container.find('img:first');

		/*
		 * Inject button.
		 * We need to attach to body since different templates
		 * has different layout and we can't position the buttons
		 * consistently.
		 */
		btn.hide().appendTo(container).click(function(e) {

			e.preventDefault();
			e.stopPropagation();
			// action!
			QuickView.clickAction($(this));
			return false;

		});

		// show button
		container.mouseenter(function(e) {
			btn.show(0, function() {
				QuickView.center(img, $(this));
			});
		});

		// hide button
		container.mouseleave(function(e) {
			btn.hide();
		});

	},

	/**
	 * Actions to invoke when the quick view button is clicked
	 *
	 * @param {jQuery} btn
	 */
	clickAction: function(btn) {

		var pid = btn.attr(QuickView.DATA_PRODUCT);

		var endpoint = config.ShopPath + '/remote.php?w=getproductquickview';
		endpoint = endpoint.replace(/^http[s]{0,1}:\/\/[^\/]*\/?/, '/');

		$.get(endpoint, { pid: pid }, function(resp) {
			if (resp.success && resp.content) {
				// this magic line will make the share buttons work all the time
				window.addthis = null;
				QuickView.showQuickView(resp.content);
			}
		});

	},


	clearText: function() {
		$('input[type=text]').not('input[readonly=readonly]').each(function() {
			var default_value = this.value;
			$(this).focus(function() {
				if(this.value == default_value) {
					this.value = '';
				}
			});
			$(this).blur(function() {
				if(this.value == '') {
					this.value = default_value;
				}
			});
		});

		$('textarea').not('textarea[readonly=readonly]').each(function() {
			var default_value = this.value;
			$(this).focus(function() {
				if(this.value == default_value) {
					this.value = '';
				}
			});
			$(this).blur(function() {
				if(this.value == '') {
					this.value = default_value;
				}
			});
		});

	},

	/**
	 * Show the quickview modal popup
	 *
	 * @param {Object} contentData
	 */
	showQuickView: function(contentData) {

        // The data returned from ajax is html mixed with inline javascript,
        // which are executed and them stripped from DOM after they are inserted.
        // However, some of those javascript may be wrapped and needs to be executed
        // after domReady, but due to the nature of QuickView ajax call, they will
        // executed straightaway before the html is appneded to DOM and available
        // for normal jQuery operation.
        //
        // Therefore we need to
        // 1. remove those inline scripts from the response data before inserting into modal
        // 2. insert all html fragement to the DOM
        // 3. execute those inline scripts afterward
        var plainHtml = '';

        // insert html content
        $(contentData).not('script').each(function() {
            plainHtml += $('<div></div>').append(this).html();
        });

		var options = {
			//top: '1%', // remove this after screenshot
			data: plainHtml,
			onOpen: function() {

				$('#ModalContainer').addClass('QuickViewModal');
				$('#ModalContainer').show();
				QuickView.displayRating();
				QuickView.resizeImage();

			}
		};

		$.iModal.close();
		$.iModal(options);

        $(contentData).filter('script').each(function() {
            $.globalEval(this.text || this.textContent || this.innerHTML || '');
        });

		// BIG-9754 clear text field default value when entering a new value
		this.clearText();
	},

	/**
	 * Properly construct the ratings with the correct number of stars
	 */
	displayRating: function() {

		var container = $('#QuickViewTopNavRating');
		var rating = parseInt(container.attr('data-rating'));
		var star = container.find('img.starRating:first').detach();
		var starGrey = container.find('img.starRatingGrey:first').detach();

		// clone up as much as possible
		for (var i = 0; i < 5; i++) {
			container.append(i < rating ? star.clone() : starGrey.clone());
		}
		star.remove();
		starGrey.remove();

	},

	/**
	 * Resize the image to fit the container
	 */
	resizeImage: function() {

		var container = $('#QuickViewImage');
		var img = container.find('img:first');

		// scale this baby up when loaded
		img.load(function() {

			var max = {
				width: container.innerWidth(),
				height: container. innerHeight()
			};
			var dim = {
				width: img.width(),
				height: img.height()
			};

			var containerRatio = max.width / max.height;
			var imgRatio = dim.width / dim.height;
			var scale = (imgRatio > containerRatio ? (max.width/dim.width) : (max.height/dim.height));

			img.css({
				width: (dim.width * scale),
				height: (dim.height * scale)
			});

		});

	},

	/**
	 * Attach the form validator for checkout
	 */
	attachFormValidator: function() {

		$('#productDetailsAddToCartForm').validate({
			onsubmit: false,
			ignoreTitle: true,
			showErrors: function (errorMap, errorList) {
				// nothing
			},
			invalidHandler: function (form, validator) {
				if (!validator.size()) {
					return;
				}

				alert(validator.errorList[0].message);
			}
		});

	},


	/**
	 * Centers an element in respect to the given container
	 *
	 * @param {jQuery} container
	 * @param {jQuery} el
	 */
	center: function(container, el) {
	    var top = container.position().top + (container.outerHeight() - el.outerHeight()) / 2;
	    var left = container.position().left + (container.outerWidth() - el.outerWidth()) / 2;
	    el.css({margin:0, top: (top > 0 ? top : 0)+'px', left: (left > 0 ? left : 0)+'px'});
	},

	/**
	 * Create a button with the given pid
	 *
	 * @param {number} pid
	 */
	createButton: function(pid) {

		var opt = QuickView.options;
		var style = 'background: '+opt.buttonColor+';'
			+ 'filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr=\''+opt.buttonColor+'\', endColorstr=\''+opt.gradientColor+'\');'
			+ 'background: -webkit-gradient(linear, left top, left bottom, from('+opt.buttonColor+'), to('+opt.gradientColor+'));'
			+ 'background: -moz-linear-gradient(top, '+opt.buttonColor+', '+opt.gradientColor+');'
			+ 'color: '+opt.textColor+';'
		var btn = $('<div></div>');
		btn.text(opt.buttonText);
		btn.addClass('QuickViewBtn');
		btn.attr('style', style);
		btn.attr(QuickView.DATA_PRODUCT, pid);

		return btn;

	}

};

/**
 * Quickview plugin
 *
 * @param {Object.<string, *>} options
 * @return {jQuery}
 */
jQuery.fn.quickview = function(options) {

	QuickView.setOptions(options);
	return this.each(function() {
		QuickView.init($(this));
	});

};

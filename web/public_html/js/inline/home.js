(function () {
    // this happens before external dependencies (and dom ready) to reduce page flicker
    var node, i;
    for (i = window.document.childNodes.length; i--; ) {
        node = window.document.childNodes[i];
        if (node.nodeName == 'HTML') {
            node.className += ' javascript';
        }
    }
})();


(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function ()
    {
        (i[r].q = i[r].q || []).push(arguments)
    }
    , i[r].l = 1 * new Date();
    a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '../www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-10308612-24', 'bigcommerce.com');
ga('send', 'pageview');


config.ShopPath = 'index.html';
config.AppPath = ''; // BIG-8939: Deprecated, do not use.
config.FastCart = 1;
config.ShowCookieWarning = !!0;
var ThumbImageWidth = 178;
var ThumbImageHeight = 178;



(function () {
    window.bcanalytics || (window.bcanalytics = []), window.bcanalytics.methods = ["debug", "identify", "track",
        "trackLink", "trackForm", "trackClick", "trackSubmit", "page", "pageview", "ab", "alias", "ready", "group",
        "on", "once", "off", "initialize"], window.bcanalytics.factory = function (a) {
        return function ()
        {
            var b = Array.prototype.slice.call(arguments);
            return b.unshift(a), window.bcanalytics.push(b),
                    window.bcanalytics
        }
    };
    for (var i = 0; i < window.bcanalytics.methods.length; i++)
    {
        var method = window.bcanalytics.methods[i];
        window.bcanalytics[method] = window.bcanalytics.factory(method)
    }
    window.bcanalytics.load = function () {
        var a = document.createElement("script");
        a.type = "text/javascript",
                a.async = !0, a.src = "../app/assets/js/vendor/bigcommerce/analytics.min.js";
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b)
    }, window.bcanalytics.SNIPPET_VERSION = "2.0.8", window.bcanalytics.load();
    bcanalytics.initialize({"Fornax": {"host": "https:\/\/analytics.bigcommerce.com", "cdn": "http:\/\/cdn4.bigcommerce.com\/r-223e6742ad4b97aa8810a12173168a6fe0710cce\/app\/assets\/js\/vendor\/bigcommerce\/fornax.min.js", "defaultEventProperties": {"storeId": 422390, "experiments": {"templates.preparse_category_description": "on", "shipping.eldorado.ng-shipment.recharge-postage": "on", "shipping.eldorado.label_method": "on", "cp2.lightsaber": "on", "PMO-272.cp1_new_product_options": "on", "BIG-15850.enable_jirafe_as_cp2_dashboard": "control", "cart.limit_number_of_unique_items": "control", "cart.auto_remove_items_over_limit": "control", "BIG-15465.limit_flash_messages": "control", "BIG-15230.sunset_design_mode": "control", "bigpay.checkout_authorizenet.live": "on", "bigpay.checkout_authorizenet.live.employee.store": "control", "bigpay.checkout_authorizenet.test": "on", "bigpay.checkout_authorizenet.test.employee.store": "control", "bigpay.checkout_stripe.live": "on", "bigpay.checkout_stripe.live.employee.store": "control", "bigpay.checkout_stripe.test": "on", "bigpay.checkout_stripe.test.employee.store": "control", "BIG-16833.disable_webdav_designeditor_save_templates": "control", "sessions.flexible_storage": "on", "PMO-439.ng_payments.phase1": "control", "PMO-515.ng_payments.phase2": "control", "PROJECT-331.pos_manager": "control", "PROJECT-453.enterprise_apps": "control", "shopping.checkout.cart_to_paid": "legacy_ui", "onboarding.initial_user_flow.autoprovision": "on", "faceted_search.enabled": "off", "faceted_search.displayed": "off", "themes.previewer": "enabled"}}, "defaultContext": {"source": "Bigcommerce Storefront"}, "anonymousId": "953b4261-ea0c-4d55-a4b4-f193dc62b168"}});
})();


function beacon_deferred(beacon_api) {
    beacon_api.set_cookie_domain(".outdoor-adventures-demo.mybigcommerce.com");
    beacon_api.pageview('', 1391958, "other", {"customer": {"id": "anonymous"}});
}


(function () {
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.defer = g.async = true;
    g.src = '../js/jirafe/beacon_api.js';
    s.parentNode.insertBefore(g, s);
})();

ShowImageZoomer = false;
$(document).ready(function () {
    $(".QuickView").quickview({
        buttonText: "Quick View",
        buttonColor: "#f7f7f7",
        gradientColor: "#dcdbdb",
        textColor: "#000000"
    });
});

var _boost = _boost || [];
(function () {
    var u = (("https:" == document.location.protocol) ? "https://tracker.boostable.com/" : "http://tracker.boostable.com/");
    _boost.push(['setSiteId', 'BT-20182879-9']);
    _boost.push(['setTrackerUrl', u + 'ping']);

    _boost.push(['trackPageView']);
    _boost.push(['enableLinkTracking']);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.defer = true;
    g.async = true;
    g.src = u + 'boost.bigcommerce.js';
    s.parentNode.insertBefore(g, s);
})();

$('#subscribe_form').submit(function () {
    if ($('#nl_first_name').val() == '') {
        alert('You forgot to type in your first name.');
        $('#nl_first_name').focus();
        return false;
    }

    if ($('#nl_email').val() == '') {
        alert('You forgot to type in your email address.');
        $('#nl_email').focus();
        return false;
    }

    if ($('#nl_email').val().indexOf('@') == -1 || $('#nl_email').val().indexOf('.') == -1) {
        alert('Please enter a valid email address, such as john@example.com.');
        $('#nl_email').focus();
        $('#nl_email').select();
        return false;
    }

    // Set the action of the form to stop spammers
    $('#subscribe_form').append("<input type=\"hidden\" name=\"check\" value=\"1\" \/>");
    return true;

});


$(function () {
    if (typeof $.fn.superfish == "function") {
        $("ul.sf-menu").superfish({
            delay: 100,
            dropShadows: false,
            speed: "fast"
        })
                .find("ul")
                .bgIframe();
    }
})


$(document).ready(function () {
    // attach fast cart event to all 'add to cart' link
    $(".ProductActionAdd a[href*='cart.php?action=add']").click(function (event) {
        fastCartAction($(this).attr('href'));
        return false;
    });
});


function _showFastCart(modalOptions) {
    modalOptions = $.extend({
        width: 820,
        closeTxt: true,
        onShow: function () {
            $("#fastCartSuggestive a[href*='cart.php?action=add']").unbind('click');

            var itemTxt = $('#fastCartNumItemsTxt').html().replace('items', '');
            var itemTotal = $('.fastCartSummaryBox .ProductPrice').html();


            if (itemTxt) {
                // update the view cart item count on top menu
                $('.CartLink span.item').html(itemTxt);
                $('.CartLink span.total').html(itemTotal);
            }
            setProductListHeights(null, '.fastCartContent');
            $('.fastCartContent .ProductList:not(.List) li').width(ThumbImageWidth);
            $('body').addClass('customfastCart');
        },
        onClose: function () {
            $('body').removeClass('customfastCart');
            if (window.location.href.match(config.ShopPath + '/cart.php')) {
                // reload if we are on the cart page
                $('#ModalContainer').remove();
                window.location = window.location.href
            } else {
                $('#ModalContainer').remove();
            }
        }
    }, modalOptions);

    $.iModal.close();
    $.iModal(modalOptions);
}


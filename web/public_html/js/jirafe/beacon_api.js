var beacon_api, beacon_api_proxy;

function beacon_trim(h) {
    return h.trim ? h.trim() : h.replace(/^\s+|\s+$/g, "")
}

function beacon_parseAttribution(h) {
    for (var f = {}, m = {}, m = document.location.search.substring(1).split("&"), n = 0; n < m.length; n++) {
        var q, l;
        l = decodeURI(beacon_trim(m[n])); - 1 == l.indexOf("=") ? f[l] = !0 : (q = l.split("="), l = beacon_trim(q[0]), q = beacon_trim(q[1]), f[l] = f[l] || [], f[l].push(q))
    }
    m = [];
    for (n = 0; n < h.length; n++) l = h[n], f[l] && m.push(f[l].join());
    return m
}
(function() {
    function h(a, b, c, d) {
        c = c || "/";
        b && (b = encodeURIComponent(b));
        a = a + "=" + b + ";";
        d && (b = new Date, d = b.getTime() + 1E3 * d, b.setTime(d), a += "expires=" + b.toGMTString() + ";");
        a += "path=" + c + ";";
        s && (a += "domain=" + s + ";");
        document.cookie = a
    }

    function f(a) {
        var b = document.cookie,
            c = b.indexOf(" " + a + "="); - 1 == c && (c = b.indexOf(a + "=")); - 1 == c ? b = null : (c = b.indexOf("=", c) + 1, a = b.indexOf(";", c), -1 == a && (a = b.length), b = decodeURIComponent(b.substring(c, a)));
        return b
    }

    function m(a) {
        a = String(a);
        1 === a.length && (a = "0" + a);
        return a
    }

    function n(a) {
        a =
            a || [];
        return "[" + a.join(",") + "]"
    }

    function q(a) {
        return (a || "").replace("[", "").replace("]", "").split(",")
    }

    function l(a, b) {
        a = a || [];
        b = b || [];
        return a.join() == b.join()
    }

    function u() {
        return f("fakewww_referrer_spoof") || document.referrer || "*none*"
    }

    function v(a) {
        var b = typeof a;
        if ("number" === b) return !1;
        if ("string" === b) return 0 === a.length;
        if ("boolean" === b) return !1;
        if (null == a) return !0;
        if (a.length && 0 < a.length) {
            for (b = 0; b < a.length; b++)
                if (!v(a[b])) return !1;
            return !0
        }
        if (0 === a.length) return !0;
        for (var c in a)
            if (z.call(a,
                c)) return !1;
        return !0
    }

    function A(a) {
        function b(a) {
            var b = [];
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].split("=");
                b.push(d)
            }
            return b
        }

        function c(a) {
            var c = a.keyword || "(unknown Adwords keyword)",
                b = {
                    e: "Exact Match",
                    p: "Phrase Match",
                    b: "Broad Match"
                }[a.matchtype];
            return ["Adwords", b ? c + "(" + b + ")" : c, a.q || "(unknown search query)"]
        }
        var d = {
                utm_source: !0,
                utm_medium: !0,
                utm_campaign: !0
            },
            r = [
                ["Google", /^(http|https):\/\/(www.)?google.[a-z.]*(|\/)/, "q"],
                ["Bing", /^(http|https):\/\/[a-z.]*.bing.com(|\/)/, "q"],
                ["Yahoo", /^(http|https):\/\/(.+\.|)search.yahoo.com(|\/)/, "p"],
                ["MSN", /^(http|https):\/\/www.msn.com(|\/)/, "q"],
                ["Yandex", /^(http|https):\/\/yandex.[a-z.]*(|\/)/, "text"],
                ["Baidu", /^(http|https):\/\/www.baidu.com(|\/)/, "wd"],
                ["Baidu", /^(http|https):\/\/m.baidu.com(|\/)/, "word"],
                ["AOL", /^(http|https):\/\/(www|search).aol.[a-z.]*(|\/)/, "q"],
                ["Ask.com", /^(http|https):\/\/[a-z.]*.ask.com\/web/, "q"],
                ["Blekko", /^(http|https):\/\/blekko.com(|\/)/, "q"],
                ["MyWebSearch", /^(http|https):\/\/search.mywebsearch.com(|\/)/,
                    "searchfor"
                ],
                ["DuckDuckGo", /^(http|https):\/\/duckduckgo.com(|\/)/, "q"],
                ["Dogpile", /^(http|https):\/\/www.dogpile.com(|\/)/, "q"],
                ["Lycos", /^(http|https):\/\/www.lycos.com(|\/)/, "query"],
                ["WebCrawler", /^(http|https):\/\/www.webcrawler.com(|\/)/, "q"],
                ["Altavista", /^(http|https):\/\/www.altavista.com(|\/)/, "q"],
                ["Netscape", /^(http|https):\/\/search.netscape.com(|\/)/, "query"],
                ["Search.com", /^(http|https):\/\/www.search.com(|\/)/, "q"],
                ["Search-Results.com", /^(http|https):\/\/www[0-9]?.search-results.com(|\/)/,
                    "q"
                ],
                ["Mail.ru", /^(http|https):\/\/go.mail.ru\/search/, "q"],
                ["Comcast", /^(http|https):\/\/search.comcast.net(|\/)/, "q"]
            ],
            e = [
                ["Facebook", /^(http|https):\/\/(.+\.|)facebook.com[/]*/],
                ["Twitter", /^(http|https):\/\/(twitter\.com|t\.co)[/]*/],
                ["Pinterest", /^(http|https):\/\/(.+\.|)pinterest.com[/]*/],
                ["Tumblr", /^(http|https):\/\/(.+\.|)tumblr.com[/]*/],
                ["Reddit", /^(http|https):\/\/(.+\.|)reddit.com[/]*/],
                ["Youtube", /^(http|https):\/\/(.+\.|)youtube.com[/]*/],
                ["MySpace", /^(http|https):\/\/(.+\.|)myspace.com[/]*/],
                ["deviantART", /^(http|https):\/\/(.+\.|)deviantart.com[/]*/],
                ["LiveJournal", /^(http|https):\/\/(.+\.|)livejournal.com[/]*/],
                ["Tagged", /^(http|https):\/\/(.+\.|)tagged.com[/]*/],
                ["Ning", /^(http|https):\/\/(.+\.|)ning.com[/]*/],
                ["Google Plus", /^(http|https):\/\/plus\.(.+\.|)google\.com[/]*/],
                ["LinkedIn", /^(http|https):\/\/(.+\.|)linkedin.com[/]*/]
            ],
            f = !1,
            h = !1,
            g = a.page.current_url.split("?"),
            l = decodeURI(g[1]),
            m = {},
            n = a.page.referrer_url.split("?"),
            q = decodeURI(n[1]),
            n = n[0],
            k = {};
        if (g)
            for (var s = b(l), g = 0; g <
                s.length; g++) {
                var l = s[g][0],
                    t = s[g][1];
                m[l] = t;
                h = h || d[l];
                f = f || "gclid" == l
            }
        if (q)
            for (d = b(q), g = 0; g < d.length; g++) l = d[g][0], t = d[g][1], k[l] = t;
        return h ? ["Campaign (UTM)", m.utm_medium || "(utm_medium not provided)", m.utm_source || "(utm_source not provided)", m.utm_campaign || "(utm_campaign not provided)", m.utm_content || "(utm_content not provided)"] : f ? c(m) : a.page.referrer_url && "*none*" != a.page.referrer_url ? (a = function(a, c) {
            for (var b = 0; b < r.length; b++) {
                var d = r[b],
                    e = d[0],
                    f = d[2];
                if (a.match(d[1])) return (b = c[f]) && "" != b ||
                    (b = "(unknown keyword)"), ["Search", e, b]
            }
        }(n, k)) ? a : (a = function(a) {
            for (var b = 0; b < e.length; b++) {
                var c = e[b],
                    d = c[0];
                if (a.match(c[1])) return ["Social", d, a]
            }
        }(n)) ? a : function(a) {
            return ["Referrer", a.split("index.html")[2], a]
        }(n) : ["Direct"]
    }

    function t(a, b) {
        var c = [],
            d;
        for (d in a) {
            var f = a[d];
            if (f && !v(f)) {
                var e = b ? b + "[" + d + "]" : d;
                c.push("object" == typeof f ? t(f, e) : encodeURIComponent(e) + "=" + encodeURIComponent(f))
            }
        }
        return c.join("&")
    }

    function k(a) {
        var b = f("beacon_vid"),
            c = f("beacon_tatr"),
            d = f("beacon_ratr"),
            r = [];
        c && (c = q(c));
        d &&
        (d = q(d));
        for (var e = 0; e < a.length; e++) {
            var p = a[e],
                k = p.customer || !1;
            (r = p.attribution || [], r.length) && h("beacon_tatr", n(r));
            k.id && h("beacon_id", k.id);
            k.email && h("beacon_em", k.email);
            k.lastname && h("beacon_ln", k.lastname);
            k.firstname && h("beacon_fn", k.firstname);
            g.page_type ? h("beacon_typ", g.page_type) : p.page_type && h("beacon_typ", p.page_type)
        }
        e = new Date;
        e = {
            timestamp: e.getUTCFullYear() + "-" + m(e.getUTCMonth() + 1) + "-" + m(e.getUTCDate()) + "T" + m(e.getUTCHours()) + ":" + m(e.getUTCMinutes()) + ":" + m(e.getUTCSeconds()) + "." + String((e.getUTCMilliseconds() / 1E3).toFixed(3)).slice(2, 5) + "Z",
            event_name: a.event_name,
            org: g.org,
            site: g.site,
            data: a,
            page: {
                current_url: location.href,
                current_type: f("beacon_typ"),
                current_title: document.title,
                referrer_url: u(),
                referrer_type: f("beacon_reftyp")
            },
            visit: {
                visitor: f("beacon_vis"),
                landing_url: f("beacon_lnd"),
                referrer_url: f("beacon_ref"),
                user_agent: navigator.userAgent,
                tag_attribution: q(f("beacon_tatr")),
                rule_attribution: q(f("beacon_ratr"))
            },
            customer: {
                id: f("beacon_id"),
                email: f("beacon_em"),
                lastname: f("beacon_ln"),
                firstname: f("beacon_fn")
            }
        };
        p = A(e);
        p.length && (k = p[0], d && d.length ? "Direct" != k && "Referrer" != k && h("beacon_ratr", n(p)) : (e.visit.rule_attribution = p, h("beacon_ratr", n(p))));
        d = f("beacon_vid") ? r.length && !l(r, c) ? !0 : d && d.length && (p.length && "Direct" == p[0] || "Referrer" == p[0]) ? !1 : p.length && !l(p, d) ? !0 : !1 : !0;
        d && (b = Math.floor(Math.random() * w), d = u(), h("beacon_lnd", location.href), h("beacon_ref", d), e.visit.landing_url = f("beacon_lnd"), e.visit.referrer_url = d, d = {
            id: b,
            event_type: "visit"
        }, b = d.id, a.push(d));
        e.visit.id = b;
        h("beacon_vid", b, "index.html", 1800);
        a = {};
        e.site && (a.sid = e.site, a.ts = e.timestamp, e.page && (e.page.current_title && (a.ct = e.page.current_title), e.page.current_type && (a.pt = e.page.current_type), e.page.current_url && (a.cu = e.page.current_url), e.page.referrer_type && (a.rt = e.page.referrer_type), e.page.referrer_url && (a.ru = e.page.referrer_url)), e.visit && (e.visit.id && (a.vid = e.visit.id), e.visit.visitor && (a.vis = e.visit.visitor), e.visit.landing_url && (a.vlnd = e.visit.landing_url), e.visit.referrer_url && (a.vref = e.visit.referrer_url), e.visit.user_agent && (a.uag = e.visit.user_agent), e.visit.tag_attribution && (a.tatr = e.visit.tag_attribution), e.visit.rule_attribution && (a.ratr = e.visit.rule_attribution)), e.customer && (e.customer.id && (a.cid = e.customer.id), e.customer.email && (a.cem = e.customer.email), e.customer.lastname && (a.cln = e.customer.lastname), e.customer.firstname && (a.cfn = e.customer.firstname)));
        if (a)
            for (a = t(a), d = 0; d < e.data.length; d++) c = t(e.data[d], "ev"), c = "../bcanalytics.bigcommerce.com/v1/tracker/pixeld41d.gif?" + a + "&" + c, r = document.createElement("img"), r.src = c, r.width = "1", r.height = "1";
        return b
    }

    function x(a, b, c, d) {
        var g, e = f("beacon_cart_id");
        c = c || {};
        c.cart && c.cart.id && (g = c.cart.id, g != e && (c.event_type = "cart", d([c], {
            org: a,
            site: b
        }), h("beacon_cart_id", g)))
    }

    function y(a) {
        s = a
    }
    var g = {},
        w = Math.pow(2, 53),
        z = Object.prototype.hasOwnProperty,
        s = null;
    beacon_api = new function() {
        this.set_cookie_domain = y;
        this.get_cookie = f;
        this.funnel = function(a, b, c, d, f, e) {
            k([{
                event_type: "funnel",
                funnel_name: c,
                step_name: d,
                step_position: f,
                last_step: e || !1
            }], {
                org: a,
                site: b
            })
        };
        this.pageview = function(a, b, c, d) {
            d = d || {};
            d.page_type = c;
            d.event_type = "pageview";
            k([d], {
                org: a,
                site: b,
                page_type: c
            })
        };
        this.cart = {
            register: function(a, b, c) {
                x(a, b, c, k)
            },
            add_item: function(a, b, c) {
                c = c || {};
                c.event_type = "add_item_to_cart";
                k([c], {
                    org: a,
                    site: b
                })
            },
            remove_item: function(a, b, c) {
                c = c || {};
                c.event_type = "remove_item_from_cart";
                k([c], {
                    org: a,
                    site: b
                })
            },
            edit: function(a, b, c) {
                c = c || {};
                c.event_type = "edit_cart";
                k([c], {
                    org: a,
                    site: b
                })
            }
        };
        this.order = {
            success: function(a, b, c) {
                c = c || {};
                c.event_type = "order_success";
                k([c], {
                    org: a,
                    site: b
                })
            }
        }
    };
    beacon_api_proxy = new function() {
        var a = this;
        this._events = [];
        this.set_cookie_domain = y;
        this.get_cookie = f;
        this.funnel = function(b, c, d, f, e, h) {
            d = {
                event_type: "funnel",
                funnel_name: d,
                step_name: f,
                step_position: e,
                last_step: h || !1
            };
            g.org = b;
            g.site = c;
            a._events.push(d)
        };
        this.pageview = function(b, c, d, f) {
            f = f || {};
            f.event_type = "pageview";
            g.org = b;
            g.site = c;
            g.page_type = d;
            a._events.push(f)
        };
        this.cart = {
            register: function(a, c, d) {
                x(a, c, d, k)
            },
            add_item: function(b, c, d) {
                d = d || {};
                d.event_type = "add_item_to_cart";
                g.org = b;
                g.site = c;
                a._events.push(d)
            },
            remove_item: function(b, c, d) {
                d = d || {};
                d.event_type = "remove_item_from_cart";
                g.org = b;
                g.site = c;
                a._events.push(d)
            },
            edit: function(b, c, d) {
                d = d || {};
                d.event_type = "edit_cart";
                g.org = b;
                g.site = c;
                a._events.push(d)
            }
        };
        this.order = {
            success: function(b, c, d) {
                d = d || {};
                d.event_type = "order_success";
                g.org = b;
                g.site = c;
                a._events.push(d)
            }
        }
    };
    (function(a) {
        try {
            if (beacon_deferred) {
                beacon_deferred(beacon_api_proxy);
                var b = a(beacon_api_proxy._events);
                beacon_deferred_after && beacon_deferred_after(b)
            }
        } catch (c) {}
    })(function() {
        var a = f("beacon_vis");
        a || (a = Math.floor(Math.random() * w));
        h("beacon_vis", a, "index.html", 31536E3);
        var b = f("beacon_typ");
        h("beacon_reftyp", b || "*none*");
        h("beacon_typ", "");
        return {
            beacon_visit_id: k.apply(this, arguments),
            beacon_visitor_id: a
        }
    })
})();
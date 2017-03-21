var index = {
	init : function(){
		var _ts = this;
		
	},
};

var utils = {
    uncurryThis: function(b) {
        return function() {
            return b.call.apply(b, arguments)
        }
    },
    curryThis: function(b) {
        return function() {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(this);
            return b.apply(null, a)
        }
    },
    bindFn: function(e, f) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            return e.apply(f, d.concat(Array.prototype.slice.call(arguments)))
        }
    },
    extend: function(f, h) {
        function e() {}
        for (var g in h) {
            h.hasOwnProperty(g) && (f[g] = h[g])
        }
        e.prototype = h.prototype;
        f.prototype = new e;
        f.prototype.constructor = f;
        f.__super__ = h.prototype;
        return f
    },
    mixin: function(g) {
        for (var j = Array.prototype.slice.call(arguments, 1), f = 0; f < j.length; f++) {
            var i = j[f],
            h;
            for (h in i) {
                g[h] || (g[h] = i[h])
            }
        }
    },
    distinctArray: function(h) {
        for (var l = [], g = {},
        k = 0, j; k < h.length; k++) {
            j = h[k];
            var i = j + ":" + typeof j;
            g[i] || (l.push(j), g[i] = !0)
        }
        return l
    },
    browser: {
        version: function() {
            var b = navigator.userAgent;
            return {
                trident: /Trident/i.test(b),
                presto: /Presto/i.test(b),
                webKit: /AppleWebKit/i.test(b),
                gecko: /Gecko/i.test(b) && !/KHTML/i.test(b),
                mobile: /AppleWebKit.*Mobile.*/i.test(b),
                ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(b),
                android: /Android/i.test(b) || /Linux/i.test(b),
                windowsphone: /Windows Phone/i.test(b),
                iPhone: /iPhone/i.test(b),
                iPad: /iPad/i.test(b),
                MicroMessenger: /MicroMessenger/i.test(b),
                webApp: !/Safari/i.test(b),
                edge: /edge/i.test(b),
                weibo: /Weibo/i.test(b),
                uc: /UCBrowser/i.test(b),
                qq: /MQQBrowser/i.test(b),
                baidu: /Baidu/i.test(b)
            }
        } (),
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
        lteIE: function(b) {
            return $.browser.msie && parseInt($.browser.version) <= b
        }
    },
    cookie: {
        get: function(f) {
            var h = "" + document.cookie,
            e = h.indexOf(f + "=");
            if ( - 1 == e || "" == f) {
                return ""
            }
            var g = h.indexOf(";", e); - 1 == g && (g = h.length);
            return unescape(h.substring(e + f.length + 1, g))
        },
        set: function(f, h, e) {
            e = void 0 !== e ? e: 365;
            var g = new Date;
            g.setTime(g.getTime() + 86400000 * e);
            document.cookie = f + "=" + escape(h) + ";expires=" + g.toGMTString() + "; path=/; domain=.bilibili.com"
        },
        "delete": function(b) {
            this.set(b, "", -1)
        }
    },
    readFromLocal: function(b) {
        return this.localStorage._support ? localStorage.getItem(b) : this.cookie.get(b)
    },
    saveToLocal: function(e, f, d) {
        return this.localStorage._support ? localStorage.setItem(e, f) : this.cookie.set(e, f, d)
    },
    localStorage: {
        _support: window.localStorage && "object" == typeof window.localStorage ? !0 : !1,
        getItem: function(b) {
            return this._support ? window.localStorage.getItem(b) : null
        },
        setItem: function(b, d) {
            this._support && window.localStorage.setItem(b, d)
        },
        removeItem: function(b) {
            this.getItem(b) && window.localStorage.removeItem(b)
        }
    },
    unhtml: function(b, d) {
        return b ? b.replace(d || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g,
        function(e, f) {
            return f ? e: {
                "<": "&lt;",
                "&": "&amp;",
                '"': "&quot;",
                ">": "&gt;",
                "'": "&#39;"
            } [e]
        }) : ""
    },
    html: function(b) {
        return b ? b.replace(/&((g|l|quo)t|amp|#39|nbsp);/g,
        function(c) {
            return {
                "&lt;": "<",
                "&amp;": "&",
                "&quot;": '"',
                "&gt;": ">",
                "&#39;": "'",
                "&nbsp;": " "
            } [c]
        }) : ""
    },
    HashManage: {
        prependHash: "!",
        _change: function(w, u) {
            var v = location.hash,
            t = {},
            s = "",
            r = 0;
            v && (v = v.substring(1), this.prependHash && (v = v.replace(RegExp("^" + this.prependHash.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")), "")));
            for (var v = v.split("&"), q = 0; q < v.length; q++) {
                var o = v[q].split("=")[0],
                j = v[q].split("=")[1];
                o && (t[o] = decodeURIComponent(j))
            }
            if ("object" == typeof w) {
                for (var n in w) { (v = w[n]) ? t[n] = encodeURIComponent(v) : !1 === v && delete t[n]
                }
            } else {
                if (u) {
                    t[w] = encodeURIComponent(u)
                } else {
                    if (!1 === u) {
                        delete t[w]
                    } else {
                        return "undefined" == typeof w ? t: t[w] || null
                    }
                }
            }
            for (var i in t) {
                s = 0 != r ? s + "&": s + this.prependHash,
                s += i + "=" + t[i],
                r++
            }
            location.hash = s;
            return t
        },
        get: function(b) {
            return this._change(b, null)
        },
        set: function(b, d) {
            return this._change(b, d)
        },
        clear: function() {
            location.hash = ""
        }
    },
    getColor16: function(f) {
        function h(b) {
            b = parseInt(b).toString(16);
            return 1 == b.length ? "0" + b: b
        }
        function e(i) {
            for (var c = "#",
            j = 0; 3 > j; j++) {
                c += h(i[j])
            }
            return c
        }
        var g = "",
        g = [];
        null != f.match(/\((.*)\)/) ? (g = f.match(/\((.*)\)/)[1].split(","), g = e(g)) : null != f.match(/,+/g) ? (g = f.split(","), g = e(g)) : g = h(f);
        return g
    },
    serializeParam: function(f) {
        var h = [],
        e;
        for (e in f) {
            if ("function" != (typeof f[e]).toLowerCase() && "object" != (typeof f[e]).toLowerCase()) {
                h.push(encodeURIComponent(e) + "=" + encodeURIComponent(f[e]))
            } else {
                if ($.isArray(f[e])) {
                    for (var g = 0; g < f[e].length; g++) {
                        h.push(encodeURIComponent(e) + "[]=" + encodeURIComponent(f[e][g]))
                    }
                }
            }
        }
        return h.join("&")
    },
    query2json: function(f) {
        if ($.isPlainObject(f)) {
            return f
        }
        if (void 0 === f) {
            return {}
        }
        f = f.split("&");
        for (var h = {},
        e = 0; e < f.length; e++) {
            var g = f[e].split("=");
            h[g[0]] = g[1]
        }
        return h
    },
    hash2json: function() {
        return 1 < window.location.href.split("#").length ? this.query2json(window.location.href.split("#")[1].split("?")[0].replace(/#/, "")) : {}
    },
    query: {
        get: function(b) {
            var d = utils.query2json(this._getQuery());
            return b ? d[b] : d
        },
        set: function(g, j) {
            var f = utils.query2json(this._getQuery()),
            i = utils.hash2json();
            if ("object" == typeof g) {
                for (var h in g) {
                    this._set(f, h, g[h])
                }
            } else {
                this._set(f, g, j)
            }
            return utils.makeUrl("", f, i)
        },
        _set: function(e, f, d) {
            null === d ? delete e[f] : e[f] = d;
            return e
        },
        _getQuery: function() {
            return void 0 !== window.location.search ? window.location.search.substring(1) : window.location.href.split("?")[1] ? window.location.href.split("?")[1].split("#")[0] : ""
        }
    },
    makeUrl: function(e, f, d) {
        f = this.serializeParam(f);
        d = this.serializeParam(d);
        e = f ? (e || location.pathname) + "?" + f: e || location.pathname;
        d && (e = e + "#" + d);
        return e
    },
    formatNum: function(h, l) {
        if (void 0 === h || "string" == typeof h && isNaN(parseInt(h))) {
            return "--"
        }
        var g = {
            "\u4e07": 10000
        };
        l = "string" == typeof l ? l: "\u4e07";
        g = g[l] || g["\u4e07"];
        if (! ("string" == typeof h && 0 <= h.indexOf(l))) {
            if ("string" == typeof h && 0 <= h.indexOf(",")) {
                for (var k = h.split(","), j = "", i = 0; i < k.length; i++) {
                    j += k[i]
                }
                h = j
            }
            h = parseInt(h);
            h >= g && (h = (h / g).toFixed(1) + l);
            return h
        }
    },
    parseCardProps: function(g, j) {
        var f;
        f = g.stat ? {
            "data-gk": g.stat && g.stat.view,
            "data-sc": g.stat && g.stat.favorite,
            "data-pl": g.stat && g.stat.reply,
            "data-dm": g.stat && g.stat.danmaku,
            "data-up": g.owner && g.owner.name,
            "data-lm": g.tname || "",
            "data-tg": (new Date(1000 * g.pubdate)).format("yyyy-MM-dd hh:mm"),
            "data-txt": g.desc,
            "data-yb": g.stat && g.stat.coin
        }: {
            "data-gk": g.play,
            "data-sc": g.favorites,
            "data-pl": g.review,
            "data-dm": g.video_review,
            "data-up": g.author,
            "data-subtitle": g.subtitle,
            "data-lm": g.typename || "",
            "data-tg": g.created ? (new Date(1000 * g.created)).format("yyyy-MM-dd hh:mm") : g.create || g.created_at,
            "data-txt": g.description,
            "data-yb": g.coins
        };
        var i = "";
        if ("string" == j) {
            for (var h in f) {
                "" != i && (i += " "),
                i += h + '="' + f[h] + '"'
            }
            return i
        }
        return f
    },
    newParseCardProps: function(b, d) {
        return b.stat ? {
            "data-gk": b.stat && b.stat.view,
            "data-sc": b.stat && b.stat.favorite,
            "data-pl": b.stat && b.stat.reply,
            "data-dm": b.stat && b.stat.danmaku,
            "data-up": b.owner && b.owner.name,
            "data-lm": b.tname || "",
            "data-tg": (new Date(1000 * b.pubdate)).format("yyyy-MM-dd hh:mm"),
            "data-txt": b.desc,
            "data-yb": b.stat && b.stat.coin
        }: {
            "data-gk": b.play,
            "data-sc": b.favorites,
            "data-pl": b.review,
            "data-dm": b.video_review,
            "data-up": b.author,
            "data-subtitle": b.subtitle,
            "data-lm": b.typename || "",
            "data-tg": b.created ? (new Date(1000 * b.created)).format("yyyy-MM-dd hh:mm") : b.create || b.created_at,
            "data-txt": b.description,
            "data-yb": b.coins
        }
    },
    protocolRelative: function(b) {
        return /http:|https:/.test(b) ? b.replace(/http:|https:/, window.location.protocol) : $.browser.msie && 8 >= parseInt($.browser.version) ? window.location.protocol + b: b
    },
    formatDuration: function(g, j, f) {
        if ("number" !== typeof g) {
            return g
        }
        f = f || -1;
        var i = this.toFixed(g % 60, 2),
        h = j ? this.toFixed(Math.floor(g % 3600 / 60), 2) : this.toFixed(Math.floor(g / 60), f);
        g = j ? this.toFixed(Math.floor(g / 3600), f) : null;
        return null === g ? [h, i].join(":") : [g, h, i].join(":")
    },
    isObject: function(b) {
        return "object" === typeof b && null !== b
    },
    isNothing: function(b) {
        return null == b
    },
    isUndefined: function(b) {
        return "undefined" === typeof b
    },
    join: function() {
        return Array.prototype.join.call(arguments, "")
    },
    random: function(b, d) {
        this.isNothing(d) && (d = b, b = 0);
        return Math.floor(Math.random() * (d - b + 1)) + b
    },
    debounce: function(g, j, f) {
        function i() {
            clearTimeout(h);
            f && utils.isNothing(h) && g();
            h = setTimeout(g, j || 100)
        }
        var h;
        i.clearNext = function() {
            clearTimeout(h)
        };
        return i
    },
    throttle: function(i, o, h) {
        function n() {
            j = h.head ? 0 : (new Date).getTime();
            k = null;
            i()
        }
        function l() {
            var b, a = (new Date).getTime(); ! j && h.head && (j = a);
            b = o - (a - j);
            0 >= b || b > o ? (clearTimeout(k), k = null, j = a, i()) : k || h.tail || (k = setTimeout(n, b))
        }
        var k, j = 0;
        o = o || 200;
        h = h || {};
        l.clearNext = function() {
            clearTimeout(k);
            k = null;
            j = 0
        };
        return l
    },
    toFixed: function(b, d) {
        if ("number" !== typeof b && "string" !== typeof b) {
            return b
        }
        b = String(b);
        for (d = Number(d) || 2; b.length < d;) {
            b = "0" + b
        }
        return b.length > d ? b: b.slice( - d)
    },
    thumbnail: function(j, q, i) {
        var p, o, n, l;
        if ("string" !== typeof j || "undefined" === typeof q) {
            return utils.trimHttp(j)
        }
        var k = j.split("?");
        i = i || q;
        n = "/" + q + "_" + i;
        l = "_" + q + "x" + i;
        p = /^http.+i\d\.hdslb\.com\/group1\//;
        o = /(^http.+i\d\.hdslb\.com)(\/.+)/;
        q = /_\d+x\d+\./;
        i = /\/\d+_\d+\//;
        if (!/^http.+i[0-2]\.hdslb\.com\//.test(k[0]) || q.test(k[0]) || i.test(k[0])) {
            return utils.trimHttp(j)
        }
        if (/^http.+i\d\.hdslb\.com\/bfs\//.test(k[0]) || p.test(k[0])) {
            k[0] += l + k[0].slice(k[0].lastIndexOf(".")),
            j = k.join("?")
        } else {
            if (q = o.exec(k[0])) {
                k[0] = q[1] + n + q[2],
                j = k.join("?")
            }
        }
        return utils.trimHttp(LoadWebp.setSrc(j))
    },
    sortByIndex: function(g, j) {
        if (!$.isArray(g)) {
            return g
        }
        g.slice();
        var f, i = [],
        h = [];
        for (j = j || "pos_num"; g.length;) {
            f = g.shift(),
            0 != f[j] ? i[f[j] - 1] = f: h.push(f)
        }
        for (f = 0; f < i.length; f++) {
            utils.isUndefined(i[f]) && (i[f] = h.shift())
        }
        return i.concat(h)
    },
    isWebp: function() {
        try {
            return 0 == document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
        } catch(b) {
            return ! 1
        }
    } (),
    webp: function(j, q) {
        var i;
        i = j;
        var p = /\/\d+?_\d+?\/bfs/,
        o = i.replace(p, "/bfs");
        p.test(i) ? (/\/(\d+?)_(\d+?)\/bfs\/\w+?\/.+?(\.\w{3,4})/.exec(i), i = o + "_" + RegExp.$1 + "x" + RegExp.$2 + RegExp.$3) : i = !1;
        j = i ? i: j;
        o = "";
        i = j.match(/_(\d+)x(\d+)./);
        var o = -1 != j.indexOf("/bfs/") ? !0 : !1,
        n = -1 != j.indexOf(".gif") ? !0 : !1,
        l = -1 != j.indexOf(".webp") ? !0 : !1,
        p = q || {},
        p = {
            w: p.w,
            h: p.h,
            p: p.p,
            e: p.e,
            c: p.c,
            rc: p.rc,
            a: p.a,
            bl: p.bl,
            q: p.q
        };
        if (!this.isWebp || !o || n || l) {
            return this.thumbnail(j, p.w, p.h)
        }
        null === i ? o = j: (o = j.split("_")[0], void 0 === p.w && (p.w = i[1]), void 0 === p.h && (p.h = i[2]));
        i = "";
        for (var k in p) {
            void 0 !== p[k] && (i += p[k] + k + "_")
        }
        return o = o + "@" + i.substring(0, i.length - 1) + ".webp"
    },
    isAlpha: function(e, f) {
        var d;
        localStorage.getItem("machineDna") ? d = localStorage.getItem("machineDna") : (d = parseInt(10 * Math.random() + 1), localStorage.setItem("machineDna", d));
        return this.isBeta(e) || f < d ? !0 : !1
    },
    isBeta: function(e) {
        var f = !1,
        d = utils.cookie.get("DedeUserID").slice( - 1);
        d && $.isArray(e) && (f = -1 < $.inArray( + d, e));
        return f
    },
    trimHttp: function(b) {
        // return b ? b.replace(/^http:/, "") : "";
        return b;
    },
    lockPageScroll: function(e) {
        function f(b) {
            if (d[b.keyCode]) {
                return preventDefault(b),
                !1
            }
        }
        var d = {
            37 : 1,
            38 : 1,
            39 : 1,
            40 : 1
        };
        "lock" == e ? (window.addEventListener && window.addEventListener("DOMMouseScroll", this.preventDefault, !1), window.onwheel = this.preventDefault, window.onmousewheel = document.onmousewheel = this.preventDefault, window.ontouchmove = this.preventDefault, document.onkeydown = f) : "unlock" == e && (window.removeEventListener && window.removeEventListener("DOMMouseScroll", this.preventDefault, !1), window.onmousewheel = document.onmousewheel = null, window.onwheel = null, window.ontouchmove = null, document.onkeydown = null)
    },
    preventDefault: function(b) {
        b = b || window.event;
        b.preventDefault && b.preventDefault();
        b.returnValue = !1
    }
};
var CoverPreview = function(b) {
    function d(c) {
        return new d.prototype.init(c)
    }
    d.prototype = {
        constructor: d,
        init: function(a) {
            this.jqXHR = {};
            this.cache = {};
            this.loadingTimer = this.delayTimer = this.innerWidth = this.aid = null;
            this.options = b.extend({
                mount: document.body,
                previewSelector: ".v .preview",
                multiPrevent: !1
            },
            a || {});
            return this
        },
        bind: function() {
            utils.browser.lteIE(9) || this.options.multiPrevent && "true" == b(this.options.mount).attr("data-cover-preview") || (b(this.options.mount).attr("data-cover-preview", "true"), this._mouseEvent())
        },
        _mouseEvent: function() {
            var a = this;
            b(this.options.mount).on("mouseenter.c-p", this.options.previewSelector,
            function() {
                var g = this,
                f = b(this).attr("href").match(/av(\d+)/);
                clearTimeout(a.delayTimer);
                clearTimeout(a.loadingTimer);
                f && (a.aid = f[1], a.loadingTimer = setTimeout(function() {
                    a.jqXHR[a.aid] && "pending" === a.jqXHR[a.aid].state() && b(g).find(".fore > span").attr("data-loading", !0)
                },
                1000), a.delayTimer = setTimeout(function() {
                    a._ajaxGetInfo(g);
                    a.innerWidth = b(g).innerWidth()
                },
                100))
            }).on("mouseleave.c-p", this.options.previewSelector,
            function() {
                clearTimeout(a.delayTimer);
                clearTimeout(a.loadingTimer);
                b(this).find(".fore > span").attr("data-loading", !1);
                a.aid = a.innerWidth = null
            }).on("mousemove.c-p", this.options.previewSelector,
            function(e) {
                var f = this;
                a.aid && (a.innerWidth && a.jqXHR[a.aid]) && a.jqXHR[a.aid].done(function(c) {
                    c && (!c.code && c.data) && a._setPosition(f, e.pageX, c.data)
                })
            })
        },
        _ajaxGetInfo: function(a) {
            var g = this,
            f = this.aid;
            this.jqXHR[f] ? this.jqXHR[f].done(function(c) {
                c && (!c.code && c.data) && g._buildPreview(a, c.data)
            }) : this.jqXHR[f] = b.ajax({
                // url: "//api.bilibili.com/pvideo",
                url: "http://api.bilibili.com/pvideo",
                data: {
                    aid: f,
                    type: "jsonp"
                },
                dataType: "jsonp"
            }).done(function(c) {
                c && (!c.code && c.data) && g._buildPreview(a, c.data)
            }).fail(function() {}).always(function() {
                b(a).find(".fore > span").attr("data-loading", !1)
            });
        },
        _buildPreview: function(a, n) {
            var l = this.aid,
            k = new Image,
            j = [];
            if (n.image[0] && (k.onload = function() {
                b(a).attr("data-cover-loaded", !0);
                /*b(a).find(".back > div").css({
                    backgroundImage: "url(" + utils.trimHttp(n.image[0]) + ")"
                })*/
            },
            k.src = utils.trimHttp(n.image[0]), !b.isArray(this.cache[l]))) {
                for (var i in n.index) {
                    j.push( + i)
                }
                j.sort(function(e, c) {
                    return e - c
                });
                this._cacheArray(j, 10)
            }
        },
        _cacheArray: function(h, l) {
            var k = 0,
            j = 1,
            i = [];
            if (h.length > l) {
                for (100 < h.length && (h.length = 100), j = Math.floor(h.length / l), k = 0; k < h.length && !(i.push(h[k]), i.length >= l); k += j) {}
            } else {
                i = h
            }
            this.cache[this.aid] = i
        },
        _setPosition: function(a, n, l) {
            var k = b(a).innerWidth(),
            j = l.img_y_size / l.img_x_size * k,
            i = 100 * ((n - b(a).offset().left - 0.1) / k);
            0 > i && (i = 0);
            n = this.cache[this.aid][Math.floor(this.cache[this.aid].length / 100 * i)];
            i = i.toFixed(2) + "%";
            b(a).find(".fore > .bar > div").css("width", i);
            b(a).find(".back > div").css({
                backgroundPosition: -n % l.img_x_len * k + "px " + ( - Math.floor(n / l.img_x_len) * j + "px"),
                backgroundSize: l.img_x_len * k
            })
        }
    };
    d.prototype.init.prototype = d.prototype;
    return d;
}(jQuery);

var Animator = function(b) {
    function d(a) {
        this.frameTimer = null;
        this.framePos = 0;
        this.reverse = !1;
        a = this.options = b.extend({
            element: "",
            frameWidth: 16,
            frameHeight: 16,
            offsetX: 0,
            offsetY: 0,
            totalFrame: 0,
            fps: 16,
            frameTimer: null,
            animationList: {},
            orientationLandscape: !0
        }, a);
        if (!a.element) {
            return ! 1
        }
        // console.log(typeof a.element);
        a.element.css({
            display: "block",
            width: a.frameWidth,
            height: a.frameHeight,
            backgroundPosition: "0px 0px"
        });
    }
    d.prototype.loadAnimation = function(e) {
        var f = this.options;
        if (f.animationList && f.animationList[e]) {
            this.move(f.animationList[e].endFrame, f.animationList[e].loopFrame)
        } else {
            return ! 1
        }
    };
    d.prototype.move = function(g, j) {
        var i = this,
        h = this.options;
        clearInterval(i.frameTimer);
        this.reverse = !1;
        i.frameTimer = setInterval(function() {
            i._animate(g, j);
        }, 1000 / h.fps);
    };
    d.prototype._animate = function(e, f) {
        if ("undefined" !== typeof f) {
            f = parseInt(f - 1) >> 0,
            this.framePos == e ? (this.framePos > f ? this.framePos--:this.framePos++, this.framePos = f) : this.reverse ? this.framePos == f ? (this.reverse = !1, this.framePos > e ? this.framePos--:this.framePos++) : this.framePos > f ? this.framePos--:this.framePos++:this.framePos > e ? this.framePos--:this.framePos++
        } else {
            if (this.framePos == e) {
                return clearInterval(this.frameTimer),
                !0
            }
            this.framePos > e ? this.framePos--:this.framePos++
        }
        this._setPosition(this.framePos)
    };
    d.prototype._setPosition = function(g, j) {
        var i = this.options;
        if (!i.element) {
            return ! 1
        }
        var h = g ? g: this.framePos;
        i.element.css("backgroundPosition", -(i.orientationLandscape ? i.frameWidth * h + i.offsetX: i.offsetX) + "px " + -(i.orientationLandscape ? i.offsetY: i.frameHeight * h + i.offsetY) + "px")
    };
    d.prototype.start = function(c) {
        this.move(this.options.totalFrame - 1, c);
    };
    d.prototype.back = function(c) {
        this.move(0, c);
    };
    d.prototype.stop = function() {
        clearInterval(this.frameTimer);
    };
    return d
} (jQuery);

function FakeDanmu(b) {
    this.messages = [];
    this.elems = [];
    this.config = {
        baseTop: 0,
        delay: 1,
        rows: 2,
        lifeTime: 5,
        width: 300,
        height: 200,
        parent: null,
        messages: null,
        aid: null,
        cssProfix: "fake_danmu_gen",
        textStyle: 'color: #fff;font-size: 12px;font-family: "Microsoft Yahei", simhei, "\u9ed1\u4f53";display: inline;position: absolute;white-space: pre;pointer-events: none;opacity: 0.95;text-shadow: 1px 1px 2px #001;visibility: hidden'.split(";")
    };
    this.setConfig(b);
    this.duration = this.config.lifeTime;
    this.delayTimer = this.loopTimer = 0;
    this.loadState = FakeDanmu.READY;
    this.paused = !0;
    this.id = FakeDanmu._id++;
    null == FakeDanmu.styleElement && (FakeDanmu.styleElement = document.createElement("style"), (document.head || document.getElementsByTagName("head")[0]).appendChild(FakeDanmu.styleElement));
    try {
        FakeDanmu.styleElement.innerHTML = "." + this.config.cssProfix + "_shared{\r\n" + this.config.textStyle.join(";\r\n") + ";\r\n}\r\n"
    } catch(d) {
        FakeDanmu.enabled = !1,
        this.loadState = FakeDanmu.COMPLETE
    }
}
FakeDanmu._id = 0;
FakeDanmu.enabled = !0;
FakeDanmu.READY = 0;
FakeDanmu.LOADING = 1;
FakeDanmu.COMPLETE = 2;
FakeDanmu.prototype = {
    constructor: FakeDanmu,
    init: function(b) {
        this.messages = b;
        this.render();
    },
    setConfig: function(b) {
        if ("object" == typeof b) {
            for (var d in this.config) {
                b.hasOwnProperty(d) && (this.config[d] = b[d])
            }
        }
    },
    render: function() {
        this.elems = [];
        this.duration = this.config.lifeTime;
        var b;
        for (b = 0; b < this.messages.length; b++) {
            var d = this.renderText(this.messages[b]);
            this.insertText(d)
        }
        this.restoreStyle()
    },
    restoreStyle: function() {
        var e = [],
        f;
        e.push("." + this.config.cssProfix + "_shared{\r\n" + this.config.textStyle.join(";\r\n") + ";\r\n}\r\n");
        for (f = 0; f < this.elems.length; f++) {
            var d = this.elems[f];
            e.push("." + d.cssClass + "{\r\n" + d.cssText + "\r\n}\r\n")
        }
        FakeDanmu.styleElement.innerHTML = e.join("")
    },
    renderText: function(b) {
        var d = document.createElement("div");
        d.appendChild(document.createTextNode(b));
        d.className = this.config.cssProfix + "_shared";
        this.config.parent.appendChild(d);
        return {
            elem: d,
            width: d.offsetWidth,
            height: d.offsetHeight
        }
    },
    insertText: function(i) {
        var o = this.elems.length,
        h = o * this.config.lifeTime / this.config.rows / this.config.rows,
        n = i.height * (o % this.config.rows) + this.config.baseTop,
        l = this.config.lifeTime,
        k = i.elem;
        this.duration = h + l;
        var j = [];
        j.push("visibility: visible");
        j.push("top: " + n + "px");
        j.push("left: " + this.config.width + "px");
        j.push("transform: translateX(-" + (this.config.width + i.width) + "px)");
        j.push("transition: transform " + l + "s linear " + h + "s");
        this.elems.push({
            elem: k,
            cssClass: this.config.cssProfix + "_" + o,
            cssText: j.join(";\r\n") + ";"
        })
    },
    pause: function() {
        this.paused = !0;
        if (0 < this.config.delay && 0 != this.delayTimer) {
            clearTimeout(this.delayTimer),
            this.delayTimer = 0
        } else {
            if (this.loadState == FakeDanmu.COMPLETE) {
                var b;
                for (b = 0; b < this.elems.length; b++) {
                    this.elems[b].elem.className = this.config.cssProfix + "_shared"
                }
                this.loopTimer && clearTimeout(this.loopTimer);
                this.loopTimer = 0
            }
        }
    },
    play: function() {
        var b = this;
        this.paused = !1;
        0 < this.config.delay ? (0 != this.delayTimer && clearTimeout(this.delayTimer), this.delayTimer = setTimeout(function() {
            b.delayHandler()
        },
        1000 * this.config.delay)) : this._play()
    },
    _play: function() {
        if (this.loadState != FakeDanmu.COMPLETE) {
            this.delayHandler()
        } else {
            var e = this,
            f;
            for (f = 0; f < this.elems.length; f++) {
                var d = this.elems[f];
                d.elem.className = this.config.cssProfix + "_shared " + d.cssClass
            }
            this.loopTimer && clearTimeout(this.loopTimer);
            this.loopTimer = setTimeout(function() {
                e.restartHandler()
            },
            1000 * this.duration)
        }
    },
    restartHandler: function() {
        this.loopTimer = 0;
        this.pause();
        var b = this;
        this.loopTimer = setTimeout(function() {
            b._play()
        },
        100)
    },
    load: function(b) {
        if (this.loadState == FakeDanmu.READY) {
            this.loadState = FakeDanmu.LOADING;
            var d = this;
            /*$.getJSON("http://www.bilibili.com/widget/ajaxGetComment?aid=" + b,
            function(c) {
                d.loadState = c ? FakeDanmu.COMPLETE: FakeDanmu.READY;
                c && (d.init(c), d.paused || d._play())
            });*/
            d.loadState = FakeDanmu.COMPLETE;
            var c = ["\u6211\u611f\u89c9\u6211\u7684\u773c\u775b\u8981\u778e\u4e86","\u6211\u60f3\u8d77\u4e86\u90a3\u4e24\u6839\u5446\u6bdb....","\u8fd9\u4e5f\u6709?!","23333333333333","\u5367\u69fd\uff01\u7ea2A\u4f60\u4eca\u5e74\u591a\u5927\u4e86\uff1f\uff01","\u52a0\u85e4\u7684\u522b\u8d70 \u6ca1\u9519\u5c31\u662f\u4ed6","\u80f8....\u5728\u54ea\u91cc\uff1f","\u5367\u69fd\uff01\u6211\u8981\u5bc4\u5200\u7247\u4e86\uff01","\u600e\u4e48\u529e\u6211\u6709\u70b9\u614c\u8352","233333333333333333333","\u5927\u5bb6\u5feb\u8dd1","233333333333333333","\u8fd9\u4e2a\u5e05\u554a\uff01","\u5c34\u5c2c\u764c\u72af\u4e86...","\u8fd9\u4e2a\u826f\u5fc3\u554a\uff01","\u6211\u4e86\u4e2a\u64cd\u64cd","2333333333333","\u571f\u72fc","233333333333333333333333333","\u8fd9\u4e2a\u53ef\u4ee5\u7684\u8fd9\u4e2a\u53ef\u4ee5\u6709"];
            d.init(c), d.paused || d._play();
        }
    },
    delayHandler: function() {
        clearTimeout(this.delayTimer);
        this.delayTimer = 0;
        this.loadState == FakeDanmu.COMPLETE ? this._play() : this.loadState == FakeDanmu.READY && (this.config.aid ? this.load(this.config.aid) : this.config.messages && (this.loadState = FakeDanmu.COMPLETE, this.init(this.config.messages), this._play()))
    }
};
FakeDanmu.play = function(b) {
    if (FakeDanmu.enabled) {
        var d = b.parent;
        d.fakeDanmu ? d.fakeDanmu.restoreStyle() : d.fakeDanmu = new FakeDanmu(b);
        d.fakeDanmu.play();
        return d.fakeDanmu
    }
};
FakeDanmu.pause = function(b) {
    if (FakeDanmu.enabled) {
        var d = b.parent;
        d.fakeDanmu || (d.fakeDanmu = new FakeDanmu(b));
        d.fakeDanmu.pause();
        return d.fakeDanmu
    }
};

function initToolBar() {
    if (0 != $(".arc-toolbar, .arc-tool-bar").length) {
        for (var x = $("#app_qrcode_box"), y = {},
        w = [{
            name: "share",
            totalFrame: 17
        },
        {
            name: "fav",
            totalFrame: 14,
            loopFrame: 1
        },
        {
            name: "app",
            totalFrame: 16,
            loopFrame: 10
        },
        {
            name: "zan",
            totalFrame: 7,
            loopFrame: 1
        },
        {
            name: "coin",
            totalFrame: 7,
            loopFrame: 1
        }], v = $(".arc-toolbar"), u = 0; u < w.length; u++) { (function(a) {
                var h = $("." + a.name, v),
                f = $(".b-icon-anim-" + a.name, h),
                d = "undefined" != typeof a.loopFrame ? a.loopFrame: void 0;
                y[a.name] = new Animator({
                    element: f,
                    frameWidth: 80,
                    frameHeight: 80,
                    fps: 10,
                    totalFrame: a.totalFrame
                });
                h.mouseenter(function() {
                    if (!f.length) {
                        return ! 1
                    }
                    if (f.hasClass("on")) {
                        return y[a.name].stop(),
                        !1
                    }
                    y[a.name].start(d)
                }).mouseleave(function() {
                    y[a.name].back()
                })
            })(w[u])
        }
        var s = x.find(".qr-code-box"),
        t = null;
        var r = $(".block.share").addClass("initialized");
        if (utils.isBeta([2])) {
            r.hide();
            $(".t-right-bottom", r).on("change",
            function(b) {
                console.log(b)
            });
            $(".block", v).addClass("grey-cover");
            var q = $('<div class="share-tool-bar"><div class="drawer"><span class="title">\u5206\u4eab</span><span class="num" title="\u5206\u4eab\u6b21\u6570"></span><span class="arrow"></span></div><div class="share-btn-bar"><div title="\u5206\u4eab\u5230\u65b0\u6d6a\u5fae\u535a" class="g-share-btn weibo" data-id="btn_weibo"></div><div title="\u5206\u4eab\u5230QQ\u7a7a\u95f4" class="g-share-btn qzone" data-id="btn_qqzone"></div><div title="\u5206\u4eab\u5230QQ" class="g-share-btn qq" data-id="btn_qq"></div><div title="\u5206\u4eab\u5230\u767e\u5ea6\u8d34\u5427" class="g-share-btn tieba" data-id="btn_baidu"></div></div></div>'),
            o = 2;
            $(".t-right-bottom", r).on("DOMNodeInserted",
            function(b) {
                o--?$(".drawer .num", q).text($(this).text()) : $(".t-right-bottom", r).off("DOMNodeInserted")
            });
            var j = $(".share-box", r);
            j.appendTo($(".drawer", q));
            r.after(q);
            q.hover(function() {
                clearTimeout(t);
                t = setTimeout(function() {
                    j.stop(!0, !0).slideDown(200,
                    function() {})
                },
                300)
            },
            function() {
                clearTimeout(t);
                j.stop(!0, !0).slideUp(200)
            })
        }
    }
}

$(function(){
    index.init();
    CoverPreview().bind();
    $("body").on("mouseover.fakedanmu", ".v .preview", function() {
        var b = $(this).closest(".v").find("a").attr("href").match(/av(\d+)/);
        b && FakeDanmu.play({
            width: 180,
            height: 110,
            baseTop: 8,
            parent: this,
            aid: b[1]
        });
    }).on("mouseout.fakedanmu", ".v .preview", function() {
        var b = $(this).closest(".v").find("a").attr("href").match(/av(\d+)/);
        b && FakeDanmu.pause({
            width: 180,
            height: 110,
            baseTop: 8,
            parent: this,
            aid: b[1]
        });
    });
    initToolBar();
});

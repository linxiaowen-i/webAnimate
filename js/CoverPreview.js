utils = {
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
                url: "//api.bilibili.com/pvideo",
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
            // c.data = 
            // g._buildPreview(a, c.data);
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
    return d
} (jQuery);
$(document).ready(function() {
    CoverPreview().bind();
});
(function() {
    function f() { ! h && 30000 <= (new Date).getTime() - e && (h = !0, $(window).bind("mousemove", g));
        300000 <= (new Date).getTime() - e || (utils.isBeta([2]) ? $.ajax({
            url: "//api.bilibili.com/typedynamic/region_total?type=jsonp",
            dataType: "jsonp",
            success: function(d) {
                window.pushData = d.data;
                for (var c = 0; c < window.pushRefreshFunctions.length; c++) {
                    window.pushRefreshFunctions[c](d.data)
                }
            },
            xhrFields: {
                withCredentials: !0
            }
        }) : $.getJSON("/index/ding-count.json",
        function(d) {
            window.pushData = d;
            for (var c = 0; c < window.pushRefreshFunctions.length; c++) {
                window.pushRefreshFunctions[c](d)
            }
        }))
    }
    window.pushRefreshFunctions = [];
    var e = (new Date).getTime(),
    h = !1,
    g = function() {
        e = (new Date).getTime();
        h = !1;
        $(window).unbind("mousemove", g)
    };
    f();
    window.pushTimer = setInterval(f, 5000)
})();
var lazyImage = new LazyImage,
AjaxQueue = function() {
    function b() {
        this.queue = {};
        this.cache = []
    }
    b.prototype.ajax = function(e) {
        var g = this;
        if (!this.push($.extend({},
        e))) {
            if ($.extend(e, {
                success: function(j, i, c) {
                    g.cache[e.url] = j;
                    for (var a; a = g.queue[e.url].shift();) {
                        a.success.apply(this, arguments)
                    }
                },
                error: function(j, i, c) {
                    for (var a; a = g.queue[e.url].shift();) {
                        a.error.apply(this, arguments)
                    }
                }
            }), e.useBuffer && this.cache[e.url]) {
                for (var f; f = this.queue[e.url].shift();) {
                    f.success(this.cache[e.url])
                }
            } else {
                $.ajax(e)
            }
        }
    };
    b.prototype.push = function(c) {
        this.queue[c.url] = this.queue[c.url] || [];
        this.queue[c.url].push(c);
        return 1 < this.queue[c.url].length ? !0 : !1
    };
    return b
} ();
function fixImg(b) {
    b.each(function(e, g) {
        var f = $(g);
        2 >= Math.abs(180 - f.width()) && 180 != f.width() && f.css("width", 180)
    })
}
function setSubscribe(j, i, p, o) {
    function m() {
        window.biliLoginStatus.isLogin ? (0 <= $.inArray( - i, window.AttentionList) && j.addClass(p).html("\u5df2\u8ba2"), j.click(function() {
            var b = $(this);
            b.hasClass(p) ? l(b, i) : n(b, i)
        }), j.hover(function() {
            $(this).hasClass(p) && $(this).html("\u53d6\u6d88")
        },
        function() {
            $(this).hasClass(p) && $(this).html("\u5df2\u8ba2")
        })) : j.remove()
    }
    function n(d, c) {
        $.ajax("/spadmin?action=attention&spid=" + c, {
            success: function(a) {
                "OK" == a ? "undefined" != typeof o ? o(a) : d.addClass(p).html("\u5df2\u8ba2") : (new MessageBox).show(d, a)
            },
            error: function() { (new MessageBox).show(d, "\u7f51\u7edc\u9519\u8bef")
            }
        })
    }
    function l(d, c) {
        $.ajax("/spadmin?action=unfavourite&spid=" + c, {
            success: function(a) {
                "OK" == a ? "undefined" != typeof o ? o(a) : d.removeClass(p).html("\u8ba2\u9605") : (new MessageBox).show(d, a)
            },
            error: function() { (new MessageBox).show(d, "\u7f51\u7edc\u9519\u8bef")
            }
        })
    }
    var k = setInterval(function() {
        "undefined" != typeof window.biliLoginStatus && (clearInterval(k), m())
    },
    200)
}
function _makeBangumiUrl(b) {
    return "/sp/" + b
}
function ListSlider(d, c) {
    this.container = $(d);
    this.length = this.container.children().length;
    this.itemWidth = this.container.children().outerWidth(!0);
    this.options = $.extend(!0, {
        pagesize: 5,
        continuous: !0,
        animation: !0,
        round: !1,
        slide: function() {}
    },
    c);
    this.init()
}
ListSlider.prototype = {
    constructor: ListSlider,
    init: function() {
        var d = this.container,
        c = this;
        this.wrp = d.wrap("<div>").parent().addClass("b-list-slider-wrp");
        d.width(this.length * this.itemWidth);
        d.data("left", 0);
        this.prevBtn = $('<div class="b-list-slider-handle handle-prev no-select"><span class="b-list-slider-icon"></span></div>').insertAfter(d).hide().on("click",
        function() {
            c.prev()
        });
        this.nextBtn = $('<div class="b-list-slider-handle handle-next no-select"><span class="b-list-slider-icon"></span></div>').insertAfter(d).on("click",
        function() {
            c.next()
        });
        d.parent().hover(function() {
            c.showPage()
        },
        function() {
            c.prevBtn.hide();
            c.nextBtn.hide()
        })
    },
    showPage: function(d) {
        var c = this._calcPagesize();
        d = void 0 !== d ? d: this.container.data("left");
        c < this.length || c >= this.length && 0 < d ? this.options.round ? (this.prevBtn.show(), this.nextBtn.show()) : (0 < d ? this.prevBtn.show() : this.prevBtn.hide(), d + this.itemWidth * c < this.container.width() ? this.nextBtn.show() : this.nextBtn.hide()) : (this.prevBtn.hide(), this.nextBtn.hide())
    },
    next: function() {
        this.slide(1)
    },
    prev: function() {
        this.slide( - 1)
    },
    slide: function(h) {
        var g = this,
        l = this.container,
        k = this._calcPagesize(),
        i = this.itemWidth,
        j = l.data("left") + h * i * k;
        0 > j ? j = 0 != l.data("left") ? 0 : this.length % k ? this.options.continuous ? l.width() - k * i: l.width() - this.length % k * i: l.width() + j: j >= l.width() ? j = 0 : this.options.continuous && this.length - j / i < k && (j = l.width() - k * i);
        this.options.animation ? l.stop(!0, !0).animate({
            "margin-left": -j
        },
        200,
        function() {
            g._trigger("slide", j)
        }) : (l.css({
            "margin-left": -j,
            opacity: 0
        }).stop(!0, !0).animate({
            opacity: 1
        },
        200), this._trigger("slide", j));
        this.showPage(j);
        l.data("left", j);
        return j
    },
    _calcPagesize: function() {
        var e = this.container.parent().width(),
        d = this.options.pagesize;
        if ("number" == typeof d) {
            return d
        }
        if ($.isPlainObject(d)) {
            for (var f in d) {
                if (e == parseInt(f)) {
                    return d[f]
                }
            }
        }
    },
    _trigger: function() {
        var d = Array.prototype.slice.call(arguments, 0),
        c = d.shift();
        if (this.options[c]) {
            return this.options[c].apply(this, d)
        }
    }
};
function CreateArea(e) {
    this.DEFAULT_PARAMS = {
        AREA: '<div class="container-row"><div class="b-section-head"></div><div class="b-section-body"><div class="b-l"><div class="b-head"></div><div class="b-body"></div></div><div class="b-r"><div class="b-head"></div><div class="b-body"></div></div></div></div>'
    };
    this.api = {};
    this.params = {
        tid: null,
        container: null,
        area: this.DEFAULT_PARAMS.AREA,
        id: null,
        className: null,
        name: null,
        empty: !1,
        wrapper: null,
        addFunc: null,
        panes: null
    };
    this._extVars = {};
    this.mergeParams(this.params, e);
    var d = !1;
    this.area = $(this.params.area);
    null != e.id && (0 < $("#" + e.id).length ? (this.area = $("#" + e.id), d = !0) : this.area.attr("id", e.id));
    this.area.addClass(this.params.className);
    e.empty && this.area.empty();
    var f;
    e.wrapper ? (this.area.attr("part", ""), f = 0 < $("#" + e.wrapper).length ? $("#" + e.wrapper) : $('<div class="container-row cnt-m"></div>').attr("id", e.wrapper), d || this.area.appendTo(f)) : f = this.area;
    "undefined" == typeof f.attr("area") && f.attr("area", this.params.id);
    d || (e.addFunc ? e.addFunc(f) : f.appendTo($(e.container)))
}
CreateArea.createTab = function(d, c) {
    c = c || {};
    "undefined" != typeof c.selected ? d.items[c.selected].selected = !0 : d.items[0].selected = !0;
    "undefined" != typeof c.wrapper && (d.wrapper = c.wrapper);
    c.eType && (d.eType = c.eType);
    return {
        element: TabModule.create(d)
    }
};
CreateArea.createRankingTab = function(b) {
    "object" === typeof b ? b.eType = "hover": b = {
        eType: "hover"
    };
    return CreateArea.createTab({
        items: [{
            name: "\u5168\u90e8",
            attributes: {
                type: "hot"
            }
        },
        {
            name: "\u539f\u521b",
            attributes: {
                type: "hot_original"
            }
        }]
    },
    b)
};
CreateArea.createListTab = function(b) {
    return CreateArea.createTab({
        items: [{
            name: "\u6709\u65b0\u52a8\u6001",
            attributes: {
                "data-source": utils.isBeta([2]) ? "//api.bilibili.com/typedynamic/index?type=jsonp": "/index/ding.json",
                "data-type-jsonp": utils.isBeta([2]) ? "jsonp": "json"
            }
        },
        {
            name: "\u6700\u65b0\u6295\u7a3f",
            attributes: {
                "data-source": "/index/ranking.json",
                "data-type-jsonp": "json"
            }
        }]
    },
    b)
};
CreateArea.createSelect = function(d, c) {
    c = c || {};
    "undefined" != typeof c.selected ? d.items[c.selected].selected = !0 : d.items[0].selected = !0;
    "undefined" != typeof c.wrapper && (d.wrapper = c.wrapper);
    return {
        element: SelectModule.create(d)
    }
};
CreateArea.createRankingSelect = function(e, d) {
    var f = [];
    "undefined" != typeof d && d.oneDay && f.push({
        name: "\u4e00\u65e5",
        attributes: {
            "data-value": "1",
            "data-source": "/index/catalogy/" + e + "-1day.json"
        }
    });
    f.push({
        name: "\u4e09\u65e5",
        attributes: {
            "data-value": "3",
            "data-source": "/index/catalogy/" + e + "-3day.json"
        }
    }); ("undefined" == typeof d || "undefined" != typeof d && !d.disableWeek) && f.push({
        name: "\u4e00\u5468",
        attributes: {
            "data-value": "7",
            "data-source": "/index/catalogy/" + e + "-week.json"
        }
    });
    "undefined" != typeof d && d.month && f.push({
        name: "\u4e00\u6708",
        attributes: {
            "data-value": "30",
            "data-source": "/index/catalogy/" + e + "-month.json"
        }
    });
    return CreateArea.createSelect({
        items: f
    },
    d)
};
CreateArea.prototype = {
    loadingDiv: '<div class="b-loading p-loading" loading></div>',
    data: {},
    queue: [],
    panes: [],
    bangumiDataBuffer: null,
    complete: !1,
    debug: !1,
    mergeParams: function(e, d) {
        if ("object" == typeof d) {
            for (var f in e) {
                d.hasOwnProperty(f) && (e[f] = d[f])
            }
            return e
        }
    },
    init: function() {
        this._initPanes(this.params.panes)
    },
    _initPanes: function(g, e) {
        if ("object" == typeof g) {
            for (var j in g) {
                var i = this.mergeParams({
                    _super: this,
                    tid: null,
                    template: null,
                    templateTarget: null,
                    wrapper: null,
                    headClass: ".b-head",
                    bodyClass: ".b-body",
                    title: null,
                    tab: null,
                    tabTarget: null,
                    tabChange: this.tabChange,
                    selector: null,
                    selectorTarget: null,
                    selectChange: this.selectChange,
                    push: !1,
                    pushDataSource: null,
                    onInitComplete: null,
                    dataContainer: null,
                    api: null,
                    dataSource: null,
                    multiAjaxs: null,
                    jsonpCallback: null,
                    jsonp: null,
                    data: null,
                    TYPES: null,
                    type: null,
                    pagesize: null,
                    slider: !1,
                    readmore: !0,
                    random: !1,
                    renderBefore: this.renderBefore,
                    render: null,
                    renderComplete: this.renderComplete,
                    fail: null,
                    panes: null,
                    "data-loc-id": 100,
                    reloadTimes: 0,
                    maxReloadTimes: 3
                },
                g[j]);
                i._parent = e || this.area;
                this.onInit(i);
                if (null != i.template) {
                    if (1 < $(i.template).length) {
                        var h = $(i.template);
                        i.template = $("<div temp-wrapper></div>").append(h)
                    } else {
                        i.template = $(i.template)
                    }
                    i.templateTarget ? i.template.appendTo(i._parent.find(i.templateTarget)) : i.template.appendTo(i._parent)
                } else {
                    i.template = i._parent
                }
                i.wrapper = null != i.wrapper ? $(i.wrapper, i.template) : i.template;
                i.body = i.wrapper.find(i.bodyClass);
                0 == i.body.length && (i.body = i.wrapper);
                i.head = i.wrapper.find(i.headClass);
                i.title && (i.head.length || (i.head = $("<div>").addClass(i.headClass.split(".").join(" ")).appendTo(i.wrapper)), i.head.html(i.title));
                null != i.dataContainer && "object" != typeof i.dataContainer ? i.dataContainer = $(i.dataContainer).appendTo(i.body) : null == i.dataContainer && (i.dataContainer = i.body);
                "undefined" != typeof h && i.template.children().unwrap("[temp-wrapper]");
                i.selector && this.initSelector(i);
                i.tab && this.initTab(i);
                i.push && this.initPush(i);
                this.onInitComplete(i);
                this.panes.push(i);
                g[j] = i;
                i.panes && this._initPanes(i.panes, i.wrapper)
            }
        }
    },
    _callFunc: function() {
        var d = Array.prototype.slice.call(arguments),
        c = d.shift();
        "string" == typeof c ? this[c].apply(this, d) : "function" == typeof c && c.apply(this, d)
    },
    onInit: function(b) {},
    onInitComplete: function(d) {
        if (d.tab && (d.dataContainer.find(".r-list-wrapper").length || "true" == d.dataContainer.attr("data-slider"))) {
            d.renderBefore = "renderHotBefore";
            d.tabChangeCallback = "renderHotTabChange";
            d.selectChangeCallback = "renderHotSelectChange";
            var c = d.dataContainer.find(".r-list-wrapper");
            c.length ? c.children().length ? d.dataContainer = c.children().eq(0) : d.dataContainer = $("<ul>").addClass("rlist").appendTo(c) : c = d.dataContainer.wrap('<div class="r-list-body"><div class="r-list-wrapper"></div></div>').parent();
            d.body = d.wrapper.find(".r-list-body").css("overflow", "hidden");
            c.width("200%");
            this._callFunc(d.tabChangeCallback, d, !1)
        }
        this._callFunc(d.onInitComplete, d)
    },
    initTab: function(e) {
        var d = this;
        if ("object" != typeof e.tab) {
            var f = $(e.tab).appendTo(e.wrapper.find(e.tabTarget));
            e.tab = f
        } else {
            e.tab instanceof $ || (e.tab = e.tab.element, e.tab.appendTo(e.wrapper.find(e.tabTarget)))
        }
        d.callTabChange(e, !1); ! 0 === e.push && e.tab.children().first().attr("push", "");
        bindTab({
            item: e.tab,
            onChange: function(b, g) {
                var a = g.isTrigger || !g.hasOwnProperty("which");
                e.selector ? d.callTabChange(e, !1, !a) : d.callTabChange(e, !0, !a);
                e.selector && d.callSelectChange(e, !0, !1)
            }
        },
        null, e.tab.eType)
    },
    initSelector: function(e) {
        var d = this;
        if ("object" != typeof e.selector) {
            var f = $(e.selector).appendTo(e.wrapper.find(e.selectorTarget));
            e.selector = f
        } else {
            e.selector instanceof $ || (e.selector = e.selector.element, e.selector.appendTo(e.wrapper.find(e.selectorTarget)))
        }
        bindSlt({
            item: e.selector,
            onChange: function(b, g) {
                var a = g.isTrigger || !g.hasOwnProperty("which");
                d.callSelectChange(e, !0, !a)
            }
        });
        d.callSelectChange(e, !1)
    },
    callTabChange: function(e, d, f) {
        if ("function" == typeof e.tabChange) {
            e.tabChange.call(this, e)
        } else {
            if ("string" == typeof e.tabChange) {
                this[e.tabChange](e)
            }
        }
        e.tabChangeCallback && this._callFunc(e.tabChangeCallback, e, f);
        d && this.parseData(e)
    },
    tabChange: function(d) {
        var c = d.tab.find("li.on");
        c.attr("data-source") ? (d.dataSource = c.attr("data-source"), c.attr("data-jsonp") ? d.jsonpCallback = c.attr("data-jsonp") : d.jsonpCallback = null, "jsonp" == c.attr("data-type-jsonp") ? d.jsonp = "jsonp": "json" == c.attr("data-type-jsonp") && (d.jsonp = null)) : d.api && d.api.selectBy && (d.api.data[d.api.selectBy] = c.attr(d.api.selectBy));
        c.attr("type") && (c = c.attr("type"), d.type = null != d.TYPES ? d.TYPES[c] || c: c)
    },
    callSelectChange: function(e, d, f) {
        if ("function" == typeof e.selectChange) {
            e.selectChange(e)
        } else {
            if ("string" == typeof e.selectChange) {
                this[e.selectChange](e)
            }
        }
        e.selectChangeCallback && this._callFunc(e.selectChangeCallback, e, f);
        d && this.parseData(e)
    },
    selectChange: function(d) {
        var c = d.selector.find("li[selected]");
        c.attr("data-source") ? (d.dataSource = c.attr("data-source"), c.attr("data-jsonp") ? d.jsonpCallback = c.attr("data-jsonp") : d.jsonpCallback = null) : d.api && d.api.selectBy && (d.api.data[d.api.selectBy] = c.attr(d.api.selectBy));
        c.attr("type") && (c = c.attr("type"), d.type = null != d.TYPES ? d.TYPES[c] || c: c)
    },
    initPush: function(i) {
        var h = this,
        n = i.pushContainer = $('<div class="read-push"><span class="icon-refresh"></span><span class="info"></span></div>').appendTo(i.head).hide(),
        m = i.tid || h.params.tid || 0;
        i.lastPush = i.currentPush = 0;
        var k = "undefined" != typeof window.pushTimer ? !0 : !1;
        if (k) {
            var l = function(a) {
                i.currentPush = a[m];
                a = i.currentPush - i.lastPush;
                0 < a && n.show().find(".info").html("<b>" + a + "</b><em>\u6761\u65b0\u52a8\u6001</em>")
            };
            if ("undefined" != typeof window.pushData) {
                i.lastPush = window.pushData[m],
                window.pushRefreshFunctions.push(l)
            } else {
                var j = setInterval(function() {
                    "undefined" != typeof window.pushData && (clearInterval(j), i.lastPush = window.pushData[m], window.pushRefreshFunctions.push(l))
                },
                100)
            }
        } else {
            n.show().find(".info").html("\u70b9\u51fb\u5237\u65b0")
        }
        n.click(function() {
            i.lastPush = i.currentPush;
            k && (n.hide(), n.find(".info").html(""));
            i.pushDataSource ? i.dataSource = i.pushDataSource: window.tid && "renderNewSubList" == i.render ? i.dataSource = "//api.bilibili.com/typedynamic/region?rid=" + m + "&pn=0&ps=15&type=jsonp": utils.isBeta([2]) ? (i.dataSource = "//api.bilibili.com/typedynamic/region?rid=" + m + "&pn=0&ps=15&type=jsonp", i.render = "renderNewSubList") : (i.dataSource = "/index/ding/" + m + ".json", window.tid || (i.jsonp = null));
            i.tab && (i.tab.find("[push]").attr("data-source", i.dataSource), i.tab.children().removeClass("on"), i.tab.find("[push]").addClass("on"));
            h.parseData(i, !0)
        })
    },
    initApi: function(e) {
        var d;
        if (null != e.api) {
            d = this.api[e.api.name];
            if (e.api.data) {
                d.data || (d.data = {});
                for (var f in e.api.data) {
                    d.data[f] = e.api.data[f]
                }
            }
            e.pagesize && e.api.data && (d.data.pagesize = e.pagesize)
        } else {
            d = null != e.dataSource ? e.dataSource: null
        }
        return d
    },
    makeQueryString: function(f) {
        if (null == f || "string" == typeof f) {
            return f
        }
        var e = f.url + "?",
        h = 0,
        g;
        for (g in f.data) {
            f.data[g] && (e += (0 == h ? "": "&") + g + "=" + f.data[g], h++)
        }
        return e
    },
    load: function(e) {
        for (var d in e) {
            var f = e[d];
            null != f.render && this.parseData(f);
            f.panes && this.load(f.panes)
        }
        this.complete = !0
    },
    parseData: function(r, q) {
        var p = this;
        p._callFunc(r.renderBefore, r);
        p.renderReadMore(r);
        var o = p.initApi(r);
        r.dataContainer.find(".b-loading").remove();
        r.loadingDiv = $(p.loadingDiv).prependTo(r.dataContainer);
        if ("object" == typeof o) {
            p.render(r, o)
        } else {
            var m = p.makeQueryString(o);
            if (null != m) {
                if (p.data[m] && !0 !== q) {
                    r.loadingDiv.remove(),
                    p.render(r, p.data[m])
                } else {
                    p.queue[m] = p.queue[m] || [];
                    p.queue[m].push({
                        pane: r,
                        callback: function(a) { ! a || a.code && 0 != a.code ? a && -101 == a.code ? r.loadingDiv.removeClass("b-loading").html('\u8bf7\u5148<a href="https://account.bilibili.com/login">\u767b\u5f55</a>') : (p.reload(r), p._callFunc(r.fail, r)) : (r.loadingDiv.remove(), p.render(r, a))
                        }
                    });
                    if (1 < p.queue[m].length) {
                        return ! 1
                    }
                    var o = {
                        url: m,
                        data: r.data
                    },
                    n = function(d) {
                        p.data[m] = d;
                        for (var c; c = p.queue[m].shift();) {
                            c.callback(d)
                        }
                    };
                    r.jsonpCallback ? (o.dataType = "jsonp", o.jsonpCallback = r.jsonpCallback, o.cache = !0, window[r.jsonpCallback] = n) : (o.dataType = r.jsonp || "json", o.success = n, o.xhrFields = {
                        withCredentials: !0
                    });
                    if (r.multiAjaxs && 0 < r.multiAjaxs.urls.length && r.multiAjaxs.mixin && r.multiAjaxs.count) {
                        r.multiAjaxs.count--;
                        r.jsonpCallback && (window[r.jsonpCallback] = function() {});
                        for (var l, j = [$.ajax(o).fail(function() {
                            for (var a; a = p.queue[m].shift();) {
                                p.reload(a.pane),
                                p._callFunc(r.fail, r)
                            }
                        })], i = 0; i < r.multiAjaxs.urls.length; i++) {
                            l = p.makeQueryString(r.multiAjaxs.urls[i]),
                            o = $.ajax({
                                url: r.multiAjaxs.urls[i],
                                dataType: "json"
                            }).done(function(b) {
                                p.data[l] = b
                            }),
                            j.push(o)
                        }
                        $.when.apply($, j).then(function(b) {
                            n.apply(this, b)
                        })
                    } else {
                        $.ajax(o).fail(function() {
                            for (var a; a = p.queue[m].shift();) {
                                p.reload(a.pane),
                                p._callFunc(r.fail, r)
                            }
                        })
                    }
                }
            }
        }
    },
    reload: function(d) {
        var c = this;
        if (d.reloadTimes < d.maxReloadTimes) {
            setTimeout(function() {
                c.parseData(d, !0)
            },
            2000),
            d.reloadTimes++
        } else {
            d.loadingDiv.addClass("b-load-fail").html("<span>\u52a0\u8f7d\u5931\u8d25,\u70b9\u51fb<a>\u91cd\u8bd5</a></span>").find("a").one("click",
            function() {
                c.parseData(d, !0)
            })
        }
    },
    render: function(e, d) {
        try {
            if ("function" == typeof e.render) {
                e.render(e, d)
            } else {
                if ("string" == typeof e.render) {
                    this[e.render](e, d)
                }
            }
        } catch(f) {}
        this._callFunc(e.renderComplete, e)
    },
    lazyImage: lazyImage,
    renderBefore: function(b) {
        b.dataContainer.empty()
    },
    renderReadMore: function(j) {
        var i = j.wrapper.find(".more-link, .b-link-more"),
        p,
        o = j.dataContainer,
        m,
        n = !1;
        i.length ? (n = !0, p = i.find(">a")) : (i = $("<div>").addClass("more-link"), p = $("<a>").html('\u67e5\u770b\u66f4\u591a<i class="b-icon b-icon-arrow-r"></i>').appendTo(i));
        if (!1 !== j.readmore) {
            if ("renderList" == j.render || "renderIndexList" == j.render) {
                i.removeClass("more-link").addClass("b-link-more"),
                p.attr("href", "/video/" + this.params.name + ".html").html('\u66f4\u591a<i class="b-icon b-icon-arrow-r"></i>'),
                o = null,
                n || (j.push ? i.insertBefore(j.pushContainer) : i.appendTo(j.head))
            } else {
                if ("renderSubList" == j.render) {
                    "undefined" != typeof this.area.find(".b-section-head .b-head-t a").attr("href") ? p.attr("href", this.area.find(".b-section-head .b-head-t a").attr("href")) : o = null
                } else {
                    if ("renderIndexRanking" == j.render) {
                        m = "all";
                        var l = this.params.tid,
                        k = 3;
                        13 == l && (m = "bangumi");
                        j.tab && "hot_original" == j.tab.find(".on").attr("type") && (m = "origin");
                        j.selector && (k = j.selector.find("[selected=selected]").attr("data-value"));
                        p.attr({
                            href: "/ranking#!/" + m + "/" + l + "/1/" + k + "/",
                            target: "_blank"
                        });
                        0 < j.dataContainer.parents(".r-list-body").length && (o = j.dataContainer.parents(".r-list-body"))
                    } else {
                        "renderSubRanking" == j.render ? (m = this.area.find(".b-section-head .b-head-t a").attr("href"), m = "undefined" == typeof m ? "/list/rank-" + this.params.name + ".html#!order=hot&page=1&range=" + imod_box_get3d_date() : m + "#!order=hot&page=1&range=" + imod_box_get3d_date(), j.tab && "hot_original" == j.tab.find(".on").attr("type") && (m += "&original=true"), p.attr("href", m)) : "string" === typeof j.readmore ? p.attr({
                            href: j.readmore,
                            target: "_blank"
                        }) : o = null
                    }
                }
            }
            null == o || n || i.insertAfter(o)
        }
    },
    renderComplete: function(f) {
        var e = f._super,
        h = f.dataContainer;
        if ("undefined" == typeof f.swifting || !1 == f.swifting) {
            var g = function(b) {
                2 >= Math.abs(160 - b.width()) && 160 != b.width() && b.css("width", 160)
            };
            e.lazyImage.lazy(h, g)
        } ! 0 === f.slider && new ListSlider(h, {
            pagesize: {
                700 : 4,
                880 : 5
            },
            slide: function() {
                e.lazyImage.lazy(h, g)
            }
        });
        h.find("[data-number]").each(function(d, c) {
            $(c).text(utils.formatNum($(c).attr("data-number")))
        });
        0 == h.children().length && (h[0] && h[0].tagName && "UL" == h[0].tagName ? $('<li class="no-data"><span>\u6ca1\u6709\u6570\u636e</span></li>').appendTo(h) : $('<div class="no-data"><span>\u6ca1\u6709\u6570\u636e</span></div>').appendTo(h));
        bindPOCoins2(f.dataContainer.find("[data-gk]"));
        $(".v .i .i1, .v .i .i2, #dianji, .w_info .gk, .w_info .sc, .w_info .dm, .rlist .i .c1, .rlist .i .c2").html(function() {
            return formatFriendlyNumber($(this).html())
        })
    },
    _renderFragment: function(i, h, n, m) {
        for (var k = $("<div />"), l = 0; l < n; l++) {
            if (void 0 !== h[l]) {
                var j = m.call(this, h[l], l);
                j && k.append(j)
            }
        }
        i.dataContainer.append(k.children())
    },
    renderIndexList: function(d, c) {
        c.data && (c = c.data);
        c.list && (c = c.list);
        this.renderList(d, c)
    },
    renderList: function(e, d) {
        var f;
        f = null != e.type ? "undefined" != typeof d.newv && "newv" != e.type ? "undefined" != typeof d.newv[e.type] ? d.newv[e.type].list: {}: "undefined" != typeof d[e.type] ? d[e.type].list || d[e.type] : d.list || d: d.list || d;
        this._renderFragment(e, f, e.pagesize ? e.pagesize: f.length,
        function(b) {
            return "undefined" == typeof b ? !1 : $('<li><div class="v"><a class="preview cover-preview" href="/video/av' + b.aid + '/" target="_blank">' + (!0 === b.badgepay ? '<div class="v-pay-tag">\u4ed8\u8d39\u89c2\u770b</div>': "") + '<div class="medal"></div><div class="original"></div><div class="border"></div><img data-img="' + utils.trimHttp(b.pic) + '" alt="' + b.title + '"><div class="back"><div></div></div><div class="fore"><span></span><div class="bar"><div></div></div></div><div class="x"><b class="x2">' + utils.formatDuration(b.duration) + '</b></div></a><a href="/video/av' + b.aid + '/" target="_blank" title="' + b.title + '"><div class="t">' + b.title + '</div><div class="i"><span><i class="b-icon b-icon-v-play"></i>' + utils.formatNum(0 == b.play ? 0 : b.play || b.stat && b.stat.view) + '</span><span><i class="b-icon b-icon-v-dm"></i>' + utils.formatNum(0 == b.video_review ? 0 : b.video_review || b.stat && b.stat.danmaku) + "</span></div></a></div></li>").attr(utils.parseCardProps(b))
        })
    },
    renderNewSubList: function(d, c) {
        c = c.data;
        c.list = c.archives;
        this.renderList(d, c)
    },
    renderSubList: function(d, c) {
        c instanceof $ ? d.dataContainer.html(c.html()) : this.renderList(d, c)
    },
    renderHotBefore: function(d) {
        var c = d.tab.children().length;
        d.wrapper.find(".r-list-wrapper>[loaded]").length == c && (d.swifting = !0);
        d.wrapper.find(".r-list-wrapper>ul").length < c && d.dataContainer.clone().removeAttr("loaded").empty().appendTo(d.wrapper.find(".r-list-wrapper"));
        d.dataContainer = d.wrapper.find(".r-list-wrapper>ul:eq(" + d.tab.find(".on").index() + ")")
    },
    renderHotTabChange: function(i, h) {
        var n = i.dataContainer.index(),
        m = i.tab.find(".on").index(),
        k,
        l = i.dataContainer.parents(".r-list-wrapper"),
        j = i.tab.children().length;
        l.find(">ul").show().not(":eq(" + n + "), :eq(" + m + ")").hide();
        k = n < m ? 1 : 0;
        2 < j && (n < m && m == j - 1 ? l.css("margin-left", "0%") : n > m && 0 == m && l.css("margin-left", "-100%"));
        i.dataContainer.parents(".r-list-wrapper").animate({
            "margin-left": -100 * k + "%"
        },
        !1 !== h ? 200 : 0)
    },
    renderHotSelectChange: function(b) {
        b.wrapper.find(".r-list-wrapper>ul").empty().removeAttr("loaded");
        b.swifting = !1
    },
    renderRanking: function(f, e, h, g) {
        e = null != f.type ? e[f.type].list: e.list || e;
        this._renderFragment(f, e, f.pagesize ? f.pagesize: e.length,
        function(i, c) {
            if ("undefined" == typeof i) {
                return ! 1
            }
            var j = $('<li><i class="number">' + (c + 1) + '</i><div class="preview"><a href="/video/av' + i.aid + '/" title="' + i.title + " \u64ad\u653e:" + i.play + " " + i.duration + '" target="_blank"><img data-img="' + utils.trimHttp(i.pic) + '" alt="' + i.title + '" /></a></div><a class="rl-info" href="/video/av' + i.aid + '/" title="' + i.title + " \u64ad\u653e:" + i.play + " " + i.duration + '" target="_blank"><div class="title t">' + i.title + '</div><div class="i"><b class="pts" title="\u7efc\u5408\u8bc4\u5206: ' + utils.formatNum(i.pts) + '">\u7efc\u5408\u8bc4\u5206\uff1a' + utils.formatNum(i.pts) + "</b></div></a></li>").attr(utils.parseCardProps(i));
            "undefined" != typeof h && h(j, c);
            return j
        });
        bindPOCoins2(f.dataContainer.find("li"));
        "undefined" != typeof g && g(f)
    },
    renderIndexRanking: function(d, c) {
        d.dataContainer.attr("loaded") || this.renderRanking(d, c,
        function(f, e) {
            1 > e ? f.addClass("on") : f.addClass("off");
            3 > e && f.find(".number").addClass("n" + (e + 1))
        },
        function(b) {
            b.tab && b.dataContainer.attr("loaded", "true")
        })
    },
    renderSubRanking: function(d, c) {
        this.renderRanking(d, c,
        function(f, e) {
            3 > e ? f.addClass("on") : f.addClass("off");
            3 > e && f.find(".number").addClass("n" + (e + 1))
        })
    },
    renderTopList: function(e, d) {
        d = d.recommend || d;
        var f = d.list;
        this._renderFragment(e, f, e.pagesize ? e.pagesize: f.length,
        function(h, g) {
            if ("undefined" == typeof h) {
                return ! 1
            }
            var i = 3 == window.tid && h.typename ? '<span class="b-tag">' + h.typename + "</span>": "";
            return $('<li><div class="v-item"><a href="/video/av' + h.aid + '/" target="_blank" title="' + h.title + '">' + (!0 === h.badgepay ? '<div class="v-pay-tag">\u4ed8\u8d39\u89c2\u770b</div>': "") + '<div class="medal"></div><div class="original"></div><div class="preview"><img data-img="' + utils.trimHttp(h.pic) + '" alt="' + h.title + '" />' + i + '</div><div class="mask"></div><div class="play-icon"></div><div class="info"><div class="t">' + h.title + '</div><p class="up">up\u4e3b\uff1a' + h.author + '</p><p class="play">\u64ad\u653e\uff1a' + h.play + "</p></div></a></div></li>")
        })
    },
    renderAds: function(j, i) {
        var p = i.item;
        if (i.zone.enabled) {
            var o = j.pagesize ? j.pagesize: p.length;
            if (j.random) {
                for (var m = p.slice(), n = m.length, p = [], l = 0; l < n; l++) {
                    var k = Math.floor(Math.random() * m.length);
                    p.push(m[k]);
                    m.splice(k, 1)
                }
            }
            for (m = 0; m < o; m++) {
                n = p[m],
                "undefined" != typeof n && (l = $('<div class="pmt-item"><a href="' + n.link + '" target="_blank"><img src="' + utils.trimHttp(n.image) + '"></a></div>').appendTo(j.dataContainer), 1 != n.width && l.addClass("pmt-mid"))
            }
        } else {
            j.dataContainer.remove()
        }
    },
    renderBlankableAds: function(r, q) {
        var p = [];
        if ($.isArray(q.data)) {
            p = q.data
        } else {
            if ($.isPlainObject(q.data)) {
                for (var o in q.data) {
                    Array.prototype.push.apply(p, q.data[o])
                }
            }
        }
        o = r.pagesize ? r.pagesize: p.length;
        if (r.random) {
            for (var m = p.slice(), n = m.length, p = [], l = 0; l < n; l++) {
                var j = Math.floor(Math.random() * m.length);
                p.push(m[j]);
                m.splice(j, 1)
            }
        }
        2 == p[0].pos_num && $('<div class="pmt-item" data-id="NaN149"><a href="javascript:void" target="_blank" style="cursor:default"></a></div>').appendTo(r.dataContainer);
        for (m = 0; m < o; m++) {
            var n = p[m],
            l = n.id ? n.id: "",
            j = r.dataSource,
            i = "id",
            i = i.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
            j = RegExp("[\\?&]" + i + "=([^&#]*)").exec(j),
            j = null == j ? "": decodeURIComponent(j[1]);
            "undefined" != typeof n && (l = $('<div class="pmt-item" data-id="' + l + '" data-loc-id="' + j + '"><a href="' + n.url + '" target="_blank"><img src="' + utils.trimHttp(n.pic || n.litpic) + '"></a></div>').appendTo(r.dataContainer), 1 != n.width && l.addClass("pmt-mid"))
        }
    },
    renderNewAds: function(t, s) {
        var r = window.BiliCm && window.BiliCm.Base || {},
        q = [];
        if ($.isArray(s.data)) {
            q = s.data
        } else {
            if ($.isPlainObject(s.data)) {
                for (var o in s.data) {
                    Array.prototype.push.apply(q, s.data[o])
                }
            }
        }
        o = t.pagesize ? t.pagesize: q.length;
        if (t.random) {
            for (var p = q.slice(), n = p.length, q = [], m = 0; m < n; m++) {
                var j = Math.floor(Math.random() * p.length);
                q.push(p[j]);
                p.splice(j, 1)
            }
        }
        for (p = 0; p < o; p++) {
            var n = q[p],
            m = n.id ? n.id: "",
            j = t.dataSource,
            i = "id",
            i = i.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
            j = RegExp("[\\?&]" + i + "=([^&#]*)").exec(j),
            j = null == j ? "": decodeURIComponent(j[1]);
            "undefined" != typeof n && (m = $('<div class="pmt-item" data-id="' + m + '" data-loc-id="' + j + '"><a href="' + (n.url ? r && $.isFunction(r.getSyncUrl) ? r.getSyncUrl(n, j) : n.url: "javascript:void(0);") + '" data-target-url="' + (n.url || "") + '" target="_blank"><img src="' + (n.pic || n.litpic).replace(/^http:/i, "") + '"></a></div>').appendTo(t.dataContainer), n.is_ad && n.is_ad_loc && m.append("<img src='//static.hdslb.com/images/base/ad.png' style='width:32px;height:20px;position:absolute;left:2px;bottom:2px;'>"), 1 != n.width && m.addClass("pmt-mid"), r && $.isFunction(r.add) && r.add(m, n), m.css("position", "relative"))
        }
    },
    renderLinkList: function(h, g) {
        var l = g.item;
        if (g.zone.enabled) {
            for (var k = h.pagesize ? h.pagesize: l.length, i = 0; i < k; i++) {
                0 == i && h.dataContainer.hasClass("pmt-inline") && $("<i>").addClass("pmt-icon").prependTo(h.dataContainer);
                var j = l[i];
                "undefined" != typeof j && $('<div class="pmt-link"><a href="' + j.link + '" target="_blank" title="' + j.title + '" data-loc-id="' + h["data-loc-id"] + '">' + j.title + "</a></div>").appendTo(h.dataContainer)
            }
        } else {
            h.dataContainer.remove()
        }
    },
    renderSubRecommend: function(r, q) {
        function p(a) {
            if ("undefined" != typeof a) {
                var e = null;
                switch (a.type) {
                case "sp":
                    e = $('<div class="r-item"><a href="/sp/' + a.title + '" target="_blank" title="' + a.title + '"><img data-img="' + utils.trimHttp(a.image) + '" class="img" alt="' + a.title + '" /></a><div class="i-r"><a class="t" href="/sp/' + a.title + '" title="' + a.title + '" target="_blank">' + a.title + "</a></div></div>");
                    e.attr("spid", a.spid);
                    a = a.spid;
                    var f = $('<div class="b-btn">\u8ba2\u9605</div>').appendTo(e.find(".i-r"));
                    setSubscribe(f, a, "disabled");
                    break;
                case "pic":
                    r.dataContainer.addClass("b-rm-piclist"),
                    e = $('<div class="r-item-ad"><a href="' + a.link + '" target="_blank" title="' + a.title + '"><img data-img="' + utils.trimHttp(a.image) + '" alt="' + a.title + '" /></div>'),
                    a = parseInt(a.width),
                    6 >= a && 0 != a && (e.addClass("w" + a), 1 == a && 0 == r.dataContainer.find(".hidden").length && e.addClass("hidden"))
                }
                e.appendTo(r.dataContainer)
            }
        }
        function o() {
            function a() {
                g.show();
                f.show();
                1 >= h ? g.hide() : h >= s && f.hide();
                r.dataContainer.html("");
                for (var b = j * (h - 1); b < (j * h < l ? j * h: l); b++) {
                    p(m[b])
                }
                r.dataContainer.css({
                    opacity: 0
                });
                r.dataContainer.animate({
                    opacity: 1
                },
                200)
            }
            var s = Math.ceil(l / j),
            h = 1,
            c = r.dataContainer.parent(),
            g = $('<div class="prev"><span></span></div>').appendTo(c).hide(),
            f = $('<div class="next"><span></span></div>').appendTo(c);
            g.click(function() {
                1 >= h || (h--, a())
            });
            f.click(function() {
                h >= s || (h++, a())
            })
        }
        var m = q.item;
        if (q.zone.enabled) {
            var n = r.pagesize ? r.pagesize: -1,
            l = 0,
            j = 5;
            r.dataContainer.wrap('<div class="b-rm-list-wrapper"></div>');
            for (var i = 0; i < m.length && !( - 1 != n && i >= n); i++) {
                i < j && p(m[i]),
                l++
            }
            l > j && o()
        } else {
            r.template.remove()
        }
    },
    renderBangumiPromote: function(i, h) {
        for (var n = h.result,
        m = i.pagesize ? i.pagesize: -1, k = 0; k < n.length; k++) {
            var l = n[k];
            if ( - 1 != m && k >= m) {
                break
            }
            if ("undefined" != typeof l && "object" == typeof l) {
                var j;
                j = "0" == l.is_finish ? '<p class="num">\u66f4\u65b0' + l.newest_ep_index + "\u8bdd</p>": '<p class="num">\u5168' + l.total_count + "\u8bdd</p>"; (2 > k ? $('<li class="ipt"><div class="r-item"><a class="preview" href="/bangumi/i/' + l.season_id + '/" target="_blank" title="' + l.title + '"><img data-img="' + utils.trimHttp(l.cover) + '" alt="' + l.title + '" />' + j + '<div class="btm-info" href="/bangumi/i/' + l.season_id + '/" target="_blank" title="' + l.title + '"><p class="t"><span>' + l.title + '</span></p><p class="play">\u8ba2\u9605\uff1a' + formatFriendlyNumber(l.favorites) + "</p></div></a></div></li>") : $('<li><div class="r-item"><a class="preview" href="/bangumi/i/' + l.season_id + '/" target="_blank" title="' + l.title + '"><img data-img="' + utils.trimHttp(l.squareCover) + '" alt="' + l.title + '" /></a><div class="r-i"><a href="/bangumi/i/' + l.season_id + '/" target="_blank" title="' + l.title + '"><p class="t"><span>' + l.title + "</span></p></a>" + j + "</div></div></li>")).attr("data-seasonid", l.season_id).appendTo(i.dataContainer)
            }
        }
    },
    renderBangumiPromoteSlider: function(e, d) {
        var f = d.list;
        f.length && (f = {
            mode: "hover",
            parent: e.dataContainer,
            wrapper: $('<div class="mini-preview-wrapper"><div class="mini-preview-list-wrapper"><ul class="mini-preview"></ul></div><div class="s-bottom"><div class="info"></div></div></div>'),
            renderCallback: function(i, h, k) {
                var j = $('<div class="info-item"><a class="t" href="' + h.link + '" title="' + h.title + '" target="_blank">' + h.title + "</a></div>").appendTo($(".info", i));
                $("[preview] img", i).eq(k).attr("alt", h.title);
                0 == k && j.show()
            },
            slideCallback: function(g, c) {
                $(".info .info-item", g).stop().hide();
                $(".info", g).find(".info-item:eq(" + c + ")").stop(!0, !0).fadeIn(300)
            },
            item: function(g, c) {
                return $('<li><a target="_blank" href="' + g.link + '"><img src="' + utils.trimHttp(g.img) + '" alt="' + g.title + '"></a></li>')
            },
            bar: $('<ul id="topic_slider" class="slider-bar"></ul>'),
            barContainer: ".s-bottom",
            barItem: "<li><a></a></li>",
            dataSrc: {
                list: f
            }
        },
        (new SliderController(f)).init())
    },
    renderBangumiIndexPromote: function(i, h) {
        for (var n = h.result,
        m = i.pagesize ? i.pagesize: -1, k = 0; k < n.length; k++) {
            var l = n[k];
            if ( - 1 != m && k >= m) {
                break
            }
            if ("undefined" != typeof l && "object" == typeof l) {
                var j;
                j = "0" == l.is_finish ? '<div class="bangumi-state-index">\u66f4\u65b0' + l.newest_ep_index + (parseInt(h.newest_ep_index) ? "\u8bdd": "") + "</div>": l.total_count ? '<div class="bangumi-state-index">\u5168' + l.total_count + "\u8bdd</div>": "";
                $('<li><div class="pmt-item"><a class="preview" href="/bangumi/i/' + l.season_id + '/" target="_blank" title="' + l.title + '"><img src="' + utils.trimHttp(l.squareCover) + '" alt="' + l.title + '" />' + j + '</a><a class="t" href="/bangumi/i/' + l.season_id + '/" target="_blank" title="' + l.title + '">' + l.title + "</a></div></li>").attr("data-seasonid", l.season_id).appendTo(i.dataContainer)
            }
        }
    },
    renderBangumiCalendar: function(j, i) {
        function p(a) {
            var c = 0 > parseInt(a.bgmcount) ? "\u5c1a\u672a\u66f4\u65b0": "\u66f4\u65b0\u81f3<span>" + a.bgmcount + (parseInt(a.bgmcount) ? "\u8bdd": "") + "</span>";
            $('<li data-seasonid="' + a.season_id + '"' + (a["new"] ? ' class="new"': "") + '><div class="c-item"><a class="preview" href="' + a.url + '" target="_blank" title="' + a.title + '"><img data-img="' + utils.thumbnail(a.square_cover, 72) + '" alt="' + a.title + '" /></a><div class="r-i"><a href="' + a.url + '" target="_blank" title="' + a.title + '"><p class="t"><span>' + a.title + '</span></p></a><p class="num">' + c + "</p></div></div></li>").appendTo(j.dataContainer)
        }
        var o = j.tab.find("li.on").attr("data-day");
        j.tab.attr("data-initialized", !0);
        j.tab.find("li").each(function(e, d) {
            var f = $(d);
            f.attr("data-day") == o && "n" != f.attr("data-day") ? f.find("span").text("\u5468" + f.attr("data-name")) : f.find("span").text(f.attr("data-name"))
        });
        $('<div class="c-bottom clearfix"></div>').insertAfter(j.dataContainer);
        j.dataContainer.parents(".c-list-scroll-wrp").length || j.dataContainer.wrap('<div class="c-list-scroll-wrp custom-scrollbar"><div class="c-list-scroll-content"></div></div>');
        if (null == this.bangumiDataBuffer) {
            this.bangumiDataBuffer = {};
            for (var m = i.list || i.bangumi.list,
            n = j.pagesize && j.pagesize >= m.length ? j.pagesize: m.length, l = 0; l < n; l++) {
                12 > l && ($.isArray(this.bangumiDataBuffer.n) ? this.bangumiDataBuffer.n.push(m[l]) : this.bangumiDataBuffer.n = [m[l]]),
                "undefined" == typeof this.bangumiDataBuffer[m[l].weekday] && (this.bangumiDataBuffer[m[l].weekday] = []),
                this.bangumiDataBuffer[m[l].weekday].push(m[l])
            }
            for (var k in this.bangumiDataBuffer) {
                "n" != k && this.bangumiDataBuffer[k].sort(function(d, c) {
                    return c.favorites - d.favorites
                })
            }
            if (i.week_icon) {
                for (l in i.week_icon) {
                    j.tab.find("li[data-day=" + i.week_icon[l].weekday + "]").find(".b-icon-bangumi-w").css("background", "none").html($("<img>").addClass("bangumi-img-w").attr({
                        src: utils.trimHttp(i.week_icon[l].icon)
                    }))
                }
            }
        }
        if (this.bangumiDataBuffer[o].length) {
            for (m = 0; m < this.bangumiDataBuffer[o].length; m++) {
                p(this.bangumiDataBuffer[o][m])
            }
        } else {
            $('<div class="no-data"></div>').appendTo(j.dataContainer)
        }
        j.dataContainer.css({
            opacity: 0
        });
        j.dataContainer.animate({
            opacity: 1
        },
        200)
    },
    renderRecommend: function(h, g) {
        var l = g.list,
        k;
        for (k in l) {
            var i = l[k];
            if ("object" == typeof i) {
                var j = i.last_recommend[0];
                $('<li><div class="rm-item"><a class="preview" href="/video/av' + i.aid + '/" target="_blank" title="' + i.title + '"><img data-img="' + utils.thumbnail(i.pic, 320, 200) + '" alt="' + i.title + '" /></a><div class="rm-item-info"><a class="face" card="' + j.uname + '" href="//space.bilibili.com/' + j.mid + '" target="_blank"><img data-img="' + utils.thumbnail(j.face, 45) + '"></a><a class="name" card="' + j.uname + '" href="//space.bilibili.com/' + j.mid + '" target="_blank">' + j.uname + '</a><span>\u63a8\u8350</span></div><a class="t" href="/video/av' + i.aid + '/" target="_blank" title="' + i.title + '">' + i.title + "</a></div></li>").attr(utils.parseCardProps(i)).appendTo(h.dataContainer)
            }
        }
    },
    renderHotspot: function(e, d) {
        var f = d.vari_new.list;
        this._renderFragment(e, f, e.pagesize ? e.pagesize: f.length,
        function(b) {
            return $('<li><div class="rm-item"><a class="preview" href="/video/av' + b.aid + '/" target="_blank" title="' + b.title + '"><img data-img="' + utils.trimHttp(b.pic) + '" alt="' + b.title + '" /></a><div class="rm-item-info"><a class="face" card="' + b.author + '" href="//space.bilibili.com/' + b.mid + '" target="_blank"><img data-img="' + utils.trimHttp(b.face) + '"></a><a class="name" card="' + b.author + '" href="//space.bilibili.com/' + b.mid + '" target="_blank">' + b.author + '</a><span>\u6295\u7a3f\u4e86</span></div><a class="t" href="/video/av' + b.aid + '/" target="_blank" title="' + b.title + '">' + b.title + "</a></div></li>").attr(utils.parseCardProps(b))
        })
    },
    renderHotspotRanking: function(e, d) {
        var f = d.vari_reco.list;
        this._renderFragment(e, f, e.pagesize ? e.pagesize: f.length,
        function(g, c) {
            return $('<li><a class="hs-item" href="' + utils.trimHttp(g.url) + '" target="_blank" title="' + g.title + '"><i class="number n' + (c + 1) + '">' + (c + 1) + '</i><div class="hs-t">' + g.title + "</div></a></li>")
        })
    },
    renderLiveList: function(g, e) {
        var j = e.data.recommend,
        i = g.pagesize ? g.pagesize: j.length;
        this.area.find("#live_online_state").html("\u5f53\u524d\u5171\u6709<em>" + (e.data.online_total || "--") + "</em>\u4e2a\u5728\u7ebf\u76f4\u64ad");
        var h = this.area.find(".live-pmt-item img");
        10 > i ? (this.area.addClass("area-live-collapsed"), h.attr("data-simg") && h.attr("src", utils.trimHttp(h.attr("data-simg")))) : (this.area.removeClass("area-live-collapsed"), h.attr("data-limg") && h.attr("src", utils.trimHttp(h.attr("data-limg"))));
        this._renderFragment(g, j, i,
        function(d, c) {
            return $('<li><div class="lv-item"><a class="lv-preview" href="' + d.link + '" target="_blank" title="' + d.title + '"><img data-img="' + utils.thumbnail(d.pic, 320, 200) + '" alt="' + d.title + '" /><div class="lv-mask"><div class="lv-face"><img data-img="' + utils.thumbnail(d.face, 40) + '"></div><span class="lv-onair-txt"><i class="lv-onair-icon"></i>Live</span> </div><span class=\'b-tag\'>' + (d.areaName || "") + '</span></a><a href="' + d.link + '" target="_blank"><div class="lv-room"><div class="lv-t" title="' + d.title + '">' + d.title + '</div></div><div class="lv-info"><div class="lv-host" title="' + d.uname + '"><i class="b-icon b-icon-live-host"></i>' + d.uname + '</div><div class="lv-online"><i class="b-icon b-icon-live-online"></i>' + utils.formatNum(d.online) + "</div></div></a></div></li>")
        })
    },
    renderLiveRanking: function(i, h) {
        if (i.dataContainer.attr("loaded")) {
            this.lazyImage.lazy(i.dataContainer)
        } else {
            var n = i.tab.children(".on").attr("data-view"),
            m = h.data.list || h.data.ranking,
            k = i.pagesize ? i.pagesize: m.length;
            if ("live-promote" != n) {
                this._renderFragment(i, m, k,
                function(a, f) {
                    var c = $('<li><div class="r-item"><a class="preview" href="' + a.link + '" target="_blank" title="' + a.uname + '"><img data-img="' + utils.trimHttp(a.face) + '" alt="' + a.uname + '" /></a><a href="' + a.link + '" target="_blank" title="' + a.uname + '"><div class="r-i"><p class="r-i-t"><span class="u-name">' + a.uname + '</span><span class="u-online"><i class="b-icon b-icon-live-online"></i><em data-number=' + a.online + '></em></span></p><div class="r-i-st" title="' + a.title + '">' + a.title + "</div></div></a></div></li>");
                    "live-ranking" == n && c.find(".r-item").addClass("r-ranking").prepend($('<div class="lv-num"></div>').addClass("n" + (f + 1)).text(f + 1));
                    i.tab && i.dataContainer.attr("loaded", "true");
                    return c
                }),
                0 == i.dataContainer.children().length && i.dataContainer.append('<li class="no-data"><span>\u6ca1\u6709\u6570\u636e</span></li>')
            } else {
                k = 1;
                k = (m = h.data.preview) || [];
                this.area.hasClass("area-live-collapsed");
                for (var m = [], l = 0, j = k.length; l < j; l++) {
                    m.push({
                        img: utils.trimHttp(k[l].pic),
                        link: utils.trimHttp(k[l].url),
                        title: k[l].title
                    })
                }
                if (0 == $("#b_live .mini-preview-wrapper").length) {
                    for (this.renderBangumiPromoteSlider(i, {
                        list: m
                    }), j = $("<div class='live-pmt-list' ></div>").appendTo(i.dataContainer), m = h.data && h.data.recommendAnchor, l = 0; l < m.length; l++) {
                        k = m[l],
                        "undefined" != typeof k && "object" == typeof k && j.append(['<li><div class="pmt-item">', '<a class="preview" href="' + utils.trimHttp(k.link || "") + '" target="_blank" title="' + (k.title || "") + '">', '<img src="' + utils.trimHttp(k.face || "") + '" alt="' + (k.title || "") + '" />', '<p class="title">' + k.uname + "</div>", "</a></div></li>"].join(""))
                    }
                }
            }
            h.data.preview && ("live-promote" != n && !i.tab.attr("data-initialized")) && (i.tab.find("[data-view=live-promote]").show().trigger("click"), i.tab.attr("data-initialized", "true"))
        }
    },
    renderBangumiHotspot: function(e, d) {
        var f = d.data.bangumi;
        this._renderFragment(e, f, e.pagesize ? e.pagesize: f.length,
        function(h, g) {
            var i = $('<li><div class="v"><a class="preview" href="' + utils.trimHttp(h.url) + '" target="_blank" title="' + h.title + '"><div class="border"></div><img data-img="' + utils.trimHttp(h.imgurl) + '" alt="' + h.title + '"></a><a href="' + utils.trimHttp(h.url) + '" target="_blank" title="' + h.title + '"><div class="t">' + h.title + '</div><div class="tc" title="' + h.note + '">' + h.note + "</div></a></div></li>");
            h.promote_tag && $("<div>").addClass("pmt-tag").html(h.promote_tag).appendTo(i.find(".preview"));
            h.note || i.find(".t").addClass("expand");
            return i
        })
    },
    renderGameHotspot: function(e, d) {
        d = d.recommend || d;
        var f = d.list;
        this._renderFragment(e, f, e.pagesize ? e.pagesize: f.length,
        function(g, c) {
            return "undefined" == typeof g ? !1 : $('<li><div class="v-item"><a href="/video/av' + g.aid + '/" target="_blank" title="' + g.title + '">' + (!0 === g.badgepay ? '<div class="v-pay-tag">\u4ed8\u8d39\u89c2\u770b</div>': "") + '<div class="medal"></div><div class="original"></div><div class="preview"><img data-img="' + utils.trimHttp(g.pic) + '" alt="' + g.title + '" /><span class="b-tag">' + g.typename + '</span></div><div class="play-icon"></div></a><a href="/video/av' + g.aid + '/" target="_blank" title="' + g.title + '"><div class="t">' + g.title + '</div><div class="i"><span class="i-1"><i class="b-icon b-icon-v-play"></i>' + g.play + '</span><span class="i-2"><i class="b-icon b-icon-v-dm"></i>' + g.video_review + '</span><span class="i-3"><i class="b-icon b-icon-v-author"></i>' + g.author + "</span></div></a></div></li>")
        })
    },
    renderPromote: function(x, w) {
        var v = x.pagesize,
        u = 0,
        s = $("<div />"),
        t = window.BiliCm && window.BiliCm.Base || {};
        this._extVars.promoteList || ($.isArray(w.data) ? (w.data = utils.sortByIndex(w.data), this._extVars.promoteList = w.data.slice()) : this._extVars.promoteList = $.extend(!0, {},
        w.data));
        var r = this._extVars.promoteList,
        q;
        for (q in r) {
            var p = r[q],
            o;
            $.isArray(p) ? (o = Math.floor(Math.random() * p.length), o = p.splice(o, 1)[0], 0 == p.length && (this._extVars.promoteList[q] = w.data[q].slice())) : o = p;
            if ("undefined" != typeof o && r.hasOwnProperty(q) && "object" == typeof o.archive) {
                var p = o.archive && o.archive.duration,
                p = !o.is_ad && p ? '<div class="x"><b class="x2">' + utils.formatDuration(p) + "</b></div>": "",
                j = o.id ? o.id: "",
                i = null;
                o.is_ad_loc ? (i = o.url ? t && $.isFunction(t.getSyncUrl) ? t.getSyncUrl($.extend({},
                o, {
                    url: o.url + "/?tg"
                }), 34) : o.url + "/?tg": "/video/av" + o.archive.aid + "/?tg", i = $('<li><div class="v" data-id="' + j + '" data-loc-id="34"><a class="preview cover-preview" href="' + i + '" data-target-url="' + (o && o.url || "/video/av" + o.archive.aid + "/?tg") + '" target="_blank"><div class="border"></div><img data-img="' + utils.thumbnail(o.litpic || o.archive.pic, 160, 100) + '" alt="' + o.archive.title + '" /><div class="back"><div></div></div><div class="fore"><span></span><div class="bar"><div></div></div></div>' + p + '</a><a href="' + i + '" data-target-url="' + (o && o.url || "") + '" target="_blank" title="' + o.archive.title + '"><div class="t">' + o.name + "</div></a></div></li>").attr(utils.newParseCardProps(o.archive))) : i = $('<li><div class="v" data-id="' + j + '" data-loc-id="34"><a class="preview cover-preview" href="/video/av' + o.archive.aid + '/?tg" target="_blank"><div class="border"></div><img data-img="' + utils.thumbnail(o.litpic || o.archive.pic, 160, 100) + '" alt="' + o.archive.title + '" /><div class="back"><div></div></div><div class="fore"><span></span><div class="bar"><div></div></div></div>' + p + '</a><a href="/video/av' + o.archive.aid + '/?tg" target="_blank" title="' + o.archive.title + '"><div class="t">' + o.name + "</div></a></div></li>").attr(utils.newParseCardProps(o.archive));
                o.is_ad && o.is_ad_loc && $("<div>").addClass("pmt-tag").appendTo(i.find(".preview"));
                t && $.isFunction(t.add) && t.add(i, o);
                i.appendTo(s);
                u++;
                if (u >= v) {
                    break
                }
            }
        }
        x.dataContainer.append(s)
    },
    renderTagPromote: function(z, y) {
        function x(b) {
            b ? i.find(".btn-subscribe").removeClass("unsubscribed").addClass("subscribed").find("span").html("\u53d6\u6d88\u8ba2\u9605").end().hover(function() {
                i.find(".btn-subscribe span").html("\u53d6\u6d88\u8ba2\u9605")
            },
            function() {
                i.find(".btn-subscribe span").html("\u5df2\u8ba2\u9605")
            }) : i.find(".btn-subscribe").removeClass("subscribed").addClass("unsubscribed").off("hover").find("span").html("\u8ba2\u9605")
        }
        function w() {
            var b = i.find(".btn-subscribe").hasClass("subscribed");
            $.ajax({
                url: b ? "//api.bilibili.com/x/tag/subscribe/cancel": "//api.bilibili.com/x/tag/subscribe/add",
                type: "POST",
                context: this,
                data: {
                    jsonp: "jsonp",
                    tag_id: y.tag_id
                },
                xhrFields: {
                    withCredentials: !0
                },
                dataType: "json"
            }).done(function(a) {
                b ? (new MessageBox).show(this, a && !a.code ? "\u53d6\u6d88\u8ba2\u9605\u6210\u529f": "\u53d6\u6d88\u8ba2\u9605\u5931\u8d25") : (new MessageBox).show(this, a && !a.code ? "\u8ba2\u9605\u6210\u529f": "\u8ba2\u9605\u5931\u8d25");
                a && !a.code && x(!b)
            }).fail(function() { (new MessageBox).show(this, b ? "\u53d6\u6d88\u8ba2\u9605\u5931\u8d25": "\u8ba2\u9605\u5931\u8d25")
            })
        }
        if (!y || y.code || y.num) {
            y.list.shuffle();
            var u = y.list.length || z.pagesize,
            v = 0,
            t = $("<div />");
            this._extVars.promoteList || ($.isArray(y.list) ? this._extVars.promoteList = y.list.slice() : this._extVars.promoteList = $.extend(!0, {},
            y.list));
            var s = this._extVars.promoteList,
            r;
            for (r in s) {
                var q = s[r],
                o;
                $.isArray(q) ? (o = Math.floor(Math.random() * q.length), o = q.splice(o, 1)[0], 0 == q.length && (this._extVars.promoteList[r] = y.list[r].slice())) : o = q;
                if ("undefined" != typeof o && s.hasOwnProperty(r) && ($('<li><div class="v"><a class="preview" href="/video/av' + o.aid + '/?tg" target="_blank" title="' + o.title + '"><div class="border"></div><img data-img="' + utils.thumbnail(o.pic, 160, 100) + '" alt="' + o.title + '" /></a><a href="/video/av' + o.aid + '/?tg" target="_blank" title="' + o.title + '"><div class="t">' + o.title + "</div></a></div></li>").attr(utils.parseCardProps(o)).appendTo(t), v++, v >= u)) {
                    break
                }
            }
            var j = 2,
            i = z._parent.find(".b-section-body .b-r .b-body");
            i.html('<div class="r-promote"><a target="_blank" href="' + utils.trimHttp(y.url) + '"><img src="' + utils.trimHttp(y.pic) + '"><div class="tag-mask"></div></a><div class="t"><span>\u5df2\u6709<span class="subscribe-number">--</span>\u4eba\u8ba2\u9605\u8be5\u6807\u7b7e</span><span class="btn-subscribe"><i class="b-icon"></i><span><span></span></div><div>');
            z.head.html('<div class="left"><span class="b-head-t"><h2>' + y.name + '</h2></span></div><div class="read-push"><span class="icon-refresh"></span><span class="info">\u6362\u4e00\u6279</span></div>');
            z.head.find(".read-push").click(function() {
                for (var l = $("<div />"), k = z.pagesize, h = y.list.length, b, a = k * (j - 1); a < k * j; a++) {
                    b = y.list[a] || y.list[a - h],
                    b = $('<li><div class="v"><a class="preview" href="/video/av' + b.aid + '/?tg" target="_blank" title="' + b.title + '"><div class="border"></div><img data-img="' + utils.thumbnail(b.pic, 160, 100) + '" alt="' + b.title + '" /></a><a href="/video/av' + b.aid + '/?tg" target="_blank" title="' + b.title + '"><div class="t">' + b.title + "</div></a></div></li>").attr(utils.parseCardProps(b)),
                    bindPOCoins2(b),
                    b.appendTo(l)
                }
                j++*k >= h && (j = 2);
                z.dataContainer.html(l);
                lazyImage.lazy(z.wrapper)
            });
            z.dataContainer.append(t.html());
            $.ajax({
                url: "//api.bilibili.com/x/tag/info",
                data: {
                    tag_id: y.tag_id,
                    jsonp: "jsonp"
                },
                xhrFields: {
                    withCredentials: !0
                },
                dataType: "json"
            }).done(function(b) {
                b && !b.code && b.data ? (x(b.data.is_atten), b.data.count && i.find(".subscribe-number").html(b.data.count.atten || "--")) : x(!1)
            }).fail(function() {
                x(!1)
            }).always(function() {
                i.find(".btn-subscribe").click(w)
            })
        } else {
            $(z._parent).hide()
        }
    }
};
var ModuleManage = {
    pageModules: [],
    lazyQueue: [],
    pageBlocks: {},
    delayTimer: null,
    load: function(x, w) {
        var v = this,
        u = {},
        s = {},
        t = [];
        if ("undefined" != typeof w && "undefined" != typeof w.nav) {
            var r = w.nav,
            t = r.seq
        }
        for (var q in x) {
            var p = x[q],
            o = q;
            if ("undefined" != typeof w) {
                for (var j in w) {
                    p[j] = w[j]
                }
            }
            u[o] = s[o] = this.create(o, p)
        }
        t && t.length && this.sort(u, t, !0);
        "undefined" != typeof r && r.setPosition();
        var i = this.pageModules.push(u) - 1;
        this.lazyQueue.push(s);
        this.lazy(s, i, r);
        $(window).on("scroll.lazyPage_" + i,
        function() {
            v.lazy(s, i, r)
        });
        return u
    },
    create: function(e, d) {
        d = d || {};
        d.name = d.name || e;
        var f = d.create ? d.create: new CreateArea(d);
        f.init();
        return this.pageBlocks[e] = f
    },
    sort: function(f, e, h) {
        var g;
        if (f && e && 0 < e.length) {
            for (g = 0; g < e.length; g++) {
                0 < g && (f[e[g]] && f[e[g]].area) && f[e[g]].area.insertAfter(f[e[g - 1]].area)
            }
        } ! 0 !== h && $(window).trigger("onNavigatorChange")
    },
    lazy: function(g, e, j) {
        var i = this,
        h = arguments;
        setTimeout(function() {
            if ("undefined" == typeof j || 1 != j.scrolling || $(window).scrollTop() + $(window).height() == $(document).height() || 0 == $(window).scrollTop()) {
                if (1 >= h.length) {
                    for (var a = 0; a < i.lazyQueue.length; a++) {
                        i._lazy(i.lazyQueue[a], a)
                    }
                    for (a = 0; a < i.pageModules.length; a++) {
                        $.each(i.pageModules[a],
                        function(d, c) {
                            i._inSight(c) && lazyImage.lazy(c.area)
                        })
                    }
                } else {
                    i._lazy(g, e)
                }
            }
        },
        1)
    },
    _lazy: function(f, e) {
        var h = this;
        if (f) {
            var g = 0;
            $.each(f,
            function(a, c) {
                h._inSight(c) && !c.complete ? (c.create ? c.create(c.params.dataSource) : c.load(c.params.panes), delete f[a]) : c.complete && delete f[a];
                g++
            });
            0 == g && (f = null, this.lazyQueue[e] = null, $(window).off("scroll.lazyPage_" + e))
        }
    },
    _inSight: function(d) {
        var c = $(window).height() / 2;
        return $(window).scrollTop() + c >= d.area.offset().top - $(window).height() && $(window).scrollTop() - c <= d.area.offset().top + d.area.height()
    }
};
function createBanner(g) {
    g = parseInt(g);
    var e = {
        1 : 52,
        13 : 106,
        3 : 58,
        129 : 64,
        4 : 70,
        36 : 76,
        5 : 82,
        160 : 88,
        119 : 100,
        155 : 94,
        11 : 118,
        23 : 112,
        166 : 1466
    },
    j = {
        parent: ".container-top .b-topic",
        wrapper: $('<div class="topic-preview-wrapper"><div class="topic-preview-list-wrapper"><ul class="topic-preview"></ul></div><div class="s-bottom notitle"></div></div>'),
        item: 11 == g || 23 == g ? '<li><a target="_blank"><img /></a></li>': function(m, l) {
            var b = $('<li data-id="' + (m.id ? m.id: "") + '" data-loc-id="' + e[g] + '"><a target="_blank"><img /></a></li>'),
            a = window.BiliCm && window.BiliCm.Base || {};
            $("img", b).attr("src", utils.trimHttp(LoadWebp.setSrc(m.pic)));
            m.is_ad_loc ? $("a", b).attr({
                href: m.url ? a && $.isFunction(a.getSyncUrl) ? a.getSyncUrl(m, e[g]) : m.url: "javascript:void(0);",
                "data-target-url": m.url || ""
            }) : $("a", b).attr("href", m.url);
            m.show = 0 == l ? !0 : !1;
            m.focus = !0;
            m.trigger = function() {};
            this.dataLoop.push(m);
            a && $.isFunction(a.add) && a.add(b, m);
            return b
        },
        dataLoop: [],
        bar: $('<ul id="topic_slider" class="slider-bar"></ul>'),
        barContainer: ".s-bottom",
        barItem: "<li></li>",
        onLoad: function(a) {
            if (11 == g || 23 == g) {
                return a.list
            }
            a.data = utils.sortByIndex(a.data);
            return a.data
        },
        dataSrc: function() {
            return 11 == g || 23 == g ? "/index/slideshow/" + g + ".json": "//api.bilibili.com/x/web-show/res/loc?callback=?&jsonp=jsonp&pf=0&id=" + e[g]
        }
    };
    0 > $.inArray(g, []) && merge(j, {
        wrapper: $('<div class="topic-preview-wrapper"><div class="topic-preview-list-wrapper"><ul class="topic-preview"></ul></div><div class="s-bottom"><div class="title"></div></div></div>'),
        renderCallback: function(o, n, m) {
            var b = n.id ? n.id: "",
            a = null;
            n.is_ad_loc ? (a = window.BiliCm && window.BiliCm.Base || {},
            a = n.url || n.link ? a && $.isFunction(a.getSyncUrl) ? a.getSyncUrl(n, e[g]) : n.url || n.link || "": "javascript:void(0);", a = $('<span  data-id="' + b + '" data-loc-id="' + e[g] + '">' + (n.is_ad ? "<img src='//static.hdslb.com/images/base/ad.png' style='width:32px;height:20px;margin-right:5px;'>": "") + '<a href="' + a + '" data-target-url="' + (n.url || n.link || "") + '" title="' + (n.name || n.title || "") + '" target="_blank">' + (n.name || n.title || "") + "</a></span>")) : a = $('<span  data-id="' + b + '" data-loc-id="' + e[g] + '"><a href="' + utils.trimHttp(n.url || n.link || "") + '" title="' + (n.name || n.title || "") + '" target="_blank">' + (n.name || n.title || "") + "</a></span>");
            a && a.appendTo($(".title", o));
            $("[preview] img", o).eq(m).attr("alt", n.name || n.title || "");
            0 == m && a && a.show()
        },
        slideCallback: function(d, c) {
            $(".title span", d).hide();
            $(".title", d).find("span:eq(" + c + ")").fadeIn(300);
            this.dataLoop.map(function(b) {
                b.show = !1
            });
            this.dataLoop[c].show = !0;
            this.dataLoop[c].trigger()
        },
        dataLoop: []
    });
    if (0 <= $.inArray(g, [13, 11, 23, 166])) {
        merge(j, {
            mode: "hover",
            wrapper: $('<div class="topic-preview-wrapper ex ex-l"><div class="topic-preview-list-wrapper"><ul class="topic-preview"></ul></div><div class="s-bottom-wrapper"><div class="s-bottom"><div class="title"></div></div></div></div>'),
            initCallback: function(d, c) {
                $(".title", d).appendTo(d.find(".s-bottom"));
                $('<li class="current"></li>').appendTo(d.find(".slider-bar"))
            },
            barRenderCallback: function(f, d, k) {
                f = $('<a href="' + utils.trimHttp(d.url || d.link) + '" target="_blank"></a>').appendTo(f);
                $('<img src="' + utils.trimHttp(d.image_sm || d.simg || d.litpic) + '" alt="' + (d.name || d.title || "") + '" />').appendTo(f);
                $("<div>").addClass("mask").appendTo(f)
            },
            slideCallback: function(k, f) {
                $(".title span", k).hide();
                $(".title", k).find("span:eq(" + f + ")").fadeIn(300);
                var m = k.find(".slider-bar"),
                l = 0 == $(".current", m).length ? $('<li class="current"></li>').appendTo(m) : $(".current", m),
                m = m.find("li[bar]:eq(" + f + ")"),
                m = m.position().left + parseInt(m.css("margin-left")) - parseInt(l.css("border-left-width"));
                l.css("left", m)
            }
        }),
        13 == g && (j.wrapper.removeClass("ex-l").addClass("ex-s"), ModuleManage.load({
            topArea: {
                area: $(".container-top"),
                panes: {
                    list: {
                        bodyClass: ".container-top-sub",
                        dataContainer: '<ul class="top-list sub hotspot"></ul>',
                        dataSource: "/widget/getPromote?typeid=" + g,
                        pagesize: 6,
                        render: "renderBangumiHotspot"
                    }
                }
            }
        }))
    } else {
        var i = "renderTopList",
        h = null;
        4 == g && (i = "renderGameHotspot", h = function(b) {
            $(b).find(".top-list").wrap('<div class="top-list-wrapper"></div>').end().find(".top-list-wrapper").append('<div class="page prev no-select"></div><div class="page next no-select"></div>').hover(function() {
                $(this).find(".page").fadeIn(200)
            },
            function() {
                $(this).find(".page").fadeOut(200)
            }).click(function(c) {
                $(c.target).hasClass("page") && $(this).find("li").eq(3).prevAll().toggle()
            });
            $(".container-top-wrapper").after('<div class="container-row" id="game_promote"><div class="b-l"></div><div class="b-r"></div></div>');
            ModuleManage.load({
                promote: {
                    tid: 4,
                    id: "game_promote",
                    panes: {
                        list: {
                            wrapper: ".b-l",
                            dataSource: "/index/data/promote-4.json",
                            render: function(l, k) {
                                function p() {
                                    for (var d = l.pagesize,
                                    a = k.list.length,
                                    q = "",
                                    c = d * (o - 1); c < d * o; c++) {
                                        n = k.list[c] || k.list[c - a],
                                        q += '<li><div class="v m300"><a href="' + utils.trimHttp(n.url) + '" target="_blank" class="preview cover-preview"><div class="border"></div><img data-img="' + utils.trimHttp(n.img) + '" alt="' + n.title + '"><div class="back"><div></div></div><div class="fore"><span></span><div class="bar"><div></div></div></div></a><a href="' + utils.trimHttp(n.url) + '" title="' + n.title + '" target="_blank"><div class="t">' + n.title + "</div></a></div></li>"
                                    }
                                    o++*d >= a && (o = 1);
                                    return q
                                }
                                var o = 1,
                                n, m = '<div class="b-head"><span class="b-head-t"><h2>' + k.name + '</h2></span><span class="b-subtitle">' + k.subname + '</span><div class="b-refresh"><span class="icon-refresh"></span><span class="info no-select">\u6362\u4e00\u6279</span></div></div><div class="b-body"><ul class="rm-list"></ul></div>';
                                $(l.wrapper).html(m).find(".b-refresh").click(function() {
                                    $(l.wrapper).find("ul.rm-list").html(p());
                                    lazyImage.lazy(l.wrapper)
                                }).trigger("click")
                            },
                            pagesize: 5
                        },
                        ranking: {
                            wrapper: ".b-r",
                            dataSource: "/index/data/c-4-rookie.json",
                            title: '<div class="left"><span class="b-head-t"><h3>\u65b0\u9c9c\u699c</h3></span></div><div class="right"></div>',
                            dataContainer: '<div class="r-list-body"><div class="r-list-wrapper"></div></div>',
                            pagesize: 2,
                            render: function(x, w) {
                                function v(a) {
                                    var c = $(x.wrapper).find(".topic li").height();
                                    a = "undefined" === typeof a ? $(x.wrapper).find(".switcher .on").index() + 1 : a;
                                    a = a > y - 1 ? 0 : a;
                                    $(x.wrapper).find(".topic").animate({
                                        "margin-top": -a * c
                                    });
                                    $(x.wrapper).find(".switcher li").removeClass("on").eq(a).addClass("on");
                                    $(x.wrapper).find(".remark li").fadeOut().eq(a).fadeIn();
                                    $(x.wrapper).attr("data-active", a + 1)
                                }
                                for (var u = "",
                                o = "",
                                n = "",
                                m = "",
                                l = w.rank.list,
                                y = 3 < l.length ? 3 : l.length, z, k = 0; k < l.length; k++) {
                                    o += "<li></li>",
                                    n += '<li class="list-' + (k + 1) + '" title="' + l[k].note + '">' + l[k].note + "</li>",
                                    m += '<li><a target="_blank" title="' + l[k].title + '" href="//www.bilibili.com/video/av' + l[k].aid + '/"><img src="' + utils.trimHttp(l[k].pic) + '"><div class="t-wrapper"><span class="t">' + l[k].title + "</span></div></a></li>"
                                }
                                u += '<div class="b-head"><div class="left"><span class="b-head-t"><h3>\u65b0\u9c9c\u699c</h3></span></div><div class="right"></div></div><div class="b-body"><ul class="switcher">' + o + '</ul><ul class="remark">' + n + '</ul><div class="topic-wrap"><ul class="topic">' + m + "</ul></div></div>";
                                $(x.wrapper).html(u).attr("data-active", 1).find(".switcher li").eq(0).addClass("on").end().end().find(".remark li").eq(0).fadeIn().end().end().find(".switcher").on("click", "li",
                                function(c) {
                                    $(this).hasClass("on") || (clearInterval(z), v($(this).index()), z = setInterval(v, 4000))
                                }).end();
                                z = setInterval(v, 4000)
                            }
                        }
                    }
                }
            })
        });
        ModuleManage.load({
            topArea: {
                area: $(".container-top"),
                panes: {
                    list: {
                        bodyClass: ".container-top-sub",
                        dataContainer: $(".container-top").find(".top-list"),
                        dataSource: "/index/catalogy/" + g + "-recommend.json",
                        pagesize: 8,
                        render: i
                    }
                },
                addFunc: h
            }
        })
    } (new SliderController(j)).init()
}
function CreateCalendar(b) {
    this.cld_data = {};
    this.WEEKDAY = "\u5468\u4e00 \u5468\u4e8c \u5468\u4e09 \u5468\u56db \u5468\u4e94 \u5468\u516d \u5468\u65e5".split(" ");
    this.AREA = [{
        id: 2,
        val: "\u65e5\u5267"
    },
    {
        id: 3,
        val: "\u7f8e\u5267"
    },
    {
        id: 1,
        val: "\u56fd\u4ea7"
    },
    {
        id: 4,
        val: "\u5176\u4ed6"
    }];
    this.target = b;
    this.listClassName = ".cld-new";
    this.loading = 0 < this.target.find(".cld-loading").length ? this.target.find(".cld-loading") : $('<div class="cld-loading">\u6570\u636e\u8f7d\u5165\u4e2d...</div>').appendTo(this.target.find(this.listClassName));
    this.createCldArea()
}
CreateCalendar.prototype = {
    createCldArea: function() {
        var b = this;
        $.getJSON("/index/bangumi.json",
        function(a) {
            b.loading.remove();
            b.initCldData(a);
            b.createCalendar(b.target, b.cld_data)
        })
    },
    initCldData: function(d) {
        for (var c = 0; c < this.AREA.length; c++) {
            this.cld_data[this.AREA[c].id] = []
        }
        for (c = 0; c < d.length; c++) {
            this.cld_data[4 > d[c].areaid ? d[c].areaid: 4].push(d[c])
        }
    },
    createCalendar: function(i, h) {
        for (var n = this,
        m = 0; 7 > m; m++) {
            var k = $('<div class="weekday"><div class="date"><b>' + n.WEEKDAY[m] + '</b></div><div class="content"></div></div>'),
            l = $(".content", k); (m == (new Date).getDay() - 1 || 6 == m && 0 == (new Date).getDay()) && l.addClass("on");
            k.appendTo($(n.listClassName, i))
        }
        var j = $('<div class="c-list no-weekly"></div>');
        $("#new_tab li", i).click(function() {
            var b = $(this);
            if (!b.hasClass("on")) {
                $("#new_tab li", i).removeClass("on");
                b.addClass("on");
                b.is(":last-child") ? b.addClass("last") : b.is(":first-child") && b.addClass("first");
                var a = b.attr("tid");
                0 == b.attr("weekly") ? (j.html("").insertBefore($("#show_more", i)), $(".weekday", i).hide(), n.createCldList(i, h[a], !1)) : ($(".no-weekly", i).html("").remove(), $(".weekday", i).show(), n.createCldList(i, h[a]))
            }
        });
        $('<a class="btn_show_more" id="show_more">\u663e\u793a\u5168\u90e8</a>').appendTo($(n.listClassName, i)).click(function() {
            var a = $(this),
            c = $(n.listClassName, i);
            a.hasClass("active") ? ($(".hidden", c).hide(), n.setListHeight(c), a.removeClass("active"), a.html("\u663e\u793a\u5168\u90e8"), $(window).scrollTop(i.offset().top)) : (n.resetListHeight(c), $(".hidden", c).show(), a.addClass("active"), a.html("\u6536\u8d77\u5217\u8868"))
        });
        n.createCldList(i, h[2])
    },
    createCldList: function(i, h, n) {
        this.resetListHeight(i);
        $(".content", i).html('<ul class="c-list"></ul>');
        if ("undefined" != typeof n && !n) {
            var m = $(".no-weekly", i)
        }
        0 == h.length && "undefined" != typeof m && $('<div class="no-data">\u6ca1\u6709\u66f4\u591a\u4fe1\u606f</div>').appendTo(m);
        for (var k = 0; k < h.length; k++) {
            if ("undefined" == typeof n || n) {
                m = $(".weekday:eq(" + (0 != h[k].weekday ? h[k].weekday - 1 : 6) + ")", i).find(".content")
            }
            var l = $('<li><a class="t" href="' + utils.trimHttp(_makeBangumiUrl(h[k].title)) + '" target="_blank" title="' + h[k].title + '">' + (0 == $(".c-list", m).find("li").length ? '<img src="' + utils.trimHttp(h[k].cover) + '" alt="' + h[k].title + '" />': "") + "<p>" + h[k].title + '</p></a><p class="i">\u66f4\u65b0\u81f3<b>' + h[k].bgmcount + "</b></p></li>"),
            j = $('<a class="sbs-btn">\u8ba2\u9605</a>').appendTo(l);
            5 <= $("li", m).length && l.addClass("hidden");
            l.appendTo($(".c-list", m));
            setSubscribe(j, h[k].spid, "done")
        }
        this.createComplete(i)
    },
    createComplete: function(b) {
        b = b.find(this.listClassName);
        this.setListHeight(b)
    },
    setListHeight: function(b) {
        b.find(".weekday").each(function(a, h) {
            h = $(h);
            if (h.height() < b.height()) {
                var g = h.find(".content"),
                e = g.outerHeight() - g.height();
                g.height(b.height() - b.find(".date").outerHeight() - e)
            }
        })
    },
    resetListHeight: function(b) {
        b.find(".content").css("height", "auto")
    }
};
function createAreaByJSON(i, h) {
    function n(e, d) {
        var f = $('[area="' + e + '"]');
        0 != f.length && (f = m[e] = {
            tid: e,
            area: f,
            MAIN_TIDS: k,
            panes: {}
        },
        "undefined" != typeof l[e] && (f.name = l[e]), createRanking(e, f, d), createNew(e, f, d))
    }
    var m = {},
    k = [],
    l = {
        1 : "douga",
        3 : "music",
        4 : "game",
        5 : "ent",
        11 : "teleplay",
        13 : "bangumi",
        23 : "movie",
        36 : "technology",
        119 : "kichiku",
        129 : "dance",
        160 : "life"
    },
    j;
    for (j in l) {
        k.push(parseInt(j))
    }
    "undefined" == typeof h && (h = [parseInt(i)]);
    0 > $.inArray(i, [13, 23]) && n(parseInt(i));
    for (j = 0; j < h.length; j++) {
        n(h[j], parseInt(i))
    }
    createPromote(i);
    ModuleManage.load(m)
}
function merge(e, d) {
    for (var f in d) {
        e[f] = d[f]
    }
    return e
}
function createRanking(z, y, x) {
    var w = [15, 83, 34, 86, 33, 32, 128, 82, 145, 146, 147, 153, 51, 152],
    u = [],
    v = [22, 26, 126, 127, 31, 30, 59, 29, 28, 54, 130],
    t = [33, 32, 37, 40, 83, 85, 82, 145, 146, 147, 152, 153, 156],
    s = [17, 65, 136, 19, 121],
    r = [20, 129, 76, 122, 136],
    q = [145, 146, 147, 82, 83, 85],
    o = [17, 65, 136, 19, 121, 31, 30, 59, 29, 28, 54, 130],
    j = [156];
    if (0 > $.inArray(z, [])) {
        var i = y.area.find(".rlist").attr("data-slider", "true");
        y.panes.ranking = {
            wrapper: ".b-r",
            dataContainer: 0 < i.length ? i: '<ul class="rlist"></ul>',
            render: "renderSubRanking",
            pagesize: 10
        };
        0 <= $.inArray(z, y.MAIN_TIDS) && (y.panes.ranking.pagesize = 5);
        0 <= $.inArray(z, j) && (y.panes.ranking.pagesize = 6);
        0 <= $.inArray(z, w) ? y.panes.ranking.type = "hot": (y.panes.ranking.tab = CreateArea.createRankingTab({
            selected: 0 <= $.inArray(z, r) ? 1 : 0
        }), y.panes.ranking.tabTarget = ".b-head .left", y.panes.ranking.tabChange = "tabChange");
        0 > $.inArray(z, u) ? (x = {
            wrapper: '<div class="right"></div>',
            selected: 0 <= $.inArray(z, t.concat(s)) || 155 == x ? 1 : 0
        },
        0 <= $.inArray(z, q) && (x.month = !0), 0 <= $.inArray(z, o) && (x.oneDay = !0), 0 <= $.inArray(z, v) && (x.disableWeek = !0), y.panes.ranking.selector = CreateArea.createRankingSelect(z, x), y.panes.ranking.selectorTarget = ".b-head", y.panes.ranking.selectChange = "selectChange") : y.panes.ranking.dataSource = "/index/catalogy/" + z + "-3day.json";
        32 == z && (y.panes.ranking.pagesize = 8, y.panes.ranking.selectorTarget = ".b-head.ranking");
        127 == z && (y.panes.ranking = {
            readmore: !1
        })
    }
    return y
}
function createNew(f, e, h) {
    var g = {
        17 : "game-video-1.html#!tag=",
        19 : "game-mugen-1.html#!tag=",
        65 : "game-ctary-network-1.html#!tag=",
        121 : "gmv-1.html#!tag=",
        136 : "music-game-1.html#!tag="
    };
    e.panes.newv = {
        wrapper: ".b-l",
        dataContainer: e.area.find(".v-list"),
        render: "renderNewSubList",
        pagesize: 15,
        tabTarget: ".b-head .b-head-l",
        jsonp: "jsonp",
        tabChange: function(d) {
            var c = d.tab.find("li.on");
            "undefined" != typeof c.attr("loaded") && "undefined" == typeof d._super.data[c.attr("data-source")] && (d._super.data[c.attr("data-source")] = d.dataContainer.clone());
            d._super.tabChange(d)
        },
        push: !0,
        onInitComplete: function(a) {
            4 == h && $.ajax({
                url: "//api.bilibili.com/x/tag/hots",
                dataType: "jsonp",
                data: {
                    rid: f,
                    type: 0,
                    jsonp: "jsonp"
                },
                success: function(j) {
                    var i = "";
                    j = j && j.data && j.data[0] && j.data[0].tags;
                    for (var d = g[f], i = "", b = 0; b < j.length; b++) {
                        i += '<li><a target="_blank" href="/video/' + d + encodeURI(j[b].tag_name) + "&tagid=" + j[b].tag_id + '&page=1"><i class="b-icon"></i>' + j[b].tag_name + "</a></li>"
                    }
                    $(a.wrapper).find(".b-head-l").after('<div class="b-sub-tag-container"><ul>' + i + "</ul></div>")
                }
            })
        },
        tab: '<ul class="b-slt-tab"><li class="on" data-source="//api.bilibili.com/typedynamic/region?rid=' + f + '&pn=0&ps=15&type=jsonp">\u6709\u65b0\u52a8\u6001</li><li type="newv" data-source="//api.bilibili.com/archive_rank/getarchiverankbypartion?pn=1&tid=' + f + '&type=jsonp" >\u6700\u65b0\u6295\u7a3f</li></ul>'
    };
    37 == f && (e.panes.newv.pagesize = 20, e.panes.newv.tab = '<ul class="b-slt-tab"><li class="on" data-source="//api.bilibili.com/typedynamic/region?rid=37&pn=0&ps=20&type=jsonp">\u6709\u65b0\u52a8\u6001</li><li type="newv" data-source="//api.bilibili.com/archive_rank/getarchiverankbypartion?pn=1&tid=37&type=jsonp" >\u6700\u65b0\u6295\u7a3f</li></ul>', e.panes.newv.dataContainer.addClass("long").css("margin-bottom", "50px"), $.ajax({
        url: "//bangumi.bilibili.com/jsonp/static/99.ver",
        type: "get",
        dataType: "jsonp",
        jsonpCallback: "bangumiDocumentaryRecommend",
        data: {
            type: "jsonp"
        },
        success: function(b) {
            var d = b && b.result && b.result[0] || {};
            b = '<div id="bangumiDocumentaryRecommend"><div class="title">\u7279\u522b\u63a8\u8350</div><a href="' + d.link + '" target="_blank"><img src="' + utils.trimHttp(d.img) + '"/></a></div>';
            d.link && d.img && e.panes.ranking.wrapper.before(b);
            $("#bangumiDocumentaryRecommend a").click(function() {
                window.rec_rp && rec_rp("event", "web_documentary_recommend_click", {
                    title: d.title,
                    url: d.link
                })
            })
        }
    }));
    32 == f && (e.panes.newv.pagesize = 20);
    0 <= $.inArray(f, e.MAIN_TIDS) && (e.panes.newv.pagesize = 10, e.panes.newv.readmore = !1);
    return e
}
function createPromote(j) {
    var i = {},
    p = {
        videoList: {},
        spList: {
            dataContainer: ".r-list-pmt",
            render: "renderEndedBangumiPromote"
        },
        picList: {
            bodyClass: ".b-r:eq(0)",
            render: "renderAds",
            renderComplete: function(b) {}
        },
        bangumiList: {
            dataSource: "/api_proxy?app=bangumi&action=get_season_by_tag&page=1",
            dataContainer: ".r-list-pmt",
            render: "renderBangumiPromote"
        },
        bangumiIndexBanner: {
            wrapper: ".b-r.bangumi",
            dataSource: "/index/slideshow/41.json",
            dataContainer: '<div class="bangumi-pmt-slider"></div>',
            render: "renderBangumiPromoteSlider"
        },
        bangumiIndexList: {
            wrapper: ".b-r.bangumi",
            dataSource: "/api_proxy?app=bangumi&action=get_season_by_tag&page=1",
            data: {
                tag_id: 101,
                pagesize: 4
            },
            dataContainer: '<div class="bangumi-pmt-list"></div>',
            pagesize: 4,
            render: "renderBangumiIndexPromote"
        },
        linkList: {
            wrapper: ".b-l:eq(0)",
            bodyClass: ".b-head",
            render: "renderLinkList",
            dataContainer: '<div class="pmt-list pmt-inline"></div>',
            pagesize: 1,
            renderComplete: function(b) {}
        }
    },
    o = {
        0 : [5, 5.1, 16],
        13 : [5.2],
        119 : [17]
    },
    p = {
        5 : {
            area: $("#b_bangumi"),
            params: p.bangumiIndexBanner
        },
        "5.1": {
            area: $("#b_bangumi"),
            params: p.bangumiIndexList
        },
        "5.2": {
            area: $(".container-row[area=32]"),
            params: p.bangumiList,
            customParams: {
                wrapper: ".b-r",
                dataContainer: $(".container-row[area=32]").find(".r-list-pmt.simple"),
                data: {
                    tag_id: 102,
                    pagesize: 2
                },
                pagesize: 2
            }
        },
        16 : {
            area: $("#b_recommend"),
            params: $.extend({},
            p.picList, {
                dataSource: "//api.bilibili.com/x/web-show/res/loc?callback=?&jsonp=jsonp&pf=0&id=31",
                render: "renderNewAds"
            }),
            customParams: {
                dataContainer: '<div class="r-promote multi"></div>'
            }
        },
        17 : {
            area: $(".container-row[area=127]"),
            params: $.extend({},
            p.picList, {
                dataSource: "//api.bilibili.com/x/web-show/res/loc?callback=?&jsonp=jsonp&pf=0&id=148",
                render: "renderBlankableAds"
            }),
            customParams: {
                dataContainer: '<div class="r-promote kichiku"></div>'
            }
        }
    };
    "undefined" == typeof j && (j = 0);
    if ("undefined" != typeof o[j]) {
        for (var m = 0; m < o[j].length; m++) {
            var n = o[j][m],
            l = p[n];
            if (l && 0 != l.area.length) {
                var k = i["promote_" + j + "_" + n] = {
                    area: l.area,
                    panes: {}
                },
                n = k.panes["pane_" + j + "_" + n] = {
                    dataSource: "/index/promote/" + parseInt(n) + ".json",
                    "data-loc-id": n
                };
                merge(n, l.params);
                "undefined" != typeof l.customParams && merge(n, l.customParams);
                0 < k.area.find($(n.dataContainer)).length && (n.dataContainer = k.area.find(n.dataContainer))
            }
        }
    }
    ModuleManage.load(i)
}
function loadRecentBangumi() {
    0 != $("#list_bangumi_new").length && $.getJSON("/api_proxy?app=bangumi&action=timeline_v2",
    function(g) {
        var e = $("#list_bangumi_new > .bgmbox > ul");
        e.empty();
        g = g.list || g;
        for (var j = 0,
        i = 0; i < g.length; i++) {
            var h = 0 > parseInt(g[i].bgmcount) ? "\u5c1a\u672a\u66f4\u65b0": "\u66f4\u65b0\u81f3<span>" + g[i].bgmcount + (parseInt(g[i].bgmcount) ? "\u8bdd": "") + "</span>",
            h = $('<li data-seasonid="' + g[i].season_id + '"><div class="c-item"><a class="preview" href="' + utils.trimHttp(g[i].url) + '" target="_blank" title="' + g[i].title + '"><img data-img="' + utils.trimHttp(g[i].square_cover) + '" alt="' + g[i].title + '" /></a><div class="r-i"><p class="t"><a href="' + utils.trimHttp(g[i].url) + '" target="_blank" title="' + g[i].title + '">' + g[i].title + '</a></p><p class="num">' + h + "</p></div></div></li>").appendTo(e);
            g[i]["new"] && h.addClass("new");
            0 == j && (j = h.outerHeight())
        }
        lazyImage.lazy(e);
        12 < g.length && (g = $('<div class="b-toggle-block bgmbox-bottom"><div class="b-toggle-btn" id="btn_bgm_show_more"><span>\u5168\u90e8</span><i class="b-icon b-icon-toggle-down"></i></div></div>').appendTo("#list_bangumi_new > .bgmbox"), $("#btn_bgm_show_more", g).click(function() {
            $(this).hasClass("active") ? ($(this).removeClass("active").html('<span>\u5168\u90e8</span><i class="b-icon b-icon-toggle-down"></i>'), e.removeClass("c-list-expand"), $(window).scrollTop($("#list_bangumi_new").offset().top - 50)) : ($(this).addClass("active").html('<span>\u6536\u8d77</span><i class="b-icon b-icon-toggle-up"></i>'), e.addClass("c-list-expand"))
        }))
    })
}
var Hotspot = function() {
    var i, h, n, m = 0,
    k = 0,
    l = 0,
    j = [160, 5];
    return {
        load: function(a) {
            i = $("#hotspot_" + a).length ? $("#hotspot_" + a) : $('<div class="container-row hotspot" id="hotspot_' + a + '"><div class="b-l"><div class="b-head"><span class="b-head-i"></span><span class="b-head-t"><h2>\u524d\u65b9\u9ad8\u80fd</h2></span></div><div class="b-body"><ul class="v-list"><div class="b-loading"></div></ul></div></div><div class="b-r"><div class="b-head"><div class="left"><span class="b-head-t">\u8fd1\u671f\u70ed\u95e8</span></div></div><div class="b-body"><ul class="news-list"></ul></div></div></div>').insertAfter(".container-top-wrapper");
            0 > $.inArray(a, j) && (i.find(".b-l .b-head-t h2").text("\u70ed\u95e8\u63a8\u5e7f"), i.find(".b-r .b-head-t").text("\u7279\u522b\u63a8\u8350"));
            h = i.find(".v-list");
            n = i.find(".news-list");
            $.getJSON("/widget/getPromote?typeid=" + a,
            function(d) {
                h.empty();
                if (200 == d.state && d.data) {
                    for (var c in d.data.bangumi) {
                        var b = d.data.bangumi[c],
                        f = $('<li><div class="v"><a class="preview cover-preview" href="' + utils.trimHttp(b.url) + '" target="_blank"><div class="border"></div><img data-img="' + utils.trimHttp(b.imgurl) + '" alt="' + b.title + '"><div class="back"><div></div></div><div class="fore"><span></span><div class="bar"><div></div></div></div></a><a href="' + utils.trimHttp(b.url) + '" target="_blank" title="' + b.title + '"><div class="t">' + b.title + '</div><div class="tc" title="' + b.note + '">' + b.note + "</div></a></div></li>");
                        b.promote_tag && $("<div>").addClass("pmt-tag").html(b.promote_tag).appendTo(f.find(".preview"));
                        b.note || f.find(".t").addClass("expand");
                        h.append(f);
                        m++
                    }
                    if (d.data.info) {
                        for (var e in d.data.info) {
                            c = d.data.info[e],
                            3 <= k || (b = $('<li><div class="r-item"><a href="' + utils.trimHttp(c.url) + '" target="_blank" title="' + c.title + '"><p class="t">' + c.title + "</p></a></div></li>"), 0 == k ? (b.prepend('<div class="preview"><a href="' + utils.trimHttp(c.url) + '" target="_blank" title="' + c.title + '"><img data-img="' + utils.trimHttp(c.imgurl) + '" alt="' + c.title + '" /></a></div>').addClass("on"), b.find(">.r-item .t").after('<div class="tc" title="' + c.note + '">' + c.note + "</div>")) : b.find(">.r-item>a").prepend('<span class="news-type">' + c.promote_tag + "</span>"), n.append(b), k++)
                        }
                    } else {
                        d.data.imgPromote && (d = d.data.imgPromote, !d.length || 1 <= l || (d = d[0], d = $('<div class="post-item"><a href="' + utils.trimHttp(d.url) + '" target="_blank"><img data-img="' + utils.trimHttp(d.imgurl) + '" src="//static.hdslb.com/images/transparent.gif" /></a></div>'), n.hide(), i.find(".b-r .b-body").append(d), l++))
                    }
                    lazyImage.lazy(i)
                } else {
                    h.append('<div class="b-loading b-load-fail"><span>\u52a0\u8f7d\u5931\u8d25</span></div>')
                }
            }).error(function() {
                h.empty().append('<div class="b-loading b-load-fail"><span>\u52a0\u8f7d\u5931\u8d25</span></div>')
            })
        }
    }
} ();
function createHotSpot(b) {
    b = parseInt(b);
    0 <= $.inArray(b, [11, 23, 160, 5]) && Hotspot.load(b)
}
Date.prototype.toYMD = function() {
    var e, d, f;
    e = String(this.getFullYear());
    d = String(this.getMonth() + 1);
    1 == d.length && (d = "0" + d);
    f = String(this.getDate());
    1 == f.length && (f = "0" + f);
    return e + "-" + d + "-" + f
};
function imod_box_get3d_date() {
    var b = new Date;
    b.setTime(b.getTime() - 604800000);
    return b.toYMD() + "," + (new Date).toYMD()
}
function typeDescription() {
    var b = null;
    $(".fcname .n_num li").on("mouseenter",
    function() {
        var a = $(this);
        if (a.attr("desc")) {
            clearTimeout(b);
            $(".type-desc").stop(!0, !0).remove();
            var n = $(".type-desc").length,
            m = $(".type-desc").is(":visible"),
            k = $(".fcname .n_num"),
            l = n ? $(".type-desc") : $('<div class="type-desc"><div class="type-arrow"></div><div class="txt"></div></div>'),
            n = l.find(".type-arrow"),
            j = a.offset().left - k.offset().left + a.outerWidth() / 2,
            i = "50% 0%";
            l.appendTo(k).stop().show().find(".txt").html(a.attr("desc"));
            a = 0 > j - l.outerWidth() / 2 ? 0 : j - l.outerWidth(!0) / 2;
            0 == a ? (n.css({
                left: j - n.outerWidth() / 2
            }), i = 100 * ((j - n.outerWidth() / 2) / l.outerWidth()) + "% 0%") : n.css({
                left: l.outerWidth() / 2 - n.outerWidth() / 2
            });
            l.attr("style", "transform-origin:" + i + ";-webkit-transform-origin:" + i + ";left:" + a + "px;");
            m ? l.addClass("in") : setTimeout(function() {
                l.addClass("in")
            },
            0)
        }
    });
    $(".fcname .n_num li").on("mouseleave",
    function() {
        $(this);
        clearTimeout(b);
        b = setTimeout(function() {
            $(".type-desc").stop(!0, !0).fadeOut(200,
            function() {
                $(".type-desc").removeClass("in")
            })
        },
        300)
    });
    $(".fcname .n_num").on("mouseenter", ".type-desc",
    function() {
        clearTimeout(b)
    });
    $(".fcname .n_num").on("mouseleave", ".type-desc",
    function() {
        clearTimeout(b);
        b = setTimeout(function() {
            $(".type-desc").stop(!0, !0).fadeOut(200,
            function() {
                $(".type-desc").removeClass("in")
            })
        },
        300)
    })
}
$(function() {
    "undefined" != typeof tid ? (fixImg($(".vidbox.v-list.sub img")), 13 == tid && loadRecentBangumi(), createHotSpot(tid), 0 < $(".container-top.sub").length && createBanner(tid), "undefined" == typeof sub_tids ? createAreaByJSON(tid) : (typeDescription(), createAreaByJSON(tid, sub_tids))) : createPromote(0)
});
$(document).ready(function() {
    CoverPreview().bind();
    $(window).on("onNavigatorChange",
    function() {
        $(".container-row").not("#b_tag_promote").eq(1).after($("#b_tag_promote"))
    }).trigger("onNavigatorChange");
    var b = location.pathname;
    "/" !== b && "/index.html" !== b || loadWordLink()
});
window.tid && 166 == tid && $(document).ready(function() {
    $(".list-custom-wrp .b-page-small .mobile-link-l").before('<div class="t-166-qa"><a href="//www.bilibili.com/topic/1449.html" target="_blank" ><img src="//static.hdslb.com/images/ad-Q&A.jpg"></a></div>')
});
function loadWordLink() {
    var e = {
        1554 : {
            area: $("#b_douga")
        },
        1556 : {
            area: $("#b_bangumi")
        },
        1558 : {
            area: $("#b_music")
        },
        1560 : {
            area: $("#b_dance")
        },
        1562 : {
            area: $("#b_game")
        },
        1624 : {
            area: $("#b_technology")
        },
        1570 : {
            area: $("#b_ent")
        },
        1566 : {
            area: $("#b_kichiku")
        },
        1572 : {
            area: $("#b_movie")
        },
        1574 : {
            area: $("#b_teleplay")
        },
        1568 : {
            area: $("#b_fashion")
        },
        1550 : {
            area: $("#b_promote"),
            isPromote: !0
        },
        1564 : {
            area: $("#b_life")
        },
        1636 : {
            area: $("#b_ad")
        }
    },
    d = [],
    f;
    for (f in e) {
        d.push(f)
    }
    d = d.join(",");
    $.ajax({
        url: "//api.bilibili.com/x/web-show/res/locs",
        data: {
            pf: 0,
            ids: d,
            jsonp: "jsonp"
        },
        dataType: "jsonp",
        success: function(a) {
            var l, k = a.data,
            j;
            for (j in e) {
                if (e.hasOwnProperty(j)) {
                    a = e[j].area;
                    $(".b-l .b-head:eq(0)", a).append('<div class="pmt-list ' + (e[j].isPromote ? '">': "pmt-inline\"><i class='pmt-icon'/>") + "</div>");
                    for (var i in k[j]) {
                        k[j].hasOwnProperty(i) && (l = k[j], $(".b-l .b-head .pmt-list", a).append("<div class='pmt-link'><a href=\"" + utils.trimHttp(l[i].url) + '" target="_blank" data-loc-id="' + j + '">' + l[i].name + "<a/></div>"))
                    }
                }
            }
        }
    })
};
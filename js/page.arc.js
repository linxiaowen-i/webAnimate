location.hash && 0 <= location.hash.indexOf("page=") && (location.href = "index_" + location.hash.match(/page=([\d]*)/)[1] + ".html" + location.hash);
function __updateLoginSta(a) {
    document.getElementById("_userlogin").innerHTML = a
}
var VideoPart = {
    nodedata: [],
    tempParts: null,
    listId: "#alist, #plist",
    collapse: function(t) {
        var u = document.getElementById("dedepagetitles"),
        s = this.nodedata,
        r = this,
        q = 0,
        o,
        p = 0;
        t = t || window.pageno;
        null == u ? u = this.tempParts: this.tempParts = u;
        if (u) {
            for (o = 0; o < u.length; o++) {
                s[q++] = [$(u.options[o]).html(), $(u.options[o]).val()]
            }
            u = $(this.listId).empty().removeClass().addClass("plist-content");
            t = parseInt(t) || 1;
            var n = 0,
            m, j;
            for (o = 3 < q ? t - 2 : 0; o < t + 5 && !(void 0 !== s[o] && (j = o == t - 1 ? $('<span class="curPage">' + s[o][0] + "</span>\n") : $('<a href="' + utils.trimHttp(s[o][1]) + '">' + s[o][0] + "</a>\n"), m = r.caculate(j), m > n && (n = m), u.append(j), p++, p >= this._getCol(n))); o++) {}
            if (q > p) {
                $('<a class="v-part-toggle">\u5c55\u5f00</a>').appendTo(u).on("click",
                function() {
                    r.expand(t)
                })
            }
            u.addClass("p-c" + p);
            this._bindTitle(u.children().not(".v-part-toggle, .p-close"));
            this.copyright()
        }
    },
    expand: function(f) {
        var g = $(this.listId),
        k = this.nodedata,
        j = this;
        g.addClass("open").empty();
        for (i = 0; i < k.length; i++) {
            i == f - 1 ? g.append('<span class="curPage">' + k[i][0] + "</span>\n") : g.append('<a href="' + utils.trimHttp(k[i][1]) + '">' + k[i][0] + "</a>\n")
        }
        this.setView($(this.listId));
        g.height();
        var h = $('<div class="p-close">\u6536\u8d77</div>').appendTo(g).on("click",
        function() {
            $(window).off("scroll.p-close");
            j.collapse(f);
            g.offset().top < $(window).scrollTop() && $(window).scrollTop($(".viewbox").offset().top)
        });
        $(window).on("scroll.p-close",
        function() {
            if (20 > g.offset().top - $(window).scrollTop()) {
                var a = $(window).scrollTop() - g.offset().top + 20;
                a < g.outerHeight() - h.outerHeight() - 20 ? h.css("top", a) : h.css("top", g.height() - h.outerHeight() - 20)
            } else {
                h.css("top", 0)
            }
        })
    },
    setView: function(e) {
        var f = $(this.listId);
        f.width();
        var h = this,
        g = 0;
        e = e.children().not(".v-part-toggle, .p-close");
        e.each(function(d, c) {
            var j = $(c),
            j = h.caculate(j);
            j > g && (g = j)
        });
        f.removeClass("p-c3, p-c4, p-c5, p-c6, p-c7").addClass("p-c" + this._getCol(g));
        this._bindTitle(e)
    },
    _bindTitle: function(c) {
        var d = this;
        c.hover(function() {
            var a = $(this);
            if (! (a.outerWidth() >= d.caculate(a))) {
                var e = $('<div class="p-float-txt"></div>');
                e.html(a.text());
                e.appendTo("body");
                e.css({
                    top: a.offset().top - e.outerHeight() - 8,
                    left: a.offset().left
                });
                e.animate({
                    top: "+=5",
                    opacity: 1
                })
            }
        },
        function() {
            $(".p-float-txt").remove()
        })
    },
    _getCol: function(a) {
        return 255 <= a ? 3 : 200 <= a ? 4 : 163 <= a ? 5 : 137 <= a ? 6 : 7
    },
    caculate: function(c) {
        c = $("<div>").html(c.html()).css({
            position: "absolute",
            top: 0,
            left: 0,
            "line-height": c.css("line-height"),
            visibility: "hidden",
            "white-space": "nowrap",
            "padding-left": c.css("padding-left"),
            "padding-right": c.css("padding-right"),
            border: "1px solid transparent"
        }).appendTo("body");
        $(this.listId).width();
        var d;
        d = c.outerWidth();
        c.remove();
        return d
    },
    copyright: function() {
        function j() {
            $(k.children()[0]).remove();
            k.children().each(function(e, d) {
                d = $(d);
                var f = d.html();
                d.html(f.replace(/.*\u3001/, ""))
            });
            k.find(".curPage").prependTo(k)
        }
        var k = $(this.listId),
        q = this.nodedata,
        p = JSON.parse(ChatGetSettings("cp_bangumi_record"));
        null == p && (p = {});
        var o = $("#bofqi"),
        m = !1,
        n = o.html().match(/\[\[(.*)\]\]/) || $(k.children()[0]).html().match(/\[\[(.*)\]\]/);
        if (null != n && "undefined" != typeof n[1] && "copyright" == n[1] || "undefined" != typeof p[aid]) {
            m = !0
        }
        if (m) {
            if (k.delegate("a", "click",
            function() {
                if (!$(this).attr("id")) {
                    var d = p[aid],
                    c;
                    d: {
                        c = $(this);
                        for (var f = 0; f < q.length; f++) {
                            if (c.attr("href") == q[f][1]) {
                                c = f;
                                break d
                            }
                        }
                        c = void 0
                    }
                    d.p = c + 1;
                    ChatSaveSettings("cp_bangumi_record", JSON.stringify(p))
                }
            }), 1 < q.length && (0 > location.href.indexOf("index_") || 0 <= location.href.indexOf("index_1"))) {
                if (o.hide(), o.html(), o.empty(), k.hide(), "undefined" != typeof p[aid]) {
                    location.href = "/video/av" + aid + "/index_" + p[aid].p + ".html"
                } else {
                    p[aid] = {};
                    o = $('<div class="player-placeholder"><div class="btn-wrapper"><div class="player-placeholder-head">\u8bf7\u9009\u62e9\u89c6\u9891\u6e90</div></div></div>').insertAfter(o).find(".btn-wrapper");
                    m = 5 < q.length ? 4 : q.length - 1;
                    for (n = 0; n < m; n++) {
                        2 == m ? o.addClass("n2") : 3 == m ? o.addClass("n3") : 4 <= m && o.addClass("n4");
                        var l = $('<div class="src-btn"><a href="' + q[n + 1][1] + '">' + q[n + 1][0].replace(/.*\u3001/, "") + "</a></div>").appendTo(o); (function(b) {
                            l.click(function() {
                                p[aid].p = b + 2;
                                ChatSaveSettings("cp_bangumi_record", JSON.stringify(p))
                            })
                        })(n)
                    }
                    j()
                }
            } else {
                1 < q.length && 0 <= location.href.indexOf("index_") && (3 < q.length && this.expand(), j())
            }
        }
    }
},
js_viewallalist = utils.bindFn(VideoPart.collapse, VideoPart),
kwtags = function() {};
function callSpecPart(e, f) {
    var h = VideoPart.nodedata;
    if (e && totalpage && null != h && 0 < e) {
        if (e <= totalpage && e <= h.length && (void 0 == top.allowSwitchPart || top.allowSwitchPart)) {
            if ("undefined" != typeof f && f) {
                window.location.hash = "#page=" + e;
                VideoPart.collapse(e);
                var h = $("#qr_code"),
                g = location.href.match(/.*av[\d]*/) + "/index_" + e + ".html";
                h.empty().qrcode($.extend(h.data("qrcode"), {
                    text: g
                }));
                lrurl(window.aid, e, g)
            } else {
                window.location = h[e - 1][1]
            }
        } else {
            void 0 != window.parent.callNextSpec && window.parent.callNextSpec()
        }
    }
}
function callNextPart(a) {
    window.pageno++;
    callSpecPart(parseInt(window.pageno), a)
}
function lrurl(d, e, f) {
    d = d || window.aid;
    e = e || window.pageno;
    f = f || window.location.href;
    $("#link1").val("//static.hdslb.com/miniloader.swf?aid=" + d + "&page=" + e);
    $("#link2").val('<embed height="415" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="//static.hdslb.com/miniloader.swf" flashvars="aid=' + d + "&page=" + e + '" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>');
    $("#link0").val(f);
    d = $("#btn_weixin .qr-code");
    d.empty().qrcode($.extend(d.data("qrcode"), {
        text: f
    }));
    f = $("#plist .curPage");
    f.length ? $("#qr_description").html(f.html()) : $("#qr_description").html("")
}
function copy_clip(e) {
    if (window.clipboardData) {
        window.clipboardData.setData("Text", e)
    } else {
        if (window.netscape) {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            var f = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
            if (!f) {
                return
            }
            var h = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
            if (!h) {
                return
            }
            h.addDataFlavor("text/unicode");
            var g = {},
            g = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
            g.data = e;
            h.setTransferData("text/unicode", g, 2 * e.length);
            if (!f) {
                return ! 1
            }
            f.setData(h, null, Components.interfaces.nsIClipboard.kGlobalClipboard)
        }
    }
    return ! 1
}
function showVideoInfo(a) {
    $(a).find("img").attr("src", utils.trimHttp($(a).find("img").attr("_src")));
    $(a).find("img").css("top", $(a).position().top + 18);
    $(a).find("img").css("left", 630 < $(a).position().left ? 630 : $(a).position().left);
    $(a).find("img").css("position", "absolute");
    $(a).find("img").css("display", "block")
}
function hideVideoInfo(a) {
    $(a).find("img").hide()
}
function player_fullwin(e) { ! 1 == e && $("#bofqi").removeClass("wide");
    if (!1 != e || null !== ff_embed_stack) {
        if (null === ff_embed_stack) {
            ff_embed_stack = [];
            ff_embed_stack_style = [];
            var f = $("#bofqi").get(0);
            do {
                $(f).attr("embed_stack", !0), ff_embed_stack.push(f)
            } while ( f = f . parentNode )
        }
        e ? ($(".rklist").hide(), $("#bofqi").addClass("webfullscreen")) : ($(".rklist").show(), $("#bofqi").removeClass("webfullscreen"));
        var f = $("div").not("#bofqi div"),
        h;
        for (h in f) {
            if (f[h] && f[h].getAttribute && !f[h].getAttribute("embed_stack") && f[h] && f[h].style) {
                var g;
                f[h].getAttribute("ff_id") ? g = ff_status[f[h].getAttribute("ff_id")] : (ff_status_id++, f[h].setAttribute("ff_id", ff_status_id), ff_status[ff_status_id] = f[h].style.display);
                f[h].style.display = e ? "none": g
            }
        }
        for (h in ff_embed_stack) { (f = ff_embed_stack[h]) && f.style && (ff_embed_stack_style[h] || (ff_embed_stack_style[h] = {
                position: f.style.position,
                width: f.style.width,
                height: f.style.height,
                padding: f.style.padding,
                margin: f.style.margin,
                style: f.style.cssText
            }), e ? (f.style.position = "fixed", f.style.width = "100%", f.style.height = "100%", f.style.padding = "0 0", f.style.margin = "0 0") : f.style.cssText = ff_embed_stack_style[h].style)
        }
        e || (ff_embed_stack = null)
    }
}
var ff_status = {},
ff_status_id = 0,
ff_embed_stack = null,
ff_embed_stack_style = null;
function player_widewin() {
    $("#bofqi").removeClass("webfullscreen");
    $("#bofqi").addClass("wide")
}
function loadco() {
    clearInterval(int_fblogin);
    "undefined" != typeof AjaxPage && AjaxPage(1)
}
function flv_checkLogin() {
    return void 0 !== GetCookie("DedeUserID") && GetCookie("DedeUserID") ? !0 : !1
}
function checkBrowser() {
    $.browser.mozilla || $("#browser_tips").length || (tips_str = '<div class="ui-widget" id="browser_tips" style="margin:0px;">   <div class="ui-state-highlight ui-corner-all" style="padding: 0 .7em;">            <ul id="icons" class="ui-widget ui-helper-clearfix" style="width:19px;float:right">               <li class="ui-state-default ui-corner-all" style="cursor:pointer;" onclick="$(\'#browser_tips\').toggle( \'fold\', {}, 500 );"><span class="ui-icon ui-icon-closethick"></span></li>            </ul>       <p id="browser_tips_msg"><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;margin-top:.1em;"></span></p>   </div></div>', $.browser.webkit && navigator.userAgent.match(/(chrome)[ \/]([\w.]+)/i))
}
var autofresh_interval = null;
function init_autofresh(c, d) {
    autofresh_interval = setInterval(function() {
        var a = document.createElement("script");
        a.src = "/plus/count.php?papa=yes&reload=" + Math.random() + "&aid=" + c + "&mid=" + d;
        a.type = "text/javascript";
        a.language = "javascript";
        document.body.appendChild(a)
    },
    30000)
}
function heimu(c, d) {
    $("#heimu");
    0 == d ? ($("#heimu").hide(), $("#bofqi").removeClass("heimu")) : ($("#bofqi").addClass("heimu"), $("#heimu").css("opacity", "." + c / 10), $("#heimu").css("filter", "alpha(opacity=" + c + ")"), $("#heimu").show())
}
function flashChecker() {
    var e, f = !1,
    h = 0;
    if (navigator.plugins && 0 < navigator.plugins.length && (e = navigator.plugins["Shockwave Flash"])) {
        f = !0;
        e = e.description.split(" ");
        for (var g = 0; g < e.length; ++g) {
            isNaN(parseInt(e[g])) || (h = parseInt(e[g]))
        }
    }
    return {
        hasFlash: f,
        flashVersion: h
    }
}
function loadHTML5(f, g) {
    var k = null != navigator.userAgent.match(/iPad/i) || null != navigator.userAgent.match(/iPhone/i) || null != navigator.userAgent.match(/iPod/i),
    j = null != navigator.userAgent.match(/Android/i);
    if (!flashChecker().hasFlash && (k || j)) {
        var h = 1 == Number(g) ? "": "#page=" + g; ! /iPad/.test(navigator.userAgent) && "#html5" != location.hash || "YESYESYES" == ChatGetSettings("bilibililover") ? __GetCookie("nmr") && "0" != __GetCookie("nmr") || window.location.replace("/mobile/video/av" + f + ".html" + h) : $.getJSON("/m/html5?aid=" + f + "&page=" + g + "&sid=" + __GetCookie("sid"),
        function(b) {
            "undefined" == typeof b.src ? window.location.replace("//m.acg.tv/video/av" + f + ".html" + h) : (window.html5data = b, $("#bofqi").html('<link type="text/css" href="//static.hdslb.com/css/simple.v2.min.css" rel="stylesheet" />'), $.getScript("//static.hdslb.com/js/simple.v2.min.js",
            function() { (new BiliH5Player).create({
                    get_from_local: !0,
                    comment: window.html5data.cid,
                    image: utils.trimHttp(window.html5data.img),
                    video_url: utils.trimHttp(window.html5data.src)
                })
            }), $("#bofqi").prepend('<div class="main-inner"><div class="app-banner"><div class="app-banner-left"><div class="app-banner-title">\u4e0abilibili\u5ba2\u6237\u7aef</div><div class="app-banner-content">\u9ad8\u6e05\u52a8\u753b \u79bb\u7ebf\u89c2\u770b \u5e94\u6709\u5c3d\u6709</div></div><div class="app-banner-right"><a class="app-open-btn">\u7528\u5ba2\u6237\u7aef\u6253\u5f00</a><a class="app-dl-btn">\u7acb\u5373\u4e0b\u8f7d</a></div></div></div>'), $(".app-banner .app-open-btn").bindApplink({
                aid: f
            }), getDownloadUrl($(".app-banner .app-dl-btn")))
        })
    }
}
function bindRIAttent() {
    $(".r-info > .f").click(function() {
        attentionTrigger(!0)
    })
}
function bindRIUnattent() {
    var a = $(".r-info > .f");
    a.hover(function() {
        a.text("\u53d6\u6d88\u5173\u6ce8").addClass("hover")
    },
    function() {
        a.text("\u5df2\u5173\u6ce8").removeClass("hover")
    });
    a.click(function() {
        $(this);
        attentionTrigger(!1)
    })
}
function attentionTrigger(d) {
    var e = $(".r-info > .f"),
    f = $(".r-info > .elec");
    d ? attentionUser(e, parseInt(e.attr("mid")),
    function(a) {
        e.animate({
            opacity: 0
        },
        {
            duration: 300,
            complete: function() {
                e.text("\u5df2\u5173\u6ce8").css({
                    border: "1px solid #e5e9ef",
                    backgroundColor: "#fff",
                    color: "#99a2aa"
                }).hover(function() {
                    $(this).css({
                        backgroundColor: "#fff",
                        border: "1px solid #e5e9ef"
                    })
                },
                function() {
                    $(this).css({
                        backgroundColor: "#fff",
                        border: "1px solid #e5e9ef"
                    })
                });
                e.animate({
                    opacity: 1
                },
                {
                    duration: 300,
                    complete: function() {
                        e.delay(300).animate({
                            width: "68px"
                        },
                        {
                            duration: 300
                        });
                        f.delay(300).animate({
                            width: "138px"
                        },
                        {
                            duration: 300,
                            complete: function() {
                                f.text("\u4e3aTA\u5145\u7535").addClass("animate")
                            }
                        })
                    }
                });
                bindRIUnattent()
            }
        }).off("click")
    }) : unattentionUser(e, parseInt(e.attr("mid")),
    function(a) {
        e.animate({
            opacity: 0
        },
        {
            duration: 300,
            complete: function() {
                e.text("\u5173\u6ce8").css({
                    backgroundColor: "#00a1d6",
                    border: "1px solid #00a1d6",
                    color: "#fff"
                }).hover(function() {
                    $(this).css({
                        backgroundColor: "#00b5e5",
                        border: "1px solid #00b5e5"
                    })
                },
                function() {
                    $(this).css({
                        backgroundColor: "#00a1d6",
                        border: "1px solid #00a1d6"
                    })
                });
                e.animate({
                    opacity: 1
                },
                {
                    duration: 300,
                    complete: function() {
                        e.delay(300).animate({
                            width: "138px"
                        },
                        {
                            duration: 300,
                            complete: function() {
                                e.removeClass("animate on hover")
                            }
                        });
                        f.delay(300).animate({
                            width: "68px"
                        },
                        {
                            duration: 300,
                            complete: function() {
                                f.text("\u5145\u7535").removeClass("animate on hover")
                            }
                        })
                    }
                });
                bindRIAttent()
            }
        }).off("click").off("hover")
    })
}
function getAuthorInfo() {
    var e, f = parseInt(window.mid),
    h,
    g = !1;
    0 <= $.inArray(f, window.AttentionList) && (g = !0);
    $(".upinfo").length ? (e = $(".upinfo"), h = $(".name", e).text(), e = utils.trimHttp($(".u-face img", e).attr("src"))) : ($upinfo = $(".zu_play_info"), h = $(".upload_user a", e).attr("card"), e = utils.trimHttp($(".upload_user img", e).attr("src")));
    return {
        mid: f,
        uname: h,
        face: e,
        attention: g
    }
}
var loader = new LazyJSONLoader,
bbBangumiSp = function(h, j, o, n, m, k) {
    var l = this;
    this.$container = $(".v_bgm_list");
    this._aId = parseInt(h);
    this._page = parseInt(m);
    this._spId = parseInt(j);
    this._seasonId = parseInt(o);
    this._rawcode = n;
    this._apiBase = "//app.bilibili.com/bangumi";
    this._dataCache = {};
    this._isbangumi = parseInt(k);
    1 === this._isbangumi ? (this.loadBangumi(h), window.seasonJsonCallback = function(e) {
        $(".v_bgm_list").show();
        if (0 == e.code) {
            l._seasonId = e.result.season_id;
            l._seasonData = e.result.seasons;
            var d = l.sortEp(e.result.episodes);
            l._dataCache[l._apiBase + "/seasoninfo/" + e.result.season_id + ".ver"] = d;
            l.$container.find(".bangumi-head a").text(e.result.title).attr("href", "//bangumi.bilibili.com/anime/" + e.result.season_id + "/");
            l.$container.attr("data-seasonid", e.result.season_id);
            l.$container.find("#subscribe_num").text(formatFriendlyNumber(e.result.favorites));
            if (e.result.evaluate) {
                var f = $("#bangumi_info");
                f.find(".info-content[type=description] .info-content-inner").text(e.result.evaluate).css("white-space", "pre-wrap");
                f.find(".info-content[type=staff] .info-content-inner").text(e.result.staff).css("white-space", "pre-wrap");
                f.find(".info-content[type=cv] .info-content-inner").html(function() {
                    for (var a = "",
                    p = 0; p < e.result.actor.length; p++) {
                        var g = e.result.actor[p],
                        a = a + ('<div class="cv-item">' + g.role + "\uff1a" + g.actor + "</div>")
                    }
                    return a
                })
            }
            e.result.cover && (l.$container.find(".preview").wrapInner('<a target="_blank" href="//bangumi.bilibili.com/anime/' + e.result.season_id + '/"></a>'), l.$container.find(".preview img").attr("src", utils.trimHttp(e.result.cover)));
            l.parseEpisodeData(d);
            l.drawSeason();
            UserStatus.onLoaded(function(b) {
                b.isLogin && $.get("/api_proxy?app=bangumi&action=user_season_status&season_id=" + l._seasonId,
                function(c) {
                    0 == c.code && showSpAdbtn(c.result.attention, null, l._seasonId)
                })
            })
        }
    }) : o ? this.loadSeason(j) : this.loadEpisode2();
    $("#v_bgm_list_toggle").click(function() {
        l.toggleList()
    })
};
bbBangumiSp.prototype = {
    _rawcode: null,
    _seasonData: null,
    _episodeData: null,
    _aId: null,
    _page: null,
    _spId: null,
    _seasonId: null,
    _totalPage: 0,
    _maxPerPage: 20,
    _pageLimit: 20,
    _progressReported: !1,
    ajaxJsonp: function(f, g, k, j) {
        var h = this;
        $.ajax({
            url: f,
            data: g,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: k,
            error: j
        }).complete(function() {
            h._loading = !1
        })
    },
    loadBangumi: function(a) {
        this.ajaxJsonp(this._apiBase + "/avseason/" + a + ".ver", {},
        "seasonJsonCallback")
    },
    sortEp: function(d) {
        var e = [],
        f;
        for (f = d.length - 1; 0 <= f; f--) {
            e.push(d[f])
        }
        return e
    },
    loadEpisode: function(d) {
        if (1 !== this._isbangumi) {
            return this.loadEpisode2(d)
        }
        var e = this,
        f = this._apiBase + "/seasoninfo/" + d + ".ver";
        this._dataCache[f] ? this.parseEpisodeData(this._dataCache[f]) : (window.episodeJsonCallback = function(a) {
            0 == a.code && (a = e.sortEp(a.result.episodes), e._dataCache[f] = a, e.parseEpisodeData(a))
        },
        this._loading = !0, this.ajaxJsonp(f, {},
        "episodeJsonCallback"))
    },
    parseEpisodeData: function(a) {
        $(".v_bgm_list").show();
        $("#v_bgm_list_page").hide().html("");
        $("#v_bgm_list_data").removeClass("on");
        $("#v_bgm_list_toggle .autoheight").removeClass("active");
        this._episodeData = a;
        this.drawFull(this.getPageByAid())
    },
    loadSeason: function(c) {
        var d = this;
        loader.getJSON("/index/bangumi/" + c + "-sl.json",
        function(a) {
            a && (d._seasonData = a, d.drawSeason(), d.loadEpisode2(d._seasonId))
        })
    },
    loadEpisode2: function(c) {
        var d = this;
        loader.getJSON(c ? "/index/bangumi/" + this._spId + "-s" + c + ".json": "/index/bangumi/" + this._spId + "-s0.json",
        function(a) {
            $(".v_bgm_list").show();
            $("#v_bgm_list_page").hide().html("");
            $("#v_bgm_list_data").removeClass("on");
            $("#v_bgm_list_toggle .autoheight").removeClass("active");
            d._episodeData = d._normalize(a);
            d.drawFull(d.getPageByAid())
        })
    },
    toggleList: function() {
        var a = $("#v_bgm_list_data");
        a.hasClass("on") ? (this.drawPart(), a.removeClass("on"), $("#v_bgm_list_page").hide(), $("#v_bgm_list_toggle .autoheight").removeClass("active")) : (this.drawFull(this.getPageByAid()), a.addClass("on"), $("#v_bgm_list_toggle .autoheight").addClass("active"))
    },
    getPageByAid: function() {
        var a = 0;
        this._episodeData.length > this._maxPerPage && (a = parseInt(this.episodeByAid(this._aId, this._page) / this._maxPerPage));
        return a
    },
    drawSeason: function(f) {
        this._seasonId = f = f || this._seasonId;
        var h, m = Math.ceil(2.5),
        l,
        k = $("#v_bgm_list_tab");
        $("#v_bgm_list_tab").html("");
        l = this.seasonByAid(f);
        if ((f = this._seasonData.length) && 1 != f) {
            h = 5 >= f ? 0 : Math.max(0, l - m);
            m = 5 >= f ? f - 1 : Math.min(l + m, f - 1);
            for (5 < f && (0 == h ? m = 4 : m == f - 1 && (h = f - 5)); h <= m; h++) {
                if (l = this._seasonData[h]) {
                    l = this.createSeasonItem(k, l),
                    k.append(l)
                }
            }
            if (5 < f) {
                var k = $('<li class="bgm-list-btn"><i class="b-icon b-icon-arrow-d"></i></li>').appendTo(k),
                j = $('<ul class="bgm-list-panel"></li>').hide().appendTo(k);
                k.hover(function() {
                    j.stop(!0, !0).slideDown(200)
                },
                function() {
                    j.stop(!0, !0).slideUp(200)
                });
                for (h = 0; h < f; h++) {
                    if (l = this._seasonData[h]) {
                        l = this.createSeasonItem(j, l,
                        function() {
                            j.stop(!0, !0).slideUp(200)
                        }),
                        j.append(l)
                    }
                }
            }
        }
    },
    drawPart: function() {
        var e = 0,
        f = $("#v_bgm_list_toggle"),
        h = $("#v_bgm_list_data");
        h.html("");
        e = this.episodeByAid(this._aId, this.page);
        this._episodeData.length < this._pageLimit ? f.hide() : f.show(); - 1 == e && (e = this._episodeData.length - 1);
        var f = this._episodeData.length,
        g = this._pageLimit;
        lowerLimit = upperLimit = Math.min(e, f);
        for (e = 0; e < g && e < f;) {
            0 < lowerLimit && (lowerLimit--, e++),
            e < g && upperLimit < f && (upperLimit++, e++)
        }
        for (e = lowerLimit; e < upperLimit; e++) {
            if (f = this._episodeData[e]) {
                if ( - 1 == f.episode || "-1" == f.episode) {
                    f.episode = "\u5168\u96c6"
                }
                h.append(this.createEpItem(e, f))
            }
        }
    },
    drawFull: function(d) {
        var e = 0,
        f = 0;
        if (!d || 0 > d) {
            d = 0
        }
        $("#v_bgm_list_data").html("");
        this._episodeData.length > this._maxPerPage && ($("#v_bgm_list_page").show(), this._totalPage = Math.ceil(this._episodeData.length / this._maxPerPage), this.drawPagination(d));
        f = d * this._maxPerPage;
        if (d <= this._episodeData.length && 0 <= f) {
            for (d = f; d < this._episodeData.length; d++) {
                if (e < this._maxPerPage && (e++, f = this._episodeData[d], "object" === typeof f)) {
                    if ( - 1 == f.episode || "-1" == f.episode) {
                        f.episode = "\u5168\u96c6"
                    }
                    $("#v_bgm_list_data").append(this.createEpItem(d, f))
                }
            }
        }
    },
    createSeasonItem: function(e, f, h) {
        var g = this;
        1 !== this._isbangumi && (f.title = f.season_name);
        e = $("<li data-id='" + f.season_id + "'>" + f.title + "</li>");
        e.click(function() {
            g._loading || ($("#v_bgm_list_tab").find("li").removeClass("on"), $("#v_bgm_list_tab").find('li[data-id="' + $(this).attr("data-id") + '"]').addClass("on"), g.loadEpisode($(this).attr("data-id")), g.drawSeason($(this).attr("data-id")), "function" == typeof h && h())
        });
        this._seasonId == f.season_id && e.addClass("on");
        return e
    },
    createEpItem: function(e, f) {
        var h = this;
        if (1 !== this._isbangumi) {
            return this.createEpItem2(e, f)
        }
        var g = $('<a data-id="' + f.episode_id + '" idx="' + e + '" href="/video/av' + f.av_id + "/" + (1 < parseInt(f.page) ? "index_" + f.page + ".html": "") + '">' + f.index + "</a>");
        if (! (f.av_id != this._aId || parseInt(f.page) && parseInt(f.page) != this._page || (g.addClass("active"), this._progressReported))) {
            UserStatus.onLoaded(function(b) {
                b.isLogin && $.get("/api_proxy?app=bangumi&action=/report_watch", {
                    episode_id: g.attr("data-id")
                },
                function(c) {
                    h._progressReported = !0
                })
            })
        }
        return g
    },
    createEpItem2: function(d, e) {
        var f = $('<a idx="' + d + '" href="/video/av' + e.aid + "/" + (1 < e.page ? "index_" + e.page + ".html": "") + '">' + e.episode + "</a>");
        e.aid == this._aId && e.page == this._page && f.addClass("active");
        return f
    },
    drawPagination: function(f) {
        var h = this,
        m = this._totalPage - 1,
        l = 0,
        k = 0;
        $("#v_bgm_list_page").html("");
        for (var j = 0; j <= m; j++) {
            j == m ? l = $("<a page='" + j + "'>\u7b2c" + this.episodeByIndex(j * this._maxPerPage).val.index + "-" + this.lastEpisode().index + "\u96c6</a>") : (l = this.episodeByIndex(j * this._maxPerPage).val.index, k = this.episodeByIndex(j * this._maxPerPage + (this._maxPerPage - 1)).val.index, l = $("<a page='" + j + "'>\u7b2c" + l + "-" + k + "\u96c6</a>")),
            f == j && l.addClass("active"),
            l.click(function() {
                h.drawFull($(this).attr("page"))
            }),
            $("#v_bgm_list_page").append(l)
        }
    },
    seasonByAid: function(d) {
        var e = 0,
        f;
        for (f in this._seasonData) {
            if (this._seasonData[f].season_id == d) {
                return e
            }
            e++
        }
        return - 1
    },
    episodeByAid: function(e, f) {
        var h = 0,
        g;
        for (g in this._episodeData) {
            if (this._episodeData[g].av_id == e && (parseInt(1 == this._episodeData[g].page) || parseInt(this._episodeData[g].page) == f)) {
                return h
            }
            h++
        }
        return - 1
    },
    episodeByIndex: function(d) {
        var e = 0,
        f;
        for (f in this._episodeData) {
            if (e == d) {
                if ( - 1 == this._episodeData[f].index || "-1" == this._episodeData[f].index) {
                    this._episodeData[f].index = "\u5168\u96c6"
                }
                return {
                    key: f,
                    val: this._episodeData[f]
                }
            }
            e++
        }
        return null
    },
    lastEpisode: function() {
        return this._episodeData[this._episodeData.length - 1]
    },
    _normalize: function(d) {
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            f.index = f.episode;
            f.av_id = f.aid;
            f.page = 0 == f.page ? 1 : f.page
        }
        return d
    }
};
function tracksendLog(c, d) {
    $('<script type="text/javascript" src="https://secure.bilibili.com/tracklog?url=' + encodeURIComponent(c) + "&tp=" + encodeURIComponent(d) + "&refer=" + encodeURIComponent(document.referrer) + '">\x3c/script>').appendTo("body")
}
var trackTime, adCheckInt = null,
isCProTrackSent = !1;
function trackCProLog() {
    tracksendLog(document.location, "b");
    isCProTrackSent = !0
}
function trackCProTimeOver() {
    trackTime = new Date;
    clearTimeout(adCheckInt);
    isCProTrackSent || (adCheckInt = setTimeout(function() {
        clearTimeout(adCheckInt);
        trackCProLog()
    },
    3000))
}
var _ads_bindCount = 0;
function bindAdElement() {
    for (var c = document.getElementsByTagName("iframe"), d = 0; d < c.length; d++) { - 1 < c[d].src.indexOf("www.bilibili.com/bd") && __GetCookie("DedeUserID") && (c[d].onmousedown = trackCProLog, c[d].onmouseover = trackCProTimeOver, c[d].onactivate = trackCProLog, c[d].onclick = trackCProLog, c[d].onfocusin = c[d].onfocus = trackCProLog, c[d].contentWindow.onactivate = c[d].contentWindow.onfocusin = c[d].contentWindow.onfocus = trackCProLog, _ads_bindCount++)
    }
    c = document.getElementsByTagName("div");
    for (d = 0; d < c.length; d++) {
        if ("comm_content" == c[d].id || "viewbox" == c[d].className || "upinfo" == c[d].className || "ad-f" == c[d].className || "bottom" == c[d].className || "tagcontainer" == c[d].className || "scontent" == c[d].className) {
            c[d].onmouseover = function() {
                null == adCheckInt || 50 > (new Date).getTime() - trackTime.getTime() || (clearTimeout(adCheckInt), adCheckInt = null)
            }
        }
    }
    $("body").mouseover(function() {
        null == adCheckInt || 50 > (new Date).getTime() - trackTime.getTime() || (clearTimeout(adCheckInt), adCheckInt = null)
    })
}
function getBasicHighCharts(c, d) {
    c.chart.renderTo = d;
    c.subtitle = {
        text: void 0 === document.ontouchstart ? "Click and drag in the plot area to zoom in": "Drag your finger over the plot to zoom in"
    };
    return c
}
function goQuote() {
    var c = $(".quote"),
    d = c.offset();
    $("html,body").animate({
        scrollTop: d.top - 80
    },
    300);
    c.delay(300);
    for (i = 0; 3 > i; i++) {
        c.animate({
            borderColor: "#00a1d6"
        },
        250),
        c.animate({
            borderColor: "#efefef"
        },
        250)
    }
}
function miniPlayer() {
    var r = $("#bofqi");
    if ((0 < r.find("iframe").length || 0 < r.find("embed").length && 0 <= r.find("embed").attr("src").indexOf("play.swf") || 0 < r.find("#player_placeholder").length) && 0 == $("#sponsor_list").length && $(".v_small").length) {
        var s = r.offset().top + r.height() + 100,
        q = 0,
        p = !1;
        $('<input type="checkbox" id="checkbox_miniplayer" /><label class="no-select" for="checkbox_miniplayer">\u5f00\u542f\u8ff7\u4f60\u64ad\u653e\u5668</label>').appendTo(".common .b-head");
        var o = $("#checkbox_miniplayer"),
        m = null;
        1 != ChatGetSettings("b_miniplayer") && null != ChatGetSettings("b_miniplayer") || o.attr("checked", !0);
        o.change(function() {
            var a = $(this).is(":checked") ? 1 : 0;
            ChatSaveSettings("b_miniplayer", a);
            0 == a ? (p = !0, l()) : (s == r.offset().top + r.height() + 100 || r.hasClass("float") || (s = r.offset().top + r.height() + 100), $(window).scrollTop() > s && (p = !1, n()))
        });
        var n = function() {
            if (!r.hasClass("float") && !p && 0 != $(".comm").find("ul").length) {
                var b = $('<div class="b-player-dummy"></div>').insertBefore(r);
                r.hasClass("wide") && b.addClass("wide");
                $('<div class="move"><div class="gotop">\u56de\u5230\u9876\u90e8</div><div class="t">\u70b9\u51fb\u6309\u4f4f\u62d6\u52a8</div><div class="close">\u5173\u95ed</div></div>').prependTo(r);
                0 < $(".huodong_bg").length && $(".huodong_bg").hide();
                r.addClass("float").stop().animate({
                    opacity: 1
                },
                300);
                m ? r.css(m) : (b = 0 < $(".rat").length ? $(".rat").offset().left: $(".v_small").offset().left, r.css({
                    left: b,
                    opacity: 0
                }), 730 >= $(window).height() && r.css({
                    top: "inherit",
                    bottom: "5px"
                }))
            }
        },
        l = function() {
            j();
            $(".move", r).remove();
            $(".b-player-dummy").remove();
            r.removeClass("float");
            r.css({
                left: "",
                top: "",
                bottom: ""
            });
            0 < $(".huodong_bg").length && $(".huodong_bg").show()
        },
        j = function() {
            q = 0;
            $(".mmask").remove();
            $(document).unbind("mousemove");
            $("body,#bofqi").removeClass("noselect");
            $(".move", r).removeClass("on")
        };
        $(document).on("scroll.miniplayer",
        function() {
            0 != ChatGetSettings("b_miniplayer") && (s == r.offset().top + r.height() + 100 || r.hasClass("float") || (s = r.offset().top + r.height() + 100), $(window).scrollTop() > s ? n() : (p && (p = !1), r.hasClass("float") && l()))
        });
        r.hover(function() {
            r.hasClass("float") && !q && $(".move", r).show()
        },
        function() {
            q || $(".move", r).hide()
        });
        $(r).delegate(".move", "mousedown",
        function(b) {
            q = 1;
            $("body,#bofqi").addClass("noselect");
            $(this).addClass("on");
            $('<div class="mmask"></div>').appendTo("body");
            var f = b.pageX - $(this).offset().left,
            c = b.pageY - $(this).offset().top;
            $(document).bind("mousemove",
            function(d) {
                var g = d.clientX - f,
                e = d.clientY - c <= $(window).height() - r.height() ? d.clientY - c: $(window).height() - r.height(),
                e = d.clientY - c >= $(window).height() - r.height() - 5 ? $(window).height() - r.height() - 5 : 0 >= d.clientY - c ? 0 : d.clientY - c;
                m = {
                    left: g,
                    top: e
                };
                r.css(m)
            })
        });
        $(r).delegate(".move", "mouseup",
        function(b) {
            j()
        });
        $(r).delegate(".move .close", "click",
        function(b) {
            p = !0;
            l()
        });
        $(r).delegate(".move .gotop", "click",
        function(b) {
            $("html,body").animate({
                scrollTop: $(".viewbox").offset().top
            },
            300)
        })
    }
}
function rateFrm(f) {
    function h(d) {
        var c = $(".block.coin").find(">span");
        $(".block.coin").find(".t-right-bottom");
        UserStatus.isLogin(c) && (1 > UserStatus.level() ? (new MessageBox(m)).show(c, "\u7b49\u7ea7\u4e0d\u8db3LV1\uff0c\u65e0\u6cd5\u6295\u786c\u5e01", 1500) : d ? l.show({
            bound: !1,
            Overlap: !0,
            backdrop: !0,
            animation: !1,
            zIndex: 100001
        }).css({
            position: "fixed",
            top: "50%",
            left: "50%",
            marginTop: -150,
            marginLeft: -176
        }) : l.show())
    }
    var m = {
        focusShowPos: "down"
    };
    $(".block.coin").show();
    var l = new sendCoin($(".block.coin"), $(".block.coin").find(".t-right-bottom"), f);
    $(".block.coin").click(function() {
        h()
    });
    GNS.playerCallSendCoin = function() {
        h(!0)
    };
    window.playerCallSendCoin = function() {
        h(!0)
    };
    f = $(".v-title-line.coin_btn");
    var k = f.find("i.b-icon"),
    j = new Animator({
        element: k,
        frameSource: "//static.hdslb.com/images/base/anim-coin-small.png",
        frameWidth: 60,
        frameHeight: 60,
        fps: 24,
        totalFrame: 19
    });
    f.on("mouseenter.anim",
    function() {
        j.start(1)
    }).on("mouseleave.anim",
    function() {
        j.back()
    }).click(function() {
        h(!0)
    })
}
var sendCoin = function(d, e, f) {
    this.$container = d;
    this.target = e;
    this.requestCache = !1
};
sendCoin.prototype = {
    options: {},
    show: function(d) {
        var e = this,
        f = $.extend({
            focusShowPos: "down"
        },
        d || {});
        e.options = d || {};
        e.coinBox = new MessageBox(f);
        d = e.coinBox.show(e.$container, '<div class="coin-panel">\u52a0\u8f7d\u4e2d...</div>', 0, "button",
        function() {
            return e._send()
        });
        e.coinBox.msgbox && (e.msgbox = e.coinBox.msgbox.addClass("m-coin"), "object" == typeof e.requestCache ? e._bindStatus(e.requestCache.number) : $.ajax({
            url: "//www.bilibili.com/plus/account/exp.php",
            type: "get",
            dataType: "json",
            success: function(a) {
                a && 0 == a.code ? (e.requestCache = {
                    number: a.number
                },
                e._bindStatus(a.number)) : e._bindStatus(50)
            },
            error: function() {
                e._bindStatus(50)
            }
        }));
        return d
    },
    _bindStatus: function(j) {
        if (!this.msgbox || !this.msgbox.find(".coin-panel").length) {
            return ! 1
        }
        var k = this;
        k.info = window.biliLoginStatus;
        var q = k.$container.attr("arctype"),
        p = k.info.level_info.current_level;
        k.btn = k.msgbox.find(".b-btn.ok");
        k.coin_num = "Original" == q ? 2 : 1;
        var o = k.msgbox.find(".coin-panel").empty(),
        m = $('<div class="coin-nav"></div>').appendTo(o),
        n = $('<div class="coin-main"></div>').appendTo(o),
        l = 0;
        "Original" == q && m.addClass("coin-nav-less");
        for (o = 0; o < k.coin_num; o++) { (function(b) {
                var a = $('<span class="coin-nav-single">' + (b + 1) + '<span class="coin-nav-text">\u679a</span></span>').data("num", b + 1).appendTo(m);
                k.info.money <= b && a.addClass("disabled").data("errtype", "money");
                1 == b ? "Original" != q && 3 > p ? a.addClass("disabled").data("errtype", "3") : a.hasClass("disabled") || (l = b) : 2 == b ? "Original" != q && 5 > p ? a.addClass("disabled").data("errtype", "5") : "Original" == q && 3 > p ? a.addClass("disabled").data("errtype", "3") : a.hasClass("disabled") || (l = b) : 3 <= b ? "Original" == q && p <= b ? a.addClass("disabled").data("errtype", b + 1) : a.hasClass("disabled") || (l = b) : a.hasClass("disabled") || (l = b);
                a.click(function() {
                    $(this).siblings().removeClass("active");
                    $(this).addClass("active");
                    n.empty();
                    if ($(this).hasClass("disabled")) {
                        if (k.msgbox.find(".b-btn.ok").addClass("disabled"), "money" == $(this).data("errtype")) {
                            n.addClass("coin-error").html('<div class="coin-main-title">\u60a8\u7684\u5269\u4f59\u786c\u5e01\u4e0d\u8db3\u54e6</div><div class="coin-main-sub"><i class="b-icon icon-coin-round"></i>\u4f59\u989d' + k.info.money + '\uff0c<a href="//www.bilibili.com/html/help.html#m_2" target="_blank">\u5982\u4f55\u83b7\u5f97\u786c\u5e01\uff1f</a></div>')
                        } else {
                            if ($(this).data("errtype")) {
                                var d = parseInt($(this).data("errtype")) || 0;
                                n.addClass("coin-error").html('<div class="coin-main-title">\u5347\u5230Lv' + d + '\u5c31\u53ef\u4ee5\u6295\u4e86\u54e6</div><div class="coin-main-sub"><a href="//www.bilibili.com/html/help.html#k" target="_blank">\u4f1a\u5458\u7b49\u7ea7\u76f8\u5173\u8bf4\u660e ></a></div>')
                            }
                        }
                    } else {
                        k.msgbox.find(".b-btn.ok").removeClass("disabled"),
                        k.btn.data("num", $(this).data("num")),
                        d = 10 * parseInt($(this).data("num")) || 0,
                        n.removeClass("coin-error").html('<div class="coin-main-title">\u6295\u5e01\u652f\u6301\uff0c\u5c06\u6d88\u8017\u60a8<span class="coin-main-number">' + $(this).data("num") + "</span>\u786c\u5e01</div>" + (50 > j ? '<div class="coin-main-sub"><i class="b-icon icon-exp-round"></i>\u7ecf\u9a8c\u503c+' + (50 < d + j ? 50 - j: d) + "\uff08\u4eca\u65e5" + j + "/50\uff09</div>": ""))
                    }
                })
            })(o)
        }
        m.children().eq(l).click()
    },
    _send: function() {
        var d = this,
        e = parseInt(d.btn.data("num")) || 0,
        f = {
            zIndex: null,
            focusShowPos: "down"
        };
        d.options.zIndex && (f.zIndex = d.options.zIndex + 1);
        if (d.btn.hasClass("disabled")) {
            return ! 1
        }
        d.btn.addClass("disabled");
        $.ajax({
            url: "/plus/comment.php",
            type: "post",
            data: {
                aid: aid,
                rating: 100,
                player: 1,
                multiply: e
            },
            success: function(u) {
                d.btn.removeClass("disabled");
                d.requestCache = !1;
                if ("OK" == u) {
                    u = 0;
                    for (var t = (window.AttentionList || []).length; u < t; u++) {
                        if (AttentionList[u] == mid) { (new MessageBox(f)).show(d.target, "\u6295\u5e01\u6210\u529f", 1500);
                            _rateComplete(d.target, e);
                            d.coinBox.close();
                            var r;
                            $(".arc-toolbar .elecrank-btn").trigger("mouseenter").on("mouseenter.clearElec",
                            function() {
                                clearTimeout(r);
                                $(this).off("mouseenter.clearElec")
                            });
                            r = setTimeout(function() {
                                $(".arc-toolbar .elecrank-btn").trigger("mouseleave")
                            },
                            5000);
                            return
                        }
                    }
                    d.coinBox.close();
                    var s = $('<div class="m-layer" style="width: 340px; height: 120px; text-align: center;"><div style="padding: 30px 0 15px 0; height: 20px; line-height: 20px; font-size: 16px;">\u6295\u5e01\u6210\u529f</div><div><a class="attention-btn" style="display: inline-block; width: 48px; height: 24px; line-height: 24px; margin-right: 5px; background: #00a1d6; color: #fff; border-radius: 4px;">\u5173\u6ce8</a>UP\u4e3b, \u53ca\u65f6\u4e86\u89e3TA\u7684\u6700\u65b0\u4f5c\u54c1~</div><div style="position: absolute; height: 28px; line-height: 28px; width: 70px; right: 10px; top: 10px; background: #6f6f6f; color: #fff; cursor: pointer; border-radius: 4px; font-size: 12px;" class="close-btn">\u5173\u95ed <span>( </span><span class="attention-count">6</span><span> )</span></div></div>');
                    u = $(".block.coin").offset();
                    var q = 6,
                    o;
                    d.options.backdrop ? s.css({
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        marginLeft: -170,
                        marginTop: -60,
                        zIndex: d.options.zIndex || 20000
                    }) : s.css({
                        left: u.left - 290 + "px",
                        top: u.top
                    });
                    $("body").append(s);
                    var j = s.find(".attention-btn"),
                    a = s.find(".close-btn"),
                    b = s.find(".attention-count");
                    j.on("click.attention",
                    function() {
                        $(".r-info > .f").trigger("click");
                        s.remove()
                    });
                    j.hover(function() {
                        $(this).css("background-color", "#00b5e5")
                    },
                    function() {
                        $(this).css("background-color", "#00a1d6")
                    });
                    var c = function() {
                        q--;
                        0 === q ? (clearTimeout(o), j.off(), s.remove()) : (b.text(q), o = setTimeout(c, 1000))
                    };
                    o = setTimeout(c, 1000);
                    a.hover(function() {
                        $(this).css("background-color", "#888")
                    },
                    function() {
                        $(this).css("background-color", "#6f6f6f")
                    });
                    a.on("click",
                    function() {
                        clearTimeout(o);
                        j.off();
                        a.off();
                        s.remove()
                    })
                } else { (new MessageBox(f)).show(d.btn, u, 1500)
                } (new Animator({
                    element: $(".v-title-line.coin_btn").find("i.b-icon"),
                    frameSource: "//static.hdslb.com/images/base/anim-coin-small.png",
                    frameWidth: 60,
                    frameHeight: 60,
                    offsetY: 60,
                    fps: 24,
                    totalFrame: 40
                })).start()
            },
            error: function() {
                d.btn.removeClass("disabled"); (new MessageBox(f)).show(d.btn, "\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5", 1500)
            }
        });
        return ! 1
    }
};
function _rateComplete(e, f) {
    f = f || 1;
    var h = $('<div class="plus-num">+' + f + "</div>"),
    g = parseInt(e.html()) || 0;
    e.html(g + f);
    h.appendTo(e).animate({
        bottom: "70px"
    },
    300,
    function() {
        h.fadeOut(100,
        function() {
            h.remove()
        })
    })
}
function OnBpRankList(a) {
    onLoginInfoLoaded(function(b) {
        createBpRankList(a)
    })
}
$(document).ready(function() {
    $("#sponsor_list").length && OnBpRankList()
});
function createBpRankList(r) {
    function s(h, f) {
        var v, u = !1;
        0 != h.uid ? v = $('<li class="clearfix"><div class="rank-item"><div class="rank-num">' + f + '</div><a href="//space.bilibili.com/' + h.uid + '" card="' + h.uname + '" target="_blank"><div class="face"><img src="' + utils.thumbnail(h.face, 36) + '" /></div></a></div></li>') : (u = !0, v = $('<li class="clearfix"><div class="rank-item"><div class="rank-num">' + f + '</div><div class="face"><img src="' + utils.trimHttp(h.face) + '" /></div></div></li>'));
        var t = $('<div class="detail"></div>').appendTo(v.find(".rank-item")),
        k = $('<div class="name">' + h.uname + "</div>");
        u || (k = $('<a href="//space.bilibili.com/' + h.uid + '" card="' + h.uname + '" target="_blank"></a>').append(k));
        k.prependTo(t);
        3 >= f && (v.addClass("top n" + f), v.find(".rank-num").addClass("n" + f), h.message ? t.append('<div class="msg">' + h.message + "</div>") : t.append('<div class="msg">TA\u6ca1\u6709\u7559\u8a00</div>'), t.find(".msg").append('<div class="arrow"></div>'));
        return v
    }
    function q(c, g) {
        if (c) {
            o.empty();
            for (var h = !1,
            a = 0; a < c.length; a++) {
                var f = c[a],
                e = s(f, f.rank).appendTo(o);
                f.uid == window.uid && (e.addClass("mine"), h = !0)
            }
            g.mine && !h && (e = s({
                uid: window.uid,
                uname: window.biliLoginStatus.uname,
                face: window.biliLoginStatus.face
            },
            g.mine.rank).addClass("mine").appendTo(o));
            j.empty();
            pagelist(j, l + 1, n, g.list.list.length,
            function(b) {
                l = b - 1;
                q(m[l], g)
            },
            "", 2);
            j.find(".result,.indexPage,.endPage").remove();
            bindCardEvent(o)
        }
    }
    var p = $("#sponsor_list"),
    o = p.find("ul"),
    m = [],
    n = 0,
    l = 0,
    j = $('<div class="pagelistbox small"></div>');
    $.getJSON("/widget/ajaxGetBP?aid=" + window.aid,
    function(h) {
        l = 0;
        var g = $(".bangumi-buybuybuy"),
        e = h.users || 0;
        g.find(".total b").html(e);
        if (h.list && 0 == h.list.code) {
            var f = h.list.list;
            n = Math.ceil(f.length / 10);
            for (var d = f.length,
            c = 0; c < n; c++) {
                for (var w = [], k = 10 * (c + 1) > d ? d: 10 * (c + 1), v = 10 * c; v < k; v++) {
                    w.push(f[v])
                }
                m.push(w)
            }
            10 < h.list.list.length && (p.find(".pagelistbox").length ? j = p.find(".pagelistbox") : j.insertAfter(o));
            q(m[l], h)
        }
        h.mine && (g.addClass("done"), f = window.biliLoginStatus.face, null != f.match("_s") && f.replace("_s", "_m"), g.find(".b-btn.buy").addClass("done").html("\u6211\u627f\u5305\u4e86\u8fd9\u96c6<b>" + h.mine.count + "</b>B\u5e01"));
        p.find(".list-total .total").html(e + "<div>\u627f\u5305\u5546\u4eba\u6570</div>");
        0 == h.list.list.length && o.append('<li class="no-sponsor">\u6682\u65f6\u6ca1\u6709\u627f\u5305\u5546( >\ufe4f<\u3002)\uff5e</li>');
        h = h.percent;
        animateCss = 60 <= h ? "animate green": 40 <= h ? "animate yellow": 20 <= h ? "animate orange": "animate red"
    }).error(function() {
        o.append('<li class="no-sponsor">\u52a0\u8f7d\u5931\u8d25</li>')
    })
}
function createBatteryRankList(r, s) {
    function q(h) {
        j.empty();
        for (var f = 0; f < h.length; f++) {
            var v = h[f],
            u = v.rank,
            t = void 0,
            k = "";
            v.is_anonymity ? (k = "\u533f\u540d\u7528\u6237", t = $('<li class="clearfix"><div class="rank-item"><div class="rank-num">' + u + '</div><div class="face"><img src="//static.hdslb.com/images/hidden.png" /></div></div></li>')) : (k = v.name, t = $('<li mid="' + v.mid + '" class="clearfix"><div class="rank-item"><div class="rank-num">' + u + '</div><a href="//space.bilibili.com/' + v.mid + '" card="' + k + '" target="_blank"><div class="face"><img src="' + utils.trimHttp(v.face) + '" /></div></a></div></li>'));
            $('<div class="name">' + k + "</div>").insertAfter(t.find(".face"));
            3 >= u && t.find(".rank-num").addClass("n n" + u).html("");
            t.attr("rank", u);
            u = t.appendTo(j);
            v.mid == window.uid && u.addClass("mine").find(".rank-num").html("\u6211")
        }
        bindCardEvent(j)
    }
    function p(e) {
        var c, k;
        if (e.code) {
            j.append('<li class="no-data">\u52a0\u8f7d\u5931\u8d25</li>'),
            m.removeClass("loading").append('<div class="error">\u52a0\u8f7d\u5931\u8d25</div>')
        } else {
            if (e.rankList && e.rankList.result) {
                c = e.rankList.result;
                for (var h = 0; h < c.length; h++) {
                    c[h].mid == window.uid && (c[h].face = c[h].face || biliLoginStatus.face, c[h].name = c[h].name || biliLoginStatus.uname)
                }
                k = e.rankList.total_feed_user;
                q(c)
            } else {
                c = [],
                k = 0,
                j.append('<li class="no-data">\u6682\u65f6\u6ca1\u6709\u4eba\u5145\u7535( >\ufe4f<\u3002)\uff5e</li>')
            }
            0 == k ? l.find(".hd-txt").html("UP\u4e3b\u80fd\u91cf\u4e0d\u8db3") : l.find(".hd-txt").html('\u5171 <b class="total-num">' + k + "</b> \u4eba\u63d0\u4f9b\u4e86\u80fd\u91cf");
            var g = setInterval(function() {
                if ("undefined" != typeof EnergyPool) {
                    clearInterval(g);
                    m.removeClass("loading").empty();
                    var b = "undefined" != typeof document.createElement("canvas").getContext("2d") ? "canvas": "div"; (new EnergyPool("#energy_pool_container", {
                        uid: window.uid,
                        mode: b,
                        width: 270,
                        height: 118,
                        data: c,
                        total: k,
                        create: function(d) {
                            o.find(".pipe").css("background-color", d.colorLevel.pool);
                            l.css("background-color", d.colorLevel.pool);
                            l.find("#rank_btn_feed").addClass(d.colorLevel.level).css("background-color", d.colorLevel.btn)
                        }
                    })).init()
                }
            },
            100)
        }
    }
    var o = $(".energy-pool"),
    m = null;
    0 == o.length ? (o = $('<div class="energy-pool"><div class="pool-hd"><div class="up-face"><a href="//space.bilibili.com/' + s.uid + '" target="_blank"><img src="' + utils.trimHttp(s.face) + '" /></a></div><span class="t">' + s.nick + '\u7684\u80fd\u91cf\u6c60</span></div><div id="energy_pool_container"></div><div class="pipe"></div></div>').appendTo(".v_small"), $('<script type="text/javascript" src="//static.hdslb.com/battery/js/energy.js">\x3c/script>').appendTo("head"), m = $("#energy_pool_container").addClass("loading")) : m = $("#energy_pool_container").addClass("loading").empty();
    var n = $("#battery_ranking").empty();
    0 == n.length && (n = $("<div>").addClass("battery-ranking").attr("id", "battery_ranking").appendTo(".v_small"));
    var l = $('<div class="list-head"><span class="hd-ico"></span><span class="hd-txt"></span><div id="rank_btn_feed" class="bangumi-btn">\u6211\u6765\u63d0\u4f9b\u80fd\u91cf</div></div>').appendTo(n),
    n = $("<div>").addClass("list-wrp clearfix").appendTo(n),
    j = $("<ul>").appendTo(n);
    "object" != typeof r ? $.ajax({
        url: "//prop.bilibili.com/api/electric/query.rank.list",
        data: {
            mid: window.uid,
            aid: s.aid,
            top: 10,
            captcha: window.captcha_key
        },
        dataType: "json",
        type: "POST",
        xhrFields: {
            withCredentials: !0
        },
        success: function(a) {
            p(a);
            a.code || (window.fb = new bbFeedbackPlugIn(".bp_comment", a, s), fb.show(s.aid, 1))
        },
        error: function() {
            j.append('<li class="no-data">\u52a0\u8f7d\u5931\u8d25</li>');
            m.removeClass("loading").append('<div class="error">\u52a0\u8f7d\u5931\u8d25</div>')
        }
    }) : p(r)
}
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
                    frameSource: "//static.hdslb.com/images/base/anim-" + a.name + ".png",
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
        0 < s.length && (w = $("#qr_code"), u = {
            width: 100,
            height: 100,
            typeNumber: -1,
            correctLevel: 0,
            background: "#fff",
            foreground: "#000",
            text: location.href
        },
        "undefined" != typeof document.createElement("canvas").getContext ? u.render = "canvas": u.render = "table", w.empty().qrcode(u).data("qrcode", u), x.addClass("initialized").hover(function() {
            clearTimeout(t);
            t = setTimeout(function() {
                s.stop(!0, !0).slideDown(200)
            },
            300)
        },
        function() {
            clearTimeout(t);
            s.stop(!0, !0).slideUp(200)
        }));
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
        } else {
            var m = $(".share-box", r);
            r.hover(function() {
                clearTimeout(t);
                t = setTimeout(function() {
                    m.stop(!0, !0).slideDown(200,
                    function() {
                        $(this).hasClass("copyinit") || ($(this).addClass("copyinit"), $(".address-copy").each(function(d, c) {
                            $(c).click(function() {
                                ShareModule.addShare()
                            });
                            $(c).zclip({
                                path: "//static.hdslb.com/swf/ZeroClipboard.swf",
                                copy: function() {
                                    return $(c).prev().val()
                                },
                                afterCopy: function() { (new MessageBox).show($(c), "\u5df2\u6210\u529f\u590d\u5236\u5230\u526a\u5207\u677f", 1000)
                                }
                            });
                            $(c).bind("mouseleave",
                            function(b) {
                                b.stopPropagation()
                            })
                        }))
                    })
                },
                300)
            },
            function() {
                clearTimeout(t);
                m.stop(!0, !0).slideUp(200)
            })
        }
        onLoginInfoLoaded(function(b) {
            rateFrm(b)
        });
        "undefined" != typeof wb_url && bindShare({
            url: wb_url,
            title: wb_info && $(".v-title h1").text(),
            desc: "undefined" != typeof wb_desc ? wb_desc: "",
            summary: "undefined" != typeof wb_summary ? wb_summary: "",
            shortTitle: "undefined" != typeof wb_title ? wb_title: wb_info,
            weiboTag: "#\u54d4\u54e9\u54d4\u54e9\u52a8\u753b#"
        })
    }
}
var ShareModule = {
    shared: !1,
    openShareWindow: function(e, f) {
        var h = [],
        g;
        for (g in f) {
            null != f[g] && h.push(g + "=" + encodeURIComponent(f[g]))
        }
        h = e + h.join("&");
        window.open(h, "", "width=760, height=640, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no");
        return ! 1
    },
    bind: function(f, g) {
        var k = this;
        g = g || "#share_list .share-btn,.share-btn-bar .g-share-btn";
        f = $.extend(!0, {
            title: document.title,
            url: location.href,
            desc: "",
            pic: "",
            summary: "",
            shortTitle: "",
            searchPic: !1,
            appkey: {
                weibo: "2841902482",
                qqweibo: "84435a83a11c484881aba8548c6e7340"
            },
            weiboTag: "",
            twitterTag: "",
            aid: window.aid,
            tp_id: window.tp_id
        },
        f);
        $(g).click(function(b) {
            var m = $(this),
            l = m.attr("id") || m.attr("data-id");
            if ("btn_weixin" != l) {
                k.addShare(f)
            } else {
                if (!m.attr("id")) {
                    b.stopPropagation();
                    var c = m.find(".share-weixin");
                    c.length || (c = $('<div class="share-weixin"><div class="qr-code"></div><p>\u7528\u5fae\u4fe1\u626b\u4e00\u626b</p></div>').appendTo(m).hide(), b = {
                        width: 100,
                        height: 100,
                        typeNumber: -1,
                        correctLevel: 0,
                        background: "#fff",
                        foreground: "#000",
                        text: location.href
                    },
                    "undefined" != typeof document.createElement("canvas").getContext ? b.render = "canvas": b.render = "table", c.find(".qr-code").qrcode(b));
                    c.is(":visible") ? c.stop(!1, !0).slideUp(200) : c.stop(!1, !0).slideDown(200);
                    $("body").off("click.v-weixin-share");
                    $("body").on("click.v-weixin-share",
                    function() {
                        c.stop(!1, !0).slideUp(200);
                        $("body").off("click.v-weixin-share")
                    })
                }
            }
            switch (l) {
            case "btn_weibo":
                k.openShareWindow("http://service.weibo.com/share/share.php?", {
                    url: f.url,
                    type: "3",
                    count: "1",
                    appkey: f.appkey.weibo,
                    title: f.title + f.weiboTag,
                    pic: f.pic,
                    searchPic: f.searchPic,
                    ralateUid: "",
                    language: "zh_cn",
                    rnd: (new Date).valueOf()
                });
                rec_rp("event", "arc_share_weibo");
                break;
            case "btn_qqweibo":
                k.openShareWindow("http://v.t.qq.com/share/share.php?", {
                    title: f.title,
                    url: f.url,
                    appkey: f.appkey.qqweibo,
                    site: "//www.bilibili.com/",
                    assname: "bilibiliweb",
                    pic: f.pic
                });
                break;
            case "btn_qqzone":
                k.openShareWindow("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?", {
                    url: f.url,
                    showcount: 1,
                    desc: f.desc,
                    summary: f.summary,
                    title: f.shortTitle,
                    site: "\u54d4\u54e9\u54d4\u54e9",
                    pics: f.pic,
                    style: "203",
                    width: 98,
                    height: 22
                });
                rec_rp("event", "arc_share_qqzone");
                break;
            case "btn_baidu":
                k.openShareWindow("http://tieba.baidu.com/f/commit/share/openShareApi?", {
                    title: f.title,
                    url: f.url,
                    uid: 726865,
                    to: "tieba",
                    type: "text",
                    relateUid: "",
                    pic: f.pic,
                    key: "",
                    sign: "on",
                    desc: "",
                    comment: f.desc
                });
                rec_rp("event", "arc_share_baidu");
                break;
            case "btn_twitter":
                k.openShareWindow("https://twitter.com/intent/tweet?", {
                    text: f.desc || f.title,
                    hashtags: f.twitterTag,
                    url: f.url
                });
                break;
            case "btn_facebook":
                k.openShareWindow("https://www.facebook.com/share.php?", {
                    src: "",
                    u: f.url
                });
                break;
            case "btn_qq":
                k.openShareWindow("http://connect.qq.com/widget/shareqq/index.html?", {
                    url: f.url,
                    desc: f.desc,
                    title: f.title,
                    summary: f.summary,
                    pics: f.pic,
                    flash: "",
                    site: "",
                    style: "201",
                    width: 32,
                    height: 32
                }),
                rec_rp("event", "arc_share_qq")
            }
        });
        var j = $('<div class="share-weixin"><div class="qr-code"></div></div>').appendTo($("#btn_weixin")),
        h = {
            width: 150,
            height: 150,
            typeNumber: -1,
            correctLevel: 0,
            background: "#fff",
            foreground: "#000",
            text: location.href
        };
        utils.isBeta([2]) && (h.width = h.height = 110, $("#share_list").find(".share-right .share-head").html("\u5fae\u4fe1\u626b\u4e00\u626b\u5206\u4eab"), j.find(".qr-code").css("height", "110px"));
        "undefined" != typeof document.createElement("canvas").getContext ? h.render = "canvas": h.render = "table";
        $.fn.qrcode ? j.find(".qr-code").qrcode(h).data("qrcode", h) : RequireModule.getScript("js/jquery.qrcode.min.js",
        function() {
            j.find(".qr-code").qrcode(h).data("qrcode", h)
        });
        $(".address-copy").click(function() {
            copy_clip($(this).prev().val()); (new MessageBox).show($(this), "\u5df2\u6210\u529f\u590d\u5236\u5230\u526a\u5207\u677f")
        });
        return {
            getParams: function(b) {
                return f[b]
            },
            setParams: function(b, d) {
                f.hasOwnProperty(b) && (f[b] = d)
            }
        }
    },
    app: {
        defaultParams: {
            type: "image",
            url: location.href,
            title: document.title,
            image_url: "",
            text: ""
        },
        shareDataStr: null,
        set: function(a) {
            a = $.extend(!0, this.defaultParams, a);
            a = JSON.stringify(a);
            window.biliios ? window.biliios.setShareContext(a) : window.biliandroid && window.biliandroid.setShareContext ? window.biliandroid.setShareContext(a) : window.biliandroid && window.biliandroid.setShareContent && window.biliandroid.setShareContent(a);
            return this.shareDataStr = a
        },
        show: function() {
            window.biliios ? window.biliios.showShareWindow(this.shareDataStr || JSON.stringify(this.defaultParams)) : window.biliandroid && window.biliandroid.showShareWindow(this.shareDataStr || JSON.stringify(this.defaultParams))
        }
    },
    addShare: function(d) {
        var e = this;
        d = $.extend(!0, {
            aid: window.aid,
            tp_id: window.tp_id
        },
        d);
        if (!e.shared && (d.aid || d.tp_id)) {
            var f;
            if (d.aid) {
                f = 0,
                d = d.aid
            } else {
                if (d.tp_id) {
                    f = 3,
                    d = d.tp_id
                } else {
                    return ! 1
                }
            }
            $.ajax({
                url: "//api.bilibili.com/x/share/add",
                type: "post",
                data: {
                    type: f,
                    id: d,
                    jsonp: "jsonp"
                },
                xhrFields: {
                    withCredentials: !0
                },
                dataType: "json",
                success: function(a) {
                    if (a && 0 == a.code) {
                        e.shared = !0;
                        var k = $(".block.share").find(".t-right-bottom"),
                        h = $('<div class="plus-num">+1</div>'),
                        j = parseInt(k.html()) >> 0;
                        j < a.data >> 0 && (k.html(j + 1), h.appendTo(k).animate({
                            bottom: "70px"
                        },
                        300,
                        function() {
                            h.fadeOut(100,
                            function() {
                                h.remove()
                            })
                        }))
                    }
                }
            })
        }
    }
};
window.bindShare = function() {
    return ShareModule.bind.apply(ShareModule, arguments)
};
function onPlayerScriptJump(d, e, f) {
    d = "//www.bilibili.com/video/" + d;
    e && 1 != parseInt(e) && (d += "#page=" + e);
    f ? window.open(d, "_blank") : location.href = d
}
var lazyImage = new LazyImage,
RecommendArea = function() {
    function e(a, d) {
        $.getJSON(d,
        function(b) {
            a.find(".b-loading").remove();
            b && 0 == b.code ? b && 0 == b.code && ((b = b.data) && b.length ? f(a, b) : $(".recommend-area").remove()) : $(".recommend-area").remove()
        })
    }
    function f(d, c) {
        if (c) {
            for (var m = 0; m < c.length; m++) {
                g(c[m]).appendTo(d)
            }
            d.width(c.length * d.children().outerWidth(!0));
            d.data("left", 0);
            var l = $('<div class="page prev no-select"><span class="icon"></span></div>').insertAfter(d).hide().on("click",
            function() {
                h(d, -1)
            }),
            j = $('<div class="page next no-select"><span class="icon"></span></div>').insertAfter(d).on("click",
            function() {
                h(d, 1)
            });
            d.parent().hover(function() {
                d.width() > d.parent().width() && (d.parent().find(".page.prev").show(), d.parent().find(".page.next").show())
            },
            function() {
                l.hide();
                j.hide()
            });
            lazyImage.lazy(d)
        }
    }
    function h(k, j) {
        var m = 870 == k.parent().width() ? 5 : 4,
        l = k.data("left") + j * k.children().outerWidth(!0) * m;
        0 > l ? l = 0 != k.data("left") ? 0 : k.children().length % m ? k.width() - k.children().length % m * k.children().outerWidth(!0) : k.width() + l: l >= k.width() && (l = 0);
        k.css({
            "margin-left": -l,
            opacity: 0
        }).stop(!0, !0).animate({
            opacity: 1
        },
        200);
        k.data("left", l);
        lazyImage.lazy(k);
        return l
    }
    function g(d) {
        var c = $('<li><div class="v"><a class="preview" href="/video/av' + d.aid + '/" target="_blank" title="' + d.title + '"><div class="medal"></div><div class="original"></div><div class="border"></div><img data-img="' + d.pic + '" data-alt="' + d.title + '"></a><a href="/video/av' + d.aid + '/" target="_blank" title="' + d.title + '"><div class="t">' + d.title + "</div></a></div></li>");
        $('<div class="i"><span><i class="b-icon b-icon-v-play"></i>' + utils.formatNum(d.stat.view) + '</span><span><i class="b-icon b-icon-v-dm"></i>' + utils.formatNum(d.stat.danmaku) + "</span></div>").insertAfter(c.find(".t"));
        d.badgepay && $('<div class="rm-pay">\u4ed8\u8d39\u89c2\u770b</div>').prependTo(c.find(".preview"));
        return c
    }
    return {
        create: function() {
            $(".recommend-area").remove();
            var b = $('<div class="recommend-area"><div class="b-head"><span class="b-head-t">\u770b\u8fc7\u8be5\u89c6\u9891\u7684\u8fd8\u559c\u6b22</span></div><div class="rm-list-wrp"><ul class="rm-list"><div class="b-loading"></div></ul></div></div>').insertBefore(".v_large .common");
            e(b.find(".rm-list"), "//comment.bilibili.com/recommendnew," + window.aid);
            return b
        }
    }
} (),
LiveRecommendList = function() {
    var a = '<div class="v-live-recommend"><div class="b-head"><span class="b-head-t">\u5927\u5bb6\u56f4\u89c2\u7684\u76f4\u64ad</span></div><ul class="v-list-live"></ul></div>';
    return {
        create: function() {
            var b = window.topid || $(".nav-menu .m-i.on").attr("data-tid"),
            f = window.typeid,
            e; ! b || 0 > $.inArray(parseInt(b), window.tidSet) || (window.liveRecommendXhrDone = function(c) {
                if (0 == c.code && c.data) {
                    if ($.isArray(c.data)) {
                        if (!c.data.length) {
                            return
                        }
                        e = c.data[Math.floor(Math.random() * c.data.length)]
                    } else {
                        e = c.data
                    }
                    $(".bangumi-content .ad").length && $(".bangumi-content").removeClass("v_large");
                    a = $(a).appendTo(".v_small");
                    $('<li><div class="lv-item"><a class="lv-preview" href="' + utils.trimHttp(e.link) + '" target="_blank" title="' + e.title + '"><img data-img="' + e.pic + '" alt="' + e.title + '" /><div class="lv-mask"></div><div class="b-icon-live-play"><i class="lv-onair-dot"></i><span class="lv-onair-txt">LIVE</span></div></a><a href="' + utils.trimHttp(e.link) + '" target="_blank"><div class="lv-room"><div class="lv-face"><img data-img="' + utils.trimHttp(e.face) + '"></div><div class="lv-t" title="' + e.title + '">' + e.title + '</div></div><div class="lv-info"><div class="lv-host" title="' + e.uname + '"><i class="b-icon b-icon-live-host"></i>' + e.uname + '</div><div class="lv-online"><i class="b-icon b-icon-live-online"></i>' + utils.formatNum(e.online) + "</div></div></a></div></li>").appendTo(a.find(".v-list-live"));
                    lazyImage.lazy(a)
                }
            },
            $.ajax({
                url: "//api.live.bilibili.com/bili/LiveRecommend?id=" + b + "&tid=" + f,
                dataType: "jsonp",
                jsonpCallback: "liveRecommendXhrDone",
                cache: !0
            }))
        }
    }
} (); (function() {
    function a(d) {
        var c = localStorage.getItem("favCreateFolderTip");
        this.APIConfig = {
            base: "//api.bilibili.com",
            list: {
                list: "/x/v2/fav/folder",
                create: "/x/v2/fav/folder/add",
                add: "/x/v2/fav/video/add",
                del: "/x/v2/fav/video/del",
                "default": "/x/v2/fav/video/favoured"
            }
        };
        this.options = $.extend(!0, {
            stowed: !1,
            aid: null,
            onAdd: function() {},
            onDel: function() {},
            onCreate: function() {}
        },
        d);
        this.template = '<div class="fav-wnd" id="fav_wnd"><div class="fav-hd">\u6dfb\u52a0\u5230\u6536\u85cf\u5939<i class="b-icon b-icon-a b-icon-close"></i></div><div class="fav-bd"><div class="fav-mask"></div><div class="fav-tip"></div><div class="fav-list-wrp"><ul class="fav-list"><li class="loading">loading...</li></ul><div class="fav-new-placeholder"><span class="fav-icon-add"></span><span class="txt">\u65b0\u5efa\u6536\u85cf\u5939</span></div><div class="fav-new-wrp">' + (c ? "": '<div class="fav-add-tip">\u70b9\u51fb\u5f39\u7a97\u5185\u5176\u4ed6\u533a\u57df\u6216ESC\u952e\uff0c\u53d6\u6d88\u65b0\u5efa\u6536\u85cf\u5939<i class="blue-arrow"></i><i class="icon-close"></i></div>') + '<input class="fav-input" placeholder="\u6700\u591a\u8f93\u516515\u4e2a\u5b57"><div class="fav-new-btns">\u65b0\u5efa</div></div></div><div class="fav-sure-wrp"><div class="fav-sure">\u786e\u5b9a</div></div></div><iframe class="layout" frameborder=0></iframe></div>';
        this.currentTarget = null;
        this.$mask = $('<div class="wnd-mask"></div>');
        this.$wnd = null;
        this.maxNum = 150;
        this.maxNameLen = 15;
        this._status = {
            ready: 0,
            initializing: 1,
            initialized: 2,
            listLoaded: 3
        };
        this.status = this._status.ready;
        this._scrollbarInitialized = this.stowed = !1;
        this._inFavList = [];
        this.collectStatus = {};
        this.originCollectStatus = {};
        this.init()
    }
    a.prototype = {
        constructor: a,
        init: function() {
            var b = this;
            $.fn.mCustomScrollbar ? (this.createWnd(), this.status = this._status.initialized) : (this.status++, $('<link rel="stylesheet" type="text/css" href="//static.hdslb.com/plugins/mCustomScrollbar/jquery.mCustomScrollbar.min.css" />').appendTo("body"), this._getScript("//static.hdslb.com/plugins/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js",
            function() {
                b.createWnd();
                b.status++
            }))
        },
        createWnd: function() {
            var b = this;
            this.$wnd = $(this.template);
            this.$listWrp = this.$wnd.find(".fav-list-wrp");
            this.$list = this.$listWrp.find(".fav-list");
            this.$input = this.$wnd.find(".fav-input");
            this.$error = this.$wnd.find(".err-msg");
            this.$newFav = this.$wnd.find(".fav-new-btns");
            this.$loading = this.$wnd.find(".fav-list .loading");
            this.$wnd.on("click",
            function(c) {
                c.stopPropagation()
            });
            this.$wnd.find(".b-icon-close").click(function() {
                b.close()
            });
            this.$wnd.find(".fav-new-placeholder").click(function() {
                b._toggleNew(!0);
                rec_rp("event", "favoritewin_newbuilt")
            });
            this.$wnd.find(".fav-btn-cancel").click(function() {
                b._toggleNew(!1)
            });
            this.$input.on("keyup",
            function(c) {
                c.stopPropagation();
                b._strCount(c)
            });
            this.$newFav.click(function() {
                b.createAndAddFav();
                rec_rp("event", "favoritewin_newbuiltbtn")
            });
            this.$wnd.find(".fav-sure").click(function() {
                b.action()
            });
            this.$wnd.find(".fav-mask").click(function() {
                b._toggleNew(!1)
            });
            this.$wnd.find(".fav-add-tip .icon-close").click(function() {
                localStorage.setItem("favCreateFolderTip", "true");
                b.$wnd.find(".fav-add-tip").remove()
            })
        },
        show: function(e) {
            utils.lockPageScroll("lock");
            this.currentTarget = e = $(e);
            var c = this;
            setTimeout(function() {
                c.$loading.show()
            },
            1000);
            if (this.status >= this._status.initialized) {
                this.$mask.appendTo("body");
                var f = e.offset().top + e.outerHeight();
                e.offset();
                if (this.listCount) {
                    switch (this.listCount) {
                    case 1:
                        this.$list.css({
                            "min-height":
                            "44px",
                            "margin-bottom": "112px"
                        });
                        break;
                    case 2:
                        this.$list.css({
                            "min-height":
                            "72px",
                            "margin-bottom": "112px"
                        });
                        break;
                    case 3:
                        this.$list.css({
                            "min-height":
                            "120px",
                            "margin-bottom": "112px"
                        });
                        break;
                    case 4:
                        this.$list.css({
                            "min-height":
                            "168px",
                            "margin-bottom": "112px"
                        });
                        break;
                    default:
                        this.$list.css({
                            "min-height":
                            "168px",
                            "margin-bottom": "112px"
                        })
                    }
                }
                this.$wnd.css({
                    display: "none"
                });
                this.$wnd.appendTo("body").show();
                this.$wnd.css({
                    display: "block",
                    "margin-top": "-" + this.$wnd.height() / 2 + "px"
                });
                f + this.$wnd.outerHeight() > $(window).height() + $(window).scrollTop() && (f = $(window).height() + $(window).scrollTop() - this.$wnd.outerHeight() - 10);
                if (this.status < this._status.listLoaded || this.stowed) {
                    this.status = this._status.listLoaded,
                    this.$list.find(".list-item[default]").remove(),
                    this.ajaxGet(null, "list", {
                        aid: window.aid
                    },
                    function(b) {
                        c.render(b.data);
                        c.listCount || c.$wnd.css("margin-top", "-" + c.$wnd.height() / 2 + "px");
                        c.$wnd.find(".fav-new-placeholder").show()
                    })
                }
                this.stowed = !1;
                this.$wnd.focus()
            }
        },
        close: function() {
            this._toggleNew(!1);
            this.$mask.remove();
            this.$wnd.hide();
            this.status = this._status.initialized;
            this._scrollbarInitialized = !1;
            this.init();
            utils.lockPageScroll("unlock")
        },
        render: function(e) {
            24 < e.length && this.unableCreateFolder();
            this.$list.find(".list-item").not("[default]").remove();
            4 >= e.length ? this.$wnd.find(".fav-list").css("margin-bottom", "68px") : this.$wnd.find(".fav-list").css("margin-bottom", "24px");
            this.$wnd.find(".fav-list .loading").remove();
            for (var c = 0; c < e.length; c++) {
                var f = e[c];
                f.favoured && this.addToList(f)
            }
            for (c = 0; c < e.length; c++) {
                f = e[c],
                f.favoured || this.addToList(f)
            }
            this._scrollbarInitialized ? this.$listWrp.mCustomScrollbar("update") : (this.$listWrp.mCustomScrollbar({
                axis: "y",
                scrollInertia: 300,
                mouseWheel: {
                    scrollAmount: 100,
                    preventDefault: !0
                },
                callbacks: {
                    onTotalScrollOffset: 12,
                    onTotalScroll: function() {}
                }
            }), this._scrollbarInitialized = !0)
        },
        addToList: function(f, c) {
            var h = this,
            g = $('<li data-id="' + f.fid + '" class="list-item ' + (f.cur_count >= f.max_count && 2 <= f.state && !f.favoured ? "lock": "") + '"><div class="list-item-name"><i class="radius-box ' + (f.favoured ? "on": "off") + '"></i>' + f.name + (3 == f.state ? '<i class="personal">[\u79c1\u5bc6]</i>': "") + '<div class="fav-count"></div></div></li>'); ! 0 === c ? g.attr("default", !0).prependTo(this.$list) : (g.appendTo(this.$list), this._favNumCount(g, f, c));
            g.find(".list-item-name").attr("title", f.name);
            this.originCollectStatus[f.fid] = this.collectStatus[f.fid] = !!f.favoured;
            g.on("click",
            function() {
                f.cur_count >= f.max_count && 2 <= f.state && !h.collectStatus[f.fid] || (h.collectStatus[f.fid] = !h.collectStatus[f.fid], h.collectStatus[f.fid] ? ($("i.radius-box", g).removeClass("off").addClass("on"), f.cur_count++) : ($("i.radius-box", g).removeClass("on").addClass("off"), f.cur_count--), h._favNumCount(g, f, c))
            });
            return g
        },
        createAndAddFav: function() {
            var d = this,
            c = this.$input.val();
            if (!c) {
                return (new MessageBox).show(d.$newFav, "\u8bf7\u586b\u5199\u6536\u85cf\u5939\u540d\u79f0"),
                !1
            }
            c = c.replace(/^[\s]+|[\s]+$/g, "");
            if (c.length > this.maxNameLen) {
                return (new MessageBox).show(d.$newFav, "\u6536\u85cf\u5939\u540d\u8d85\u8fc7\u9650\u5236"),
                !1
            }
            if ("" == c) {
                return (new MessageBox).show(d.$newFav, "\u6536\u85cf\u5939\u540d\u4e0d\u80fd\u4e3a\u7a7a"),
                !1
            }
            d.$newFav.addClass("disabled");
            this.ajaxPost(this.$newFav, "create", {
                name: c,
                csrf: utils.cookie.get("bili_jct")
            },
            function(f) {
                d.$input.val("");
                d._strCount();
                f = f.data.fid;
                var b = {
                    name: c,
                    fid: f,
                    count: 1,
                    cur_count: 1,
                    max_count: d.maxNum
                };
                4 == d.$list.find("li").length && d.$list.css("margin-bottom", "28px");
                d.addToList(b);
                d.$listWrp.mCustomScrollbar("update");
                d._trigger("onCreate", d.currentTarget, b);
                d.$newFav.removeClass("disabled");
                d.collectStatus[f] = !0;
                d.$wnd.find("li[data-id=" + f + "] .radius-box").removeClass("off").addClass("on");
                d._toggleNew(!1);
                24 < d.$wnd.find(".fav-list li").length && d.unableCreateFolder()
            })
        },
        unableCreateFolder: function() {
            this.$wnd.find(".fav-new-placeholder").addClass("lock").off("click").on("click",
            function() { (new MessageBox).show($(this), "\u6536\u85cf\u5939\u4e2a\u6570\u5df2\u8fbe\u5230\u4e0a\u9650", 2000)
            })
        },
        _setStow: function(b) {
            0 > $.inArray(b, this._inFavList) && (this._inFavList.push(b), this.stowed = !0)
        },
        _favNumCount: function(e, c, f) {
            e.find(".fav-count").text(c.cur_count + (0 == c.state || 1 == c.state ? "": "/" + c.max_count))
        },
        _strCount: function(f) {
            var c = this.$input,
            k = this.$wnd.find(".fav-new-wrp"),
            j = c.siblings(".str-count"),
            c = c.val().replace(/\r\n?/, "\n").length,
            h = this.maxNameLen;
            j.html(c + "/" + h);
            c > h ? k.addClass("error") : k.removeClass("error");
            f && 27 == f.keyCode ? this._toggleNew(!1) : f && 13 == f.keyCode && this.createAndAddFav()
        },
        action: function() {
            var f = [],
            c = [],
            h = this.collectStatus,
            g;
            for (g in h) {
                h.hasOwnProperty(g) && h[g] != this.originCollectStatus[g] && (h[g] ? f.push(g) : c.push(g))
            }
            f.length || c.length ? ((f.length || c.length) && this.$list.find("li .radius-box.on"), this.synchronize(f, c)) : this.close()
        },
        afterAction: function() {
            var e = !1,
            c = !1,
            f;
            for (f in this.collectStatus) {
                this.originCollectStatus[f] && (c = !0),
                this.collectStatus[f] && (e = !0),
                this.originCollectStatus[f] = this.collectStatus[f]
            } ! c && e ? this._trigger("onAdd", this.currentTarget) : c && !e && this._trigger("onDel", this.currentTarget);
            this.close()
        },
        synchronize: function(f, c) {
            var h = 0,
            g = this;
            f.length ? postJSONLite({
                url: "//api.bilibili.com/x/v2/fav/video/add",
                data: {
                    aid: g.options.aid,
                    fid: f.join(","),
                    jsonp: "jsonp",
                    csrf: utils.cookie.get("bili_jct")
                },
                dataType: "json",
                type: "post",
                xhrFields: {
                    withCredentials: !0
                },
                success: function(b) {
                    b && 0 == b.code ? h++:(new MessageBox).show(g.$wnd.find(".fav-sure"), b.message, 2000);
                    2 <= h && g.afterAction()
                }
            }) : h++;
            c.length ? postJSONLite({
                url: "//api.bilibili.com/x/v2/fav/video/del",
                data: {
                    aid: g.options.aid,
                    fid: c.join(","),
                    jsonp: "jsonp",
                    csrf: utils.cookie.get("bili_jct")
                },
                dataType: "json",
                type: "post",
                xhrFields: {
                    withCredentials: !0
                },
                success: function(b) {
                    b && 0 == b.code ? h++:(new MessageBox).show(g.$wnd.find(".fav-sure"), b.message, 2000);
                    2 <= h && g.afterAction()
                }
            }) : h++
        },
        ajaxGet: function() {
            Array.prototype.unshift.call(arguments, "get");
            return this._ajax.apply(this, arguments)
        },
        ajaxPost: function() {
            Array.prototype.unshift.call(arguments, "post");
            return this._ajax.apply(this, arguments)
        },
        _toggleNew: function(b) {
            b ? (this.$wnd.find(".fav-new-wrp").show(), this.$wnd.find(".fav-new-placeholder").hide(), this.$wnd.find(".fav-new-wrp input")[0].focus(), this.$wnd.find(".fav-mask").show(), this.$listWrp.mCustomScrollbar("disable")) : (this.$wnd.find(".fav-new-wrp").hide(), this.$wnd.find(".fav-new-placeholder").show(), this.$input.val(""), this._strCount(), this.$wnd.find(".fav-mask").hide(), this.$listWrp.mCustomScrollbar("update"))
        },
        _ajax: function(h, c, m, l, j, k) {
            l = {
                url: this.APIConfig.base + this.APIConfig.list[m],
                type: h,
                dataType: "get" == h ? "jsonp": "json",
                data: $.extend(!0, {
                    jsonp: "jsonp"
                },
                l),
                xhrFields: {
                    withCredentials: !0
                },
                success: function(b) {
                    0 == b.code || "default" == m && b.list ? j && j.apply(this, arguments) : c && (!b.message && b.code && (11001 == b.code ? b.message = "\u6536\u85cf\u5939\u540d\u79f0\u8fc7\u957f": 11002 == b.code ? b.message = "\u8fbe\u5230\u6700\u5927\u6536\u85cf\u5939\u6570": 11005 == b.code ? b.message = "\u89c6\u9891\u6570\u8fbe\u5230\u76ee\u5f55\u6700\u5927\u6536\u85cf\u6570": 11006 == b.code ? b.message = "\u5df2\u7ecf\u5b58\u5728\u8be5\u6536\u85cf\u5939": 11007 == b.code ? b.message = "\u5df2\u7ecf\u5b58\u5728\u8be5\u89c6\u9891\u4e86": 11012 == b.code ? b.message = "\u5df2\u7ecf\u5220\u9664\u8be5\u6536\u85cf\u5939\u4e86": -101 == b.code ? b.message = "\u8d26\u53f7\u672a\u767b\u5f55": -102 == b.code ? b.message = "\u8d26\u53f7\u88ab\u5c01\u505c": -103 == b.code && (b.message = "\u60a8\u7684\u8d26\u53f7\u5df2\u7ecf\u88ab\u5c01\u7981")), (new MessageBox).show(c, b.message || "\u64cd\u4f5c\u5931\u8d25", 1500))
                },
                error: function() {
                    k ? k.apply(this, arguments) : c && (new MessageBox).show(c, "\u8bf7\u6c42\u5931\u8d25", 1500)
                }
            };
            "post" == h ? postJSONLite(l, "addFavCallback" + m) : $.ajax(l)
        },
        _getScript: function(d, c) {
            $.ajax({
                type: "GET",
                url: d,
                success: c,
                dataType: "script",
                cache: !0
            })
        },
        _trigger: function() {
            var d = Array.prototype.slice.call(arguments, 0),
            c = d.shift();
            if (this.options[c]) {
                return this.options[c].apply(this, d)
            }
        }
    };
    return window.FavList = a
})(); (function() {
    function a(E, D, C, B) {
        function z(e) {
            var h = this,
            d = $.Deferred(),
            b = new MessageBox({
                margin: 8,
                Overlap: !0,
                focusShowPos: "down"
            });
            UserStatus.isLogin(this) && (v ? b.show(this, t) : (j = !0, B ? $.ajax({
                url: "//www.bilibili.com/activity/account/token",
                dataType: "json"
            }).done(function(f) {
                f.code || !f.data ? d.reject() : $.ajax({
                    url: "/activity/likes/like/" + D + "?oid=" + E.lid + "&action=" + e,
                    type: "POST",
                    data: {
                        token: f.data
                    }
                }).done(function(g) {
                    d.resolve(g)
                }).fail(function() {
                    d.reject()
                })
            }) : $.ajax({
                url: "/m/mission_vote",
                data: {
                    aid: C,
                    msid: D,
                    vote: e
                }
            }).done(function(f) {
                d.resolve(f)
            }).fail(function() {
                d.reject()
            }), d.done(function(g) {
                var f, l = "\u672a\u77e5\u9519\u8bef",
                k = {
                    0 : o,
                    "-1": "\u4e0d\u5728\u53ef\u8bc4\u5206\u65f6\u95f4\u5185",
                    "-2": "\u8bc4\u5206\u7684\u89c6\u9891\u4e0d\u5b58\u5728",
                    "-3": "\u60a8\u5df2\u7ecf\u5bf9\u6b64\u89c6\u9891\u8bc4\u8fc7\u5206",
                    "-4": "\u60a8\u5df2\u7ecf\u5bf9\u6b64\u89c6\u9891\u8bc4\u8fc7\u5206",
                    "-5": "\u8bc4\u5206\u6570\u91cf\u4e0d\u6b63\u786e",
                    "-6": "\u8bf7\u5148\u767b\u5f55",
                    "-7": "\u60a8\u5269\u4f59\u7684\u53ef\u8bc4\u5206\u70b9\u6570\u4e0d\u8db3",
                    "-403": null
                };
                B ? g && (f = g.code, k["-403"] = g.msg) : f = g.toString();
                k[f] && (l = k[f]);
                "0" == f ? (v = !0, g = "msg", y.find(".score-wrapper").off("mouseleave").find("li").off("hover click").attr("data-extra", "default"), y.find(".b-btn-praise").attr("data-status", "true").off("click")) : (j = !1, g = "error");
                b.show(h, l, 1000, g)
            }).fail(function() {
                b.show(h, "\u8bf7\u6c42\u5931\u8d25");
                j = !1
            })))
        }
        if (E && (!B || 0 != E.lid && null != E.lid)) {
            var A = $(".activity-wrp"),
            y = $('<div class="inside-wrp"><div class="left"><div class="l-inside"></div></div><div class="right"></div></div>');
            A.attr("data-up-name");
            A.attr("data-up-space");
            var x, w, o, t, v = !1,
            j = !1,
            c = +E.vote_start,
            G = +E.vote_end,
            F = Math.floor(window.serverdate / 1000);
            $(".viewbox .v-title").addClass("activity-enabled").find("h1").prepend('<a target="_blank" href="' + utils.trimHttp(E.single) + '" title="' + E.theme + '">\u6d3b\u52a8\u4f5c\u54c1</a>');
            x = '<a class="inside-bg" target="_blank" href="' + utils.trimHttp(E.single) + '" title="' + E.theme + '"></a>';
            if (F >= c && F <= G) {
                A.addClass("act-now"),
                "1" == E.mission_zan ? (o = "\u70b9\u8d5e\u6210\u529f", t = "\u60a8\u5df2\u7ecf\u5bf9\u6b64\u89c6\u9891\u70b9\u8fc7\u8d5e", w = '<div class="hinter-msg"><b> ' + E.theme + " </b> </div>", w += '<div class="b-btn-praise" data-status="false">\u70b9\u8d5e</div>') : "0" == E.mission_zan && (o = "\u8bc4\u5206\u6210\u529f", t = "\u60a8\u5df2\u7ecf\u5bf9\u6b64\u89c6\u9891\u8bc4\u8fc7\u5206", w = '<div class="hinter-msg"><b> ' + E.theme + " </b> </div>", w += '<ul id="user_rate" class="score-wrapper clearfix"><li></li><li></li><li></li><li></li><li></li></ul>')
            } else {
                if (F > G) {
                    A.addClass("act-end"),
                    w = "\u672c\u89c6\u9891\u53c2\u52a0\u8fc7 <b>[ " + E.title + " ]</b> \u6d3b\u52a8\uff0c\u8be5\u6d3b\u52a8\u5df2\u7ed3\u675f~"
                } else {
                    return
                }
            }
            y.find(".left .l-inside").html(w).end().find(".right").html(x).find(".inside-bg").css("background-image", "url(" + (E.zantext || "//static.hdslb.com/images/transparent.gif") + ")").end().end();
            y.appendTo(A);
            y.find(".score-wrapper").mouseleave(function() {
                $(this).find("li").attr("data-extra", "false")
            });
            hoverDelay(y.find(".score-wrapper li"),
            function() {
                var e = new MessageBox({
                    margin: 8,
                    focusShowPos: "down"
                }),
                d = e.show(this, ["\u4e00\u822c", "\u8fd8\u884c", "\u4e0d\u9519", "\u5f88\u8d5e", "\u60ca\u8273"][$(this).index()], 0);
                d && (d.css("min-width", 0).find(".mini").css("padding", "4px 8px").end(), e.setPos());
                $(this).prevAll().add(this).attr({
                    "data-extra": "opacity",
                    "data-status": "true"
                });
                $(this).nextAll().attr({
                    "data-extra": "false",
                    "data-status": "false"
                })
            },
            null, 100);
            y.find(".score-wrapper li").click(function() {
                j || z.call(this, ($(this).index() + 1) * (B ? 1 : 2))
            });
            y.find(".b-btn-praise").click(function() {
                j || z.call(this, 1)
            })
        }
    }
    $(document).ready(function() {
        var b = $(".activity-wrp");
        if (b.length && "0" != b.attr("data-vote")) {
            var h, g = b.attr("data-msid"),
            f = $.ajax({
                url: "//interface.bilibili.com/serverdate.js",
                cache: !0,
                dataType: "script"
            });
            10000 < parseInt(g) ? (h = !0, b = $.ajax({
                url: "//www.bilibili.com/activity/subject/" + g,
                data: {
                    aid: window.aid
                },
                dataType: "json"
            })) : (h = !1, b = $.ajax({
                url: "//www.bilibili.com/plus/mission_vote.php",
                data: {
                    act: "mission",
                    msid: g
                },
                dataType: "json"
            }));
            $.when(b, f).done(function(c) {
                if (c[0] && !c[0].code) {
                    c = c[0].data;
                    var d = {};
                    h ? (d.mission_id = c.id, d.title = c.name, d.theme = c.dic, d.vote_start = c.stime, d.vote_end = c.etime, d.single = c.act_url, d.zantext = c.cover, d.lid = c.lid, 1 == c.type ? d.mission_zan = 0 : 4 == c.type && (d.mission_zan = 1)) : d = c;
                    a(d, g, window.aid, h)
                }
            })
        }
    })
})();
function measureDesc() {
    var d = $("#v_desc");
    if (d.length) {
        d.find("a").each(function(h, g) {
            var k = $(g),
            j = k.html().match(/av([0-9]+)/);
            j && (k.attr("data-view", j[1]), bindPOCoins2(k))
        });
        var e = $("<div>").width(d.width()).html(d.html()).css({
            position: "absolute",
            top: 0,
            left: 0,
            "line-height": d.css("line-height"),
            "word-break": "break-all",
            "word-wrap": "break-word",
            visibility: "hidden",
            "white-space": "pre-wrap"
        }).appendTo("body"),
        f = d.siblings(".v-desc-toggle");
        parseInt(d.css("max-height")) && e.height() > parseInt(d.css("max-height")) ? f.length ? f.show() : (f = $("<a><span>\u5c55\u5f00</span></a>").addClass("b-btn b-btn-textonly v-desc-toggle").appendTo(d.parent()), f.on("click",
        function() {
            var b = $(this);
            d.hasClass("open") ? (d.removeClass("open"), b.find(">span").text("\u5c55\u5f00")) : (d.addClass("open"), b.find(">span").text("\u6536\u8d77"))
        })) : f.length && f.hide();
        e.remove()
    }
}
function checkLiveState(a) {
    window.liveXhrDone = function(b) {
        b.data && b.data.status && $('<a class="live-status-link" href="' + utils.trimHttp(b.data && b.data.url) + '" target="_blank"><span>' + ["", "\u76f4\u64ad\u4e2d", "\u8f6e\u64ad\u4e2d"][b.data.status] + "</span></a>").appendTo("#r-info-rank")
    };
    $.ajax({
        url: "//api.live.bilibili.com/bili/living_v2/" + a,
        dataType: "jsonp",
        cache: !0,
        jsonpCallback: "liveXhrDone"
    })
}
function EmbedPlayer(f, g, k) {
    f = {};
    var j = $("#bofqi").contents().filter(function() {
        return 3 == this.nodeType
    }),
    h = j.text().match(/\[flashvars\](.*)\[\/flashvars\]/);
    null != h && (k = k + "&" + h[1], j.remove());
    k = k.split("&");
    for (j = 0; j < k.length; j++) {
        "" != k[j] && (h = k[j].split("="), f[h[0]] = h[1])
    }
    swfobject.embedSWF(g, "player_placeholder", "950", "482", "0", "", f, {
        bgcolor: "#ffffff",
        allowfullscreeninteractive: "true",
        allowfullscreen: "true",
        quality: "high",
        allowscriptaccess: "always",
        wmode: "direct"
    },
    {
        "class": "player"
    })
}
function play_use_coop_player(f, g, k) {
    var j = arguments.callee;
    if (k) {
        var h = g.match(/id_([^.]+)/);
        h && ($("#bofqi").html('<div id="player_placeholder"></div>'), swfobject.embedSWF("//static.hdslb.com/youku.swf", "player_placeholder", "950", "482", "0", "", {
            "bili-cid": f,
            url: "//player.youku.com/player.php/sid/" + h[1] + "/v.swf"
        },
        {
            allowfullscreeninteractive: "true",
            allowfullscreen: "true",
            quality: "high",
            allowscriptaccess: "always",
            wmode: "direct"
        },
        {
            "class": "player"
        }))
    } else {
        setTimeout(function() {
            j(f, g, !0)
        },
        0)
    }
}
$(function() {
    Responsive.add(function(a) {
        measureDesc()
    });
    addReturnToMobile();
    onLoginInfoLoaded(function(a) {
        var b = $(".v-title-line.fav_btn"),
        c = b.find("i.b-icon"),
        d = new Animator({
            element: c,
            frameSource: "//static.hdslb.com/images/base/anim-collect.png",
            frameWidth: 60,
            frameHeight: 60,
            fps: 24,
            totalFrame: 21
        });
        b.on("mouseenter.anim",
        function() {
            c.hasClass("on") || d.start(1)
        }).on("mouseleave.anim",
        function() {
            d.back()
        });
        if (a.isLogin && window.aid) {
            var e = new FavList({
                aid: window.aid,
                onAdd: function(a) {
                    $(".fav_btn").find(".b-icon-stow, .b-icon-anim-fav").addClass("on");
                    $(".fav_btn").find(".stow-status, .t-right-top").html("\u5df2\u6536\u85cf");
                    CacheManager.addItem("last_fav", parseInt(window.aid));
                    d.options.totalFrame = 30;
                    d.options.offsetY = 60;
                    d.framePos = 0;
                    d.start();
                    b.off("mouseenter.anim mouseleave.anim");
                    a = $("#stow_count").html();
                    a.match(/\u4e07/) || $("#stow_count, .stow_count").html(utils.formatNum(parseInt(a) + 1))
                },
                onDel: function(a) {
                    $(".fav_btn").find(".b-icon-stow, .b-icon-anim-fav").removeClass("on");
                    $(".fav_btn").find(".stow-status, .t-right-top").html("\u6536\u85cf");
                    d.options.totalFrame = 19;
                    d.options.offsetY = 0;
                    d.framePos = 0;
                    d.start();
                    b.on("mouseenter.anim",
                    function() {
                        c.hasClass("on") || d.start(1)
                    }).on("mouseleave.anim",
                    function() {
                        d.back()
                    });
                    a = $("#stow_count").html();
                    a.match(/\u4e07/) || $("#stow_count, .stow_count").html(utils.formatNum(parseInt(a) - 1))
                }
            });
            $.get("//api.bilibili.com/x/v2/fav/video/favoured", {
                aid: window.aid,
                jsonp: "jsonp"
            },
            function(a) {
                0 == a.code && a.data.favoured && ($(".fav_btn").find(".b-icon-stow, .b-icon-anim-fav").addClass("on"), $(".fav_btn").find(".stow-status, .t-right-top").html("\u5df2\u6536\u85cf"), c.css("background-position", "0 -120px"));
                e.listCount = a.data && a.data.count
            },
            "jsonp")
        }
        $(".fav_btn, .fav_btn_top").on("click",
        function(a) {
            if (UserStatus.isLogin($(this))) {
                e && e.show($(this))
            } else {
                return ! 1
            }
        });
        a = $(".r-info > .f").attr("mid");
        if ("undefined" != typeof window.AttentionList && "null" != typeof window.AttentionList) {
            for (var p = 0; p < window.AttentionList.length && window.AttentionList[p] != a; p++) {}
        }
    });
    $(".upinfo .message").on("click",
    function(a) {
        $(this);
        UserStatus.isLogin($(this)) || a.preventDefault()
    });
    $("#bofqi").length && RecommendArea.create();
    LiveRecommendList.create();
    initToolBar();
    var b, a, c;
    window.aid ? (b = window.aid, a = "arc") : window.tp_id && (b = window.tp_id, a = "topic");
    if (b && !window.bbComment) {
        c = new bbFeedback(".comm", a, {
            autoLoad: !0
        });
        $("#load_comment").off("click").removeAttr("onclick").on("click",
        function() {
            c.show(b, 1)
        });
        var d, e = function(a) {
            var b = $("#l_id_" + d, a);
            0 != b.length && (setTimeout(function() {
                $(document).scrollTop(b.offset().top - 20)
            },
            0), b.parents(".reply").length ? $(".re_ta", b).click() : $(".huifu", b).click())
        }; (a = window.location.href.match(/#fb,([0-9]+),([0-9]+),([0-9]+),(.+)$/)) ? (d = a[3], c.show(b, 1, d, e)) : (a = window.location.href.match(/#reply([0-9]+)$/)) ? (d = a[1], c.show(b, 1, d, e)) : c.show(b, 1)
    }
    if (0 < $('iframe[src^="https://secure.bilibili.com"]').size() || 0 < $('iframe[src^="https://ssl.bilibili.tv"]').size()) {
        window.postMessage ? (a = function(a) {
            "https://secure.bilibili.com" != a.origin && "https://ssl.bilibili.com" != a.origin || "secJS:" != a.data.substr(0, 6) || eval(a.data.substr(6));
            "undefined" != typeof console && console.log(a.origin + ": " + a.data)
        },
        window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent && window.attachEvent("onmessage", a)) : setInterval(function() {
            if (evalCode = __GetCookie("__secureJS")) {
                __SetCookie("__secureJS", ""),
                eval(evalCode)
            }
        },
        1000)
    }
    __GetCookie("bbFrontManager") && (a = window.aid || "", $('<script type="text/javascript" src="//static.hdslb.com/js/highcharts.js">\x3c/script>').appendTo("head"), $('<a href="//manager.bilibili.co/#/archive/modify/' + a + '" class="b-btn w" target=\'_blank\' >\u67e5\u770b\u65e5\u5fd7</a>').appendTo("#newtag"), $('<a href="javascript:;" class="b-btn w">\u5f39\u5e55\u7ba1\u7406</a>').appendTo("#newtag").click(function() {
        if (0 < $(".dm_manage").length) {
            $(".dm_manage").stop().slideToggle()
        } else {
            var a = $(this);
            $.ajax({
                url: "/html/dm_manage.html",
                dataType: "html",
                success: function(b) {
                    $(".dm_manage").length || $(b).prependTo(a.closest(".main-inner"))
                },
                error: function() { (new MessageBox).show(a, "\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5")
                }
            })
        }
    }));
    miniPlayer()
});
window.GetRandomString = function(f) {
    for (var g = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), k = "", j = 0; j < f; j++) {
        var h = Math.floor(62 * Math.random()),
        k = k + g[h]
    }
    return k
};
function getDownloadUrl(c) {
    var d = "https://itunes.apple.com/cn/app/bi-li-bi-li-dong-hua/id736536022";
    browser.version.MicroMessenger ? d = "//a.app.qq.com/o/simple.jsp?pkgname=tv.danmaku.bili": browser.version.android ? d = "//wsdownload.hdslb.net/app/BiliPlayer_bilih5.apk": browser.version.ios ? d = "https://itunes.apple.com/cn/app/bi-li-bi-li-dong-hua/id736536022": browser.version.windowsphone && (d = "https://www.windowsphone.com/zh-cn/store/purchase/validate?app=75620dee-4a7a-4dae-8677-0d930e05f57e&apptype=regular&offer=3869edb1-e34c-469a-af6e-2c8a7856cb61");
    c && ($(c).attr("href", d), browser.version.android ? $(c).attr("target", "_self") : $(c).attr("target", "_blank"), !browser.version.android || "360" != __GetUrlValue("from") && "undefined" == typeof AndroidWebview || $.getScript("//openbox.mobilem.360.cn/html/api/js/qstore.js",
    function() {
        $(c).click(function() {
            return qStore && qStore.fn && "function" == typeof qStore.fn.download ? (qStore.fn.download("1343"), !1) : !0
        })
    }));
    return d
}
function showDownloadPanel(e, f, h, g) {
    window.location.href = getDownloadUrl();
    return ! 1
} (function(c) {
    function d(P) {
        var O = c(this),
        N = null,
        L = !1,
        M = "javascript:void(0);",
        K = c.extend({
            id: null,
            title: "\u8bf7\u5148\u4e0b\u8f7d\u5ba2\u6237\u7aef",
            content: "\u672c\u529f\u80fd\u7531\u5ba2\u6237\u7aef\u63d0\u4f9b _(:3\u300d\u2220)_",
            download: !1,
            aid: null,
            season_id: null,
            spid: null,
            room_id: null,
            mid: null,
            isBuffBtn: !1,
            isbangumi: !1,
            true_season_id: !1
        },
        P),
        J = Date.parse(new Date) / 1000,
        I = GetRandomString(32),
        F = 5,
        G = !1,
        H = "bilibili://",
        E = c('<div class="float-notice"><div class="txt">\u8bf7\u70b9\u51fb\u53f3\u4e0a\u89d2\uff0c\u9009\u62e9\u201c<span>\u5728\u6d4f\u89c8\u5668\u4e2d\u6253\u5f00</span>\u201d\uff0c\u518d\u70b9\u6253\u5f00\u5ba2\u6237\u7aef</div><div class="close"></div></div>').on("click", ".close",
        function() {
            E.hide()
        }),
        D = {
            packageName: "tv.danmaku.bilianime",
            packageUrl: "bilibili://"
        };
        browser.version.android && (D = {
            packageName: "tv.danmaku.bili"
        });
        var C = function() {
            E.appendTo("body").show()
        };
        P = function(f, e, g) {
            M = getDownloadUrl();
            O.unbind("click");
            O.click(function() {
                browser.version.weibo ? C() : showDownloadPanel(f, e);
                return ! 1
            });
            g || O.click()
        };
        var A = function(e) {
            var f = c(".app-link-iframe");
            f.length || (f = c("<iframe>").addClass("app-link-iframe").css({
                width: 0,
                height: 0
            }));
            f.hide().appendTo("body");
            f.attr("src", utils.trimHttp(e))
        },
        B = function(e) {
            function g(h) {
                clearTimeout(N);
                document.removeEventListener("visibilitychange", g, !1)
            }
            var f = +new Date;
            clearTimeout(N);
            N = setTimeout(function() {
                2000 > +new Date - f && ("function" == typeof e ? e() : window.location = e)
            },
            1000);
            c(window).on("blur.applink",
            function(h) {
                clearTimeout(N);
                c(window).off("blur.applink")
            });
            document.addEventListener("visibilitychange", g)
        },
        j = function() {
            O.attr({
                href: utils.trimHttp(M),
                target: "_blank"
            });
            browser.version.MicroMessenger ? b() : browser.version.android && O.attr({
                target: "_self"
            });
            K.season_id && K.true_season_id ? H = "bilibili://bangumi/season/" + K.season_id: K.spid ? H = browser.version.android ? "bilibili://" + (K.season_id ? "bangumi/sp/" + K.spid: "splist/" + K.spid) : "bilibili://" + (K.season_id ? "bilibili.tv/bangumi?spid=" + K.spid: "bilibili.tv/sp?spid=" + K.spid) : K.aid && !K.isbangumi ? H = browser.version.android ? "bilibili://video/" + K.aid: "bilibili://?av=" + K.aid: K.aid && K.isbangumi ? H = browser.version.android ? "bilibili://video/" + K.aid: "bilibili://bangumi/season/av/" + K.aid: K.room_id ? H = "bilibili://live/" + K.room_id: K.mid && (H = "bilibili://author/" + K.mid);
            if (browser.version.windowsphone) {
                O.on("click",
                function() {
                    A(H)
                })
            } else {
                if (browser.version.android) {
                    O.on("click",
                    function() {
                        A(H);
                        browser.version.MicroMessenger ? o("appLink", H,
                        function() {
                            B(function() {
                                G ? C() : z()
                            })
                        }) : browser.version.weibo ? B(function() {
                            C()
                        }) : B(function() {
                            z()
                        });
                        return ! 1
                    })
                } else {
                    browser.version.ios && (O.attr({
                        href: utils.trimHttp(H),
                        target: "_self"
                    }), O.on("click",
                    function() {
                        browser.version.MicroMessenger ? o("appLink", H,
                        function() {
                            O.applink(function() {
                                G ? C() : z()
                            })
                        }) : browser.version.weibo ? B(function() {
                            C()
                        }) : B(function() {
                            z()
                        })
                    }))
                }
            }
            L && (setTimeout(function() {
                window.open(utils.trimHttp(M), "_self")
            },
            1000), L = !1)
        },
        z = function() {
            showDownloadPanel(K.title, K.content)
        },
        b = function() {
            c.ajax({
                url: "//app.bilibili.com/x/display/wechat/sign",
                type: "get",
                data: {
                    url: window.location.href,
                    timestamp: J,
                    nonce: I,
                    jsonp: "jsonp"
                },
                dataType: "jsonp",
                success: function(e) {
                    e && 0 == e.code && c.getScript("//res.wx.qq.com/open/js/jweixin-1.0.0.js",
                    function() {
                        wx && (wx.config({
                            beta: !0,
                            debug: !1,
                            appId: "wx108457cda8a1b9f9",
                            nonceStr: I,
                            timestamp: J,
                            signature: e.data,
                            jsApiList: "getInstallState launch3rdApp onMenuShareTimeline onMenuShareAppMessage onMenuShareQQ onMenuShareWeibo onMenuShareQZone".split(" ")
                        }), wx.ready(function() {
                            wx.invoke("getInstallState", D,
                            function(g) {
                                for (var f in g) {
                                    "err_msg" == f && 0 < g[f].indexOf("yes") && (G = !0)
                                }
                            })
                        }))
                    })
                },
                error: function() {
                    G = !1
                }
            })
        },
        o = function(f, e, g) {
            wx ? wx.invoke("launch3rdApp", {
                appID: "wxcb8d4298c6a09bcb",
                messageExt: e,
                extInfo: e
            },
            function(k) {
                for (var h in k) {
                    "err_msg" == h && ("launch_3rdApp:ok" == k[h] ? G = !0 : "function" == typeof g && g())
                }
            }) : 0 >= F ? "function" == typeof g && g() : (F--, setTimeout(function() {
                o(f, e, g)
            },
            300))
        };
        K.download ? P(K.title, K.content, !0) : j()
    }
    c.fn.bindApplink = function(a) {
        this.each(function() {
            d.call(this, a)
        });
        return this
    }
})($);
$(document).ready(function() {
    var d = $(".r-info").find(".usname"),
    e = d.find("a.message").attr("mid") || window.mid,
    f = $("#r-info-rank");
    e && $.ajax({
        url: "//api.bilibili.com/vipinfo/default",
        data: {
            type: "jsonp",
            mid: e,
            loginid: __GetCookie("DedeUserID")
        },
        dataType: "jsonp",
        jsonCallback: "jsonp_z_vipinfo"
    }).done(function(a) {
        a && (!a.code && a.data) && (a = a.data, a.vip && 2 == a.vip.vipType && 0 != a.vip.vipStatus && 2 != a.vip.vipStatus ? d.find("a.name").addClass("b-vip-red") : d.find("a.name").removeClass("b-vip-red"), window.AttentionList = window.AttentionList || [], a.following && -1 == window.AttentionList.indexOf(e) && window.AttentionList.push(parseInt(e)), a.following ? ($(".r-info > .f").text("\u5df2\u5173\u6ce8"), $(".r-info > .f").addClass("on"), bindRIUnattent()) : ($(".r-info > .f").text("+ \u5173\u6ce8"), bindRIAttent()), $(".r-info > .f").removeClass("hide"), a.archiveCount && $(".up-video-message .archiveCount").text("\u6295\u7a3f\uff1a" + a.archiveCount), f.find(".legalize-icon").remove(), 0 == a.official_verify.type ? f.append('<div class="legalize-icon legalize-16-1" title="\u4e2a\u4eba\u8ba4\u8bc1"></div>') : 1 == a.official_verify.type && f.append('<div class="legalize-icon legalize-16-2" title="\u4f01\u4e1a/\u56e2\u4f53\u8ba4\u8bc1"></div>'))
    })
});
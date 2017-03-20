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

$(function(){
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
});


// 浏览器判断
(function($){
	if(!$)return;
	var userAgent = navigator.userAgent.toString().toLowerCase();
	var doc = document, port='', win  = window, _loc = location;
	$.browser = {
		tt  : /tencenttraveler|qqbrowser/i.test( userAgent ),
		ie6 : !-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent),
		ie7 : /msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (document.documentMode == 7),
		ie8 : /msie.[8]\.0/i.test(userAgent) || (document.documentMode == 8),
		ie67 : ((!-[1,] && !win.XMLHttpRequest || /msie.6\.0/i.test(userAgent)) || (/msie.[7]\.0/i.test(userAgent) && !/trident\/5\.0/i.test(userAgent) || (document.documentMode == 7))),
		ie78 : /msie.[7|8]\.0/i.test(userAgent),
		ie678: !$.support.leadingWhitespace,
		ie9 : /msie.[7|9]\.0/i.test(userAgent) && /mozilla\/[4|5]\.0/i.test(userAgent) && /trident\/5\.0/i.test(userAgent) || (document.documentMode == 9),
		safari: /webkit/i.test( userAgent ), 
		chrome: /chrome/i.test(userAgent) && /mozilla/i.test(userAgent) ,
		msie  : /msie/i.test(userAgent) && !/opera/.test(userAgent),
		ff:  /.*(firefox)\/([\w.]+).*/i.test(userAgent)
	};
})(window.jQuery);

/*海洋*/
var sea = {
	init: function() {
		var _this = this;
		_this.cloud2();
		_this.cloud3();
		_this.whale1_tail();
		_this.whale2_tail();
		_this.whale1_m1();
		_this.wave1();
		_this.wave2();
		_this.boatS1();
		_this.wave3_1();
		_this.wave6_1();
		_this.bottle_1();
	},
	cloud2: function() {
		var _this = this;
		TweenLite.to($(".cloud2"), 5, {
			//rotation: -3,
			left: -$(".cloud2").width() + "px",
			ease: Linear.easeNone,
			onComplete: function() {
				TweenLite.set($(".cloud2"), {
					left: $(window).width() + "px"
				});
				_this.cloud2_1();
			}
		});
	},
	cloud2_1: function() {
		var _this = this;
		TweenLite.to($(".cloud2"), 50, {
			//rotation: -3,
			left: -$(".cloud2").width() + "px",
			ease: Linear.easeNone,
			onComplete: function() {
				TweenLite.set($(".cloud2"), {
					left: $(window).width() + "px"
				});
				_this.cloud2_1();
			}
		});
	},
	cloud3: function() {
		var _this = this;
		TweenLite.to($(".cloud3"), 30, {
			//rotation: -3,
			left: -$(".cloud3").width() + "px",
			ease: Linear.easeNone,
			onComplete: function() {
				TweenLite.set($(".cloud3"), {
					left: $(window).width() + "px"
				});
				_this.cloud3_1();
			}
		});
	},
	cloud3_1: function() {
		var _this = this;
		TweenLite.to($(".cloud3"), 60, {
			//rotation: -3,
			left: -$(".cloud3").width() + "px",
			ease: Linear.easeNone,
			onComplete: function() {
				TweenLite.set($(".cloud3"), {
					left: $(window).width() + "px"
				});
				_this.cloud3_1();
			}
		});
	},
	whale1_tail: function() {
		var _this = this;
		if (!$.browser.ie678) {
			TweenLite.set($(".whale1 .tail"), {
				transformOrigin: "left bottom 0"
			});
			TweenLite.to($(".whale1 .tail"), 0.5, {
				rotation: -10,
				ease: Linear.easeNone,
				onComplete: function() {
					_this.whale1_tail1();
				}
			});
		}
	},
	whale1_tail1: function() {
		var _this = this;
		if (!$.browser.ie678) {
			TweenLite.to($(".whale1 .tail"), 0.5, {
				rotation: 10,
				ease: Linear.easeNone,
				onComplete: function() {
					_this.whale1_tail();
				}
			});
		}
	},
	whale1_water: function(arrs) {
		var _this = this;
		$(".whale1 ul li").each(function(i, elm) {
			var num = Math.random();
			TweenMax.to($(elm), 1, {
				opacity: 1,
				bezier: {
					type: "cubic",
					values: [{
						left: 44,
						top: -3
					}, {
						left: 44,
						top: -30
					}, {
						top: -30,
						left: (45 + (num < 0.5 ? 1 : -1) * 30)
					}, {
						left: (45 + (num < 0.5 ? 1 : -1) * 30),
						top: -10
					}]
				},
				ease: Linear.easeIn,
				delay: i * 0.05,
				onComplete: function() {
					TweenMax.to($(elm), 0.1, {
						opacity: 0
					});
					if (i == $(".whale1 ul li").length - 1) {
						_this.whale1_m2();
					}
				}
			});
		});
	},
	whale1_m1: function() {
		var _this = this;
		TweenLite.set($(".whale1"),{
			left: 1260,
			top: 340
		});
		TweenLite.to($(".whale1"), 4, {
			top: 270,
			left: 1140,
			ease: Linear.easeNone,
			onComplete: function() {
				_this.whale1_water();
			}
		});
	},
	whale1_m2: function() {
		var _this = this;
		TweenLite.to($(".whale1"), 4, {
			top: 340,
			left: 1060,
			ease: Linear.easeNone,
			onComplete: function() {
				setTimeout(function() {
					_this.whale2_m1();
				}, 3000);
			}
		});
	},
	whale2_tail: function() {
		var _this = this;
		if (!$.browser.ie678) {
			TweenLite.set($(".whale2 .tail"), {
				transformOrigin: "right bottom 0"
			});
			TweenLite.to($(".whale2 .tail"), 0.5, {
				rotation: -10,
				ease: Linear.easeNone,
				onComplete: function() {
					_this.whale2_tail1();
				}
			});
		}
	},
	whale2_tail1: function() {
		var _this = this;
		if (!$.browser.ie678) {
			TweenLite.to($(".whale2 .tail"), 0.5, {
				rotation: 10,
				ease: Linear.easeNone,
				onComplete: function() {
					_this.whale2_tail();
				}
			});
		}
	},
	whale2_water: function(arrs) {
		var _this = this;
		$(".whale2 ul li").each(function(i, elm) {
			var num = Math.random();
			TweenMax.to($(elm), 1, {
				opacity: 1,
				bezier: {
					type: "cubic",
					values: [{
						left: 82,
						top: -3
					}, {
						left: 82,
						top: -30
					}, {
						top: -30,
						left: (82 + (num < 0.5 ? 1 : -1) * 30)
					}, {
						left: (82 + (num < 0.5 ? 1 : -1) * 30),
						top: -10
					}]
				},
				ease: Linear.easeIn,
				delay: i * 0.05,
				onComplete: function() {
					TweenMax.to($(elm), 0.1, {
						opacity: 0
					});
					if (i == $(".whale2 ul li").length - 1) {
						_this.whale2_m2();
					}
				}
			});
		});
	},
	whale2_m1: function() {
		var _this = this;
		TweenLite.set($(".whale2"), {
			left: 1200,
			top: 340
		});
		TweenLite.to($(".whale2"), 4, {
			top: 270,
			left: 1340,
			ease: Linear.easeNone,
			onComplete: function() {
				_this.whale2_water();
			}
		});
	},
	whale2_m2: function() {
		var _this = this;
		TweenLite.to($(".whale2"), 4, {
			top: 340,
			left: 1440,
			ease: Linear.easeNone,
			onComplete: function() {
				setTimeout(function() {
					_this.whale1_m1();
				}, 5000);
			}
		});
	},
	boatS1: function() {
		var _this = this;
		if (!$.browser.ie678) {
			TweenLite.to($(".boat"), 1.5, {
				rotation: -3,
				left: "-150px",
				ease: Linear.easeNone,
				onComplete: function() {
					_this.boatS2();
				}
			});
		} else {
			TweenLite.to($(".boat"), 1.5, {
				left: "-150px",
				ease: Linear.easeNone,
				onComplete: function() {
					_this.boatS2();
				}
			});
		}
	},
	boatS2: function() {
		var _this = this;
		if (!$.browser.ie678) {
			TweenLite.to($(".boat"), 1.5, {
				rotation: 2,
				left: "-75px",
				ease: Linear.easeNone,
				onComplete: function() {
					_this.boatS3();
				}
			});
		} else {
			TweenLite.to($(".boat"), 1.5, {
				left: "-75px",
				ease: Linear.easeNone,
				onComplete: function() {
					_this.boatS3();
				}
			});
		}
	},
	boatS3: function() {
		var _this = this;
		if (!$.browser.ie678) {
			TweenLite.to($(".boat"), 1.5, {
				rotation: -1,
				left: "0",
				ease: Linear.easeNone,
				onComplete: function() {
					_this.boatS4();
				}
			});
		} else {
			TweenLite.to($(".boat"), 1.5, {
				left: "0",
				ease: Linear.easeNone,
				onComplete: function() {
					_this.boatS4();
				}
			});
		}
	},
	boatS4: function() {
		var _this = this;
		if (!$.browser.ie678) {
			TweenLite.to($(".boat"), 1.5, {
				rotation: 1,
				left: "30px",
				ease: Linear.easeNone,
				onComplete: function() {
					_this.boatS3();
				}
			});
		} else {
			TweenLite.to($(".boat"), 1.5, {
				left: "30px",
				ease: Linear.easeNone,
				onComplete: function() {
					_this.boatS3();
				}
			});
		}
	},
	wave1: function() {
		var _this = this;
		TweenLite.to($(".wave1"), 1000, {
			"backgroundPosition": "-25000px 0",
			ease: Linear.easeNone,
			onComplete: function() {
				TweenLite.set($(".wave1"), {
					"backgroundPosition": "0 0"
				});
				_this.wave1();
			}
		});
	},
	wave2: function() {
		var _this = this;
		TweenLite.to($(".wave2"), 1000, {
			"backgroundPosition": "30000px 0",
			ease: Linear.easeNone,
			onComplete: function() {
				TweenLite.set($(".wave2"), {
					"backgroundPosition": "0 0"
				});
				_this.wave2();
			}
		});
	},
	wave3_1: function() {
		var _this = this;
		TweenLite.to($(".wave3"), 6, {
			"marginLeft": "-765px",
			ease: Linear.easeNone,
			onComplete: function() {
				_this.wave3_2();
			}
		});
	},
	wave3_2: function() {
		var _this = this;
		TweenLite.to($(".wave3"), 6, {
			"marginLeft": "-834px",
			ease: Linear.easeNone,
			onComplete: function() {
				_this.wave3_1();
			}
		});
	},
	wave6_1: function() {
		var _this = this;
		TweenLite.to($(".wave6"), 6, {
			"marginLeft": "70px",
			ease: Linear.easeNone,
			onComplete: function() {
				_this.wave6_2();
			}
		});
	},
	wave6_2: function() {
		var _this = this;
		TweenLite.to($(".wave6"), 6, {
			"marginLeft": "164px",
			ease: Linear.easeNone,
			onComplete: function() {
				_this.wave6_1();
			}
		});
	},
	bottle_1: function() {
		var _this = this;
		if (!$.browser.ie678) {
			TweenLite.to($(".bottle"), 2, {
				rotation: -10,
				ease: Linear.easeNone,
				onComplete: function() {
					_this.bottle_2();
				}
			});
		} else {
			TweenLite.to($(".bottle"), 2, {
				ease: Linear.easeNone,
				onComplete: function() {
					_this.bottle_2();
				}
			});
		}
	},
	bottle_2: function() {
		var _this = this;
		if (!$.browser.ie678) {
			TweenLite.to($(".bottle"), 2, {
				rotation: 0,
				ease: Linear.easeNone,
				onComplete: function() {
					_this.bottle_1();
				}
			});
		} else {
			TweenLite.to($(".bottle"), 2, {
				ease: Linear.easeNone,
				onComplete: function() {
					_this.bottle_1();
				}
			});
		}
	}
};

/*玩*/
$(function() {
	var play = {
		moving: false,
		down: function() {
			var _this = this;
			TweenLite.to($(".football"), 1, {
				top: 64,
				rotation: 360,
				ease: Power1.easeIn,
				onComplete: function() {
					TweenLite.set($(".football"), {
						rotation: 0
					})
					_this.up();
				}
			});
		},
		up: function() {
			var _this = this;
			TweenLite.to($(".football"), 1, {
				top: 30,
				rotation: 360,
				ease: Power1.easeOut,
				onComplete: function() {
					TweenLite.set($(".football"), {
						rotation: 0
					})
					if (_this.moving) {
						_this.down()
					}
				}
			});
		},
		stop: function() {
			this.moving = false;
		},
		start: function() {
			var _this = this;
			if (!_this.moving) {
				_this.moving = true;
				_this.down();
			}
		}
	};

	$(".play").on("mouseenter", function() {
		if (!$.browser.ie678) {
			play.start();
		}
	}).on("mouseleave", function() {
		if (!$.browser.ie678) {
			play.stop();
		}
	});
});

/*看*/
$(function() {
	var look = {
		moving: false,
		rotate: function() {
			var _this = this;
			TweenLite.to($(".kan1"), 1, {
				rotation: 360,
				ease: Linear.easeNone,
				onComplete: function() {
					TweenLite.set($(".kan1"), {
						rotation: 0
					})
					if (_this.moving) {
						_this.rotate()
					}
				}
			});
			TweenLite.to($(".kan2"), 1, {
				rotation: 360,
				ease: Linear.easeNone,
				onComplete: function() {
					TweenLite.set($(".kan2"), {
						rotation: 0
					})
					if (_this.moving) {
						_this.rotate()
					}
				}
			});
			TweenLite.to($(".kan3"), 0.5, {
				opacity: 0,
				ease: Linear.easeNone,
				onComplete: function() {
					TweenLite.to($(".kan3"), 0.5, {
						opacity: 1,
						ease: Linear.easeNone
					});
				}
			});
		},
		stop: function() {
			this.moving = false;
		},
		start: function() {
			var _this = this;
			if (!_this.moving) {
				_this.moving = true;
				_this.rotate();
			}
		}
	};

	$(".look").on("mouseenter", function() {
		if (!$.browser.ie678) {
			look.start();
		}
	}).on("mouseleave", function() {
		if (!$.browser.ie678) {
			look.stop();
		}
	});
});

/*学*/
$(function() {
	var study = {
		moving: false,
		step1: function() {
			var _this = this;
			TweenLite.to($(".xue1"), 0.5, {
				rotation: 30,
				left: 55,
				top: 65,
				ease: Linear.easeNone
			});
			TweenLite.to($(".xue2"), 0.5, {
				rotation: 125,
				left: 40,
				top: 60,
				ease: Linear.easeNone,
				onComplete: function() {
					_this.step2();
				}
			});
		},
		step2: function() {
			var _this = this;
			TweenLite.to($(".xue2"), 0.5, {
				left: 70,
				top: 50,
				ease: Linear.easeNone,
				onComplete: function() {
					_this.step3();
				}
			});
		},
		step3: function() {
			var _this = this;
			TweenLite.to($(".xue1"), 0.5, {
				rotation: 0,
				left: 70,
				top: 41,
				ease: Linear.easeNone
			});
			TweenLite.to($(".xue2"), 0.5, {
				rotation: 0,
				left: 100,
				top: 58,
				ease: Linear.easeNone,
				onComplete: function() {
					if (_this.moving) {
						_this.step1();
					}
				}
			});
		},
		stop: function() {
			this.moving = false;
		},
		start: function() {
			var _this = this;
			if (!_this.moving) {
				_this.moving = true;
				_this.step1();
			}
		}
	};

	$(".study").on("mouseenter", function() {
		if (!$.browser.ie678) {
			study.start();
		}
	}).on("mouseleave", function() {
		if (!$.browser.ie678) {
			study.stop();
		}
	});
});


var options = {
	delay: 0,
	pause: false,
	onComplete: function(){},
	onCompleteScope: {},
	useFrames: true,
	tweens: [],
	stagger: 0,
	align: '',
	onStart: function(){},
	onStartScope: {},
	onUpdate: function(){},
	onUpdateScope: {},
	onRepeat: function(){},
	onRepeatScope: {},
	onReverseComplete: function(){},
	onReverseCompleteScope: {},
	autoRemoveChildren: false,
	smoothChildTiming: false,
	repeat: 0,
	repeatDelay: 0,
	yoyo: false,
	onCompleteParams: [],
	onReverseCompleteParams: [],
	onStartParams: [],
	onUpdateParams: [],
	onRepeatParams: [],
	callbackScope: {}
};
// var tl = new TimelineMax(options);

.recent()
var tl = new TimelineLite();
tl.to(e1, 999, {x:100, repeat: 5})//一个非常长的tween
  .to(e2, 1, {y：200}, 0.5)//在0.5s的时候插入这个tween，相对timeline的起始时间
  .to(e3, 1, {scaleX:2}, tl.recent().endTime() + 3);//在e2 tween之后的3秒，插入一个新的tween


.add()
// 在timeline end加一个tween
tl.add(TweenLite.to(element, 2,{left:100}));
// 在1.5s的位置加一个callback
tl.add(func, 1.5);
// 在timeline end 2s之后加一个label
tl.add('myLabel', '+=2');
// 在`myLabel`的位置加一个timeline
tl.add(otherTimeline, 'myLabel');
// 在`myLabel`之后的2s加一组tween
tl.add([tween1, tween2, tween3], 'myLabel+=2');
// 加一组tween，相互之间间距0.5s，在timeline end 2s的位置
tl.add([tween1, tween2, tween3], '+=2', 'sequence', 0.5);


.to()
myTimeline.add(TweenLite.to(element, 1, {left:100, opacity:0.5}));
myTimeline.to(element, 1, {left:100, opacity:0.5});//直接加一个tween到timeline，不需要add再to。比较方便。。

var tl = new TimelineLite({onComplete:myFunction});
tl.to(element, 1, {left:100})
  .to(element, 1, {top:50}, '-=0.25')
  .set(element, {opacity:0})
  .call(otherFunction)
  .staggerTo([e1, e2, e3], 1.5, {rotation:45}, 0.25);











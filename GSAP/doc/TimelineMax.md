# TimelineMax

	var options = {
		delay: 0,
		pause: false,
		onComplete: function(){},
		onCompleteScope: {},
		useFrames: true,
		tweens: [],
		stagger: 0,
		align: 'normal',
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
	var tl = new TimelineMax(options);

## Constructor详解：
- onComplete： 动画完成之后的回调
- onCompleteScope： 定义omComplete方法的this对象
- useFrames： 是否基于frame，如果false，使用second。默认frame
- tweens： 在时间轴上插入几个区间，和align和stagger结合使用，用最少的代码生成复杂的序列。这些值传递给add()方法
- stagger： 和tweens属性一起使用，【如果'stagger'为'0.5'，'align'为'start'，第二个tween会在第一个tween开始之后的0.5秒后执行，再过0.5秒，第三个tween执行。如果'align'为'sequence'，那么就是在每个tween之间加0.5秒，这个值传递给'add()'方法，默认值0。
- align： 和tweens属性一起使用，默认值是'normal'。可供选择的值：`sequence`（一个一个tweens按照顺序执行）、`start`（都在开始的时候执行，忽略delay）、`normal`（都在开始的时候执行，考虑delay）
- onStart： tween开始时的回调（可以多次执行，如果该tween重复执行了多次）
- onUpdate： 每次动画更新的时候调用
- onRepeat： 每次动画重复的时候调用
- onReverseComplete： 当动画返回到初始状态的时候调用。例，如果使用了`reverse()`，tween回到time=0的时候，就会调用这个啦。
- autoRemoveChildren： 如果为`true`，每次child tweens/timelines执行完毕，会自动销毁。一般不会这样设置，不然动画没法倒退，比如没法使用`reverse()`或自由调整progress。但是，它可以提高速度以及内存管理。root timelines使用的默认值为'true'。
- smoothChildTiming： 控制 当属性变化的时候 是否平滑过渡。如，如果一个 timelines 的 playhead 是在一个 child tween 75% 的位置（将元素的`left`从`0`变为`100`），然后调用`reverse()`方法。如果smoothChildTiming的值为'false'（默认，root timelines除外），这个tween会突然跳到那个位置，和开始时间保持一致。这样timeline的playhead就会在tween 25%的位置而不是75%。PS：timeline的playhead的位置和方向是不受 child tween/timeline的playhead的影响的。如果值为`true`，child tween的starttime会调整到和timeline的playhead相同的位置（也就是上面的75%）。同样影响的还有：reversed, timeScale, progress, totalProgress, time, totalTime, delay, pause, resume, duration, totalDuration。
- repeat： 动画要重复执行多少次，如果值为1，那就是一共执行2次啦~无限执行的话，值设置为`-1`
- repeatDelay： 重复执行动画，中间的间隔时长
- yoyo： 如果为'true'，动画的repeat的时候，方向是交替的。
- callbackScope：  所有callback的。。。。(onStartScope, onUpdateScope, onCompleteScope, onReverseComplete, etc.) 

## 属性
- autoRemoveChildren
- data 用来存放各种需要的数据
- smoothChildTiming
- timeline 每个动画都是放在一个timeline(有且只有一个)上的，（默认有个root timeline）。
- vars 

## 方法
### .recent():Animaton 返回最近add的child tween/timeline/callback，不考虑其在timeline上的位置


	var tl = new TimelineLite();
	tl.to(e1, 999, {x:100, repeat: 5})//一个非常长的tween
	  .to(e2, 1, {y：200}, 0.5)//在0.5s的时候插入这个tween，相对timeline的起始时间
	  .to(e3, 1, {scaleX:2}, tl.recent().endTime() + 3);//在e2 tween之后的3秒，插入一个新的tween


### .add(value:*, position:*, align:String, stagger:Number):* 在当前时间轴上增加一个tween,tiemline,callback,or label

- value 要增加的tween, timeline, callback, label（一个或多个，可以是数组）
- position 对象在timeline上的位置（默认`+=0`）。`+=2`在end之后的2s执行，中间有个2s的空白。`-=2`那就提前？可以创建一个label，如`myLabel`，让这个东西准确地插入到时间轴上，当然`myLabel`或`myLabel+=3`也是可以的。如果这个label之前没有定义，会自动被添加到当前timeline end的位置，super方便。关于position这个东西，貌似还有篇文可以看看：https://greensock.com/position-parameter【有空再看看】
- align 只有在value是一个数组时才有意义。这个属性定义了这些 tweens/timelines/callbacks/labels 数组相互之间的关系。值有`sequence`(one after another), `start'(忽略delay，all the same start time), `normal`(all the same start time，考虑delay)，默认值`normal`
- stagger 同align，只有在value是一个数组时才有意义。

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

.addCallback(callback:Function, position:*, params:Array, scope:*):TimelineMax 在特定的位置插入一个callback

- callback 要调用的函数
- position 回调插入的位置。如：myTimeline.addCallback(myFunction, 3)，表示在3s的位置调用myFunction()。然后，myTimeline.addCallback(myFunction, 'myLabel')，表示再'myLabel'的位置调用myFunction()。
- params 要传递过去的参数
- scope this对象

### .addLabel(label:String, position:*):* 在timeline上加一个label，用来标记重要的位置/时间

- label
- position 


### .to(target:Object, duration:Number, vars:Object, position:*):* 在timeline end添加一个tween
<!-- 先看这个，比较重要 -->

- target 对象【可以是一个DOM元素（单个or多个），一个jQuery对象，一个CSS选择器'.author'。
- duration 时长
- vars 这个厉害了。要改变的属性（普通的css属性or特殊的属性，如onComplete =_=如果我没记错，这个是完成tween之后的回调吧？）
- position 在timeline上的位置


	myTimeline.add(TweenLite.to(element, 1, {left:100, opacity:0.5}));
	myTimeline.to(element, 1, {left:100, opacity:0.5});//直接加一个tween到timeline，不需要add再to。比较方便。。

	var tl = new TimelineLite({onComplete:myFunction});
	tl.to(element, 1, {left:100})
	  .to(element, 1, {top:50}, '-=0.25')
	  .set(element, {opacity:0})
	  .call(otherFunction)
	  .staggerTo([e1, e2, e3], 1.5, {rotation:45}, 0.25);


> 因为周末回家放了个小假，回来接着看文档感觉需要把前面的梳理一下才能接着往下看【这时候就考验自己前面会不会写得乱七八糟了】_(:зゝ∠)_心塞.gif

### adPause()

call()

clear()

currentLabel()

duration()

endTime()

eventCallback()

TimelineMax.exportRoot()

from()

fromTo()

getActive()

getChildren()

getLabelAfter()

getLabelBefore()

getLabelsArray()

getLabelTime()

getTweensOf()

invalidate()

isActive()

kill()

pause()

paused()

play()

progress()

remove()

removeCallback()

removeLabel()

removePause()

render()

repeat()

repeatDelay()

restart()

resume()

reverse()

reversed()

seek()

set()

shiftChildren()

staggerFrom()

staggerFromTo()

staggerTo(targets:Array, duration:Number, vars:Object, stagger:Number, position:*, onCompleteAll:Function, onCompleteAllParams:Array, onCompleteScope:*):*
在给DOM元素添加动画时，targets可以是：元素数组，一个jQuery对象，CSS选择器字符串。


startTime(value:Number):*
get or set动画在父时间轴开始的时间
	var start = myAnimation.startTime();
	myAnimation.startTime(2);


time(value:Number, suppressEvents:Boolean):*
get or set playhead的当前位置，不包含repeats或repeatDelays
使用：
	var currentTime = myTimeline.time();
	myTimeline.time(2);


timeScale(value:Number):*
缩放动画的时间，1表示常速，0.5表示半速，2表示两倍速【简单说，调整速度？
使用：
	var currentTimeScale = myAnimation.timeScale();
	myAnimation.timeScale(0.5);


totalDuration(value:Number):*
使用:
	var total = myTimeline.totalDuration();
	myTimeline.totalDuration();


totalProgress(value:Number, suppressEvents:Boolean):*
get or set timeline的总进度条，值在[0, 1]之间。
参数：
value:Number 缺省参数，则返回当前值(get)。
使用：
	var progress = myAnimation.totalProgress();
	myAnimation.totalProgress(0.25);


totalTime(time:Number, suppressEvents:Boolean):*
根据`totalDuration()`获取(get)或设置(set)playhead的位置
参数：
time:Number 缺省参数，则返回当前值(get)。如果有参数，返回实例本身。值为负，表示动画的末尾。
suppressEvents:Boolean 默认false，如果为true，当playhead移动到新位置时，不会触发`time`位置的任何事件or回调
使用：
	var tt = myAnimation.totalTime();
	myAnimation.totalTime(2);

tweenFromTo(fromPosition, toPosition, vars:Object):TweenLite 


tweenTo(position:*,vars:Object):TweenLite -创建一个线性tween的渐变，将playhead到一个特定的时间or label连接起来。
`myTimeline.tweenTo(5)`回从当前timeline在的位置，移动到5秒的点。
`myTimeline.tweenTo("myLabel")`会移动到对应myLabel的位置。
`vars`可选，默认null，可以定义一个onComplete ease delay 或其它TweenLite特殊属性
返回一个TweenLite实例

	myTimeline.tweenTo(5, {onComplete:myFunction, onCompleteParams[myTimeline], ease:Strong.easeOut});


useFrames():Boolean -timeline的默认事件模式是second，如果设置了`useFrames()`，那么事件模式是基于frames的。
只读，不接收参数，返回Boolean值。
在contructor中的vars参数中设置，或者是外部时间模式已经是frames的情况下才可以使用，嵌套在某段上(这里文档不清晰，目测是父timeline里面的子timeline里)。


yoyo(value: Boolean):* -获取(get)或者设置(set) timeline的yoyo状态
默认值false
省略参数表示get操作，返回当前的yoyo值。有参数则表示set，返回实例本身。
yoyo同repeat一起使用，(因为没有repeat，设置yoyo也没什么意义了呀= =)
**使用：**
	
	var yoyo = myTimeline.yoyo();//getter
	myTimeline.yoyo(true);//setter



















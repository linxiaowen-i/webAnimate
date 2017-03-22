# webAnimate
稍微整理一下css动画

1 什么是关键帧？
关键帧就是一个描述在整个动画过程中，会发生变化的属性列表（也就是，哪些属性会改变，如何改变以及什么时候改变）。
【对CSS属性要熟

	@keyframe drive{

	}

2 定义关键帧：
	@keyframe drive{
		from{
			transform: translateX(0);
		}
		to{
			transform: translateX(400px);
		}
	}
非常简单的动画，可以直接用from to ，也可以用0% 100%等，百分比不需要按照顺序来写，这个东西是描述性的。

3 将动画赋给html

	animation-name: drive; //告诉图像，应用哪组关键帧
	animation-duration: 2s; //时长

4 关于动画属性
- `animation-delay`
- `animation-fill-mode` 接受四个值：`none`、`backwards`、`forwards`和`both`

默认值`none`，动画结束的时候，回到初始位置。
`forwards` 动画结束之后，保持它最后一帧的样式
`backwards` 小球会在`animation-delay`时变成我们0%关键帧定义的样式
`both` 是`forwards`和`backwards`的结合
	
- `animation-direction` 它的值可以是`normal`（正常）, `reverse`（反转）, `alternate`（交替）和`alternate-reverse`（交替反转）

---

属性都可以简写到`animation`里，（顺序不一样没关系，但是一些如果是相似的值，如delay和duration，默认先duration，后delay。）
	
	animation: myAnimation 1s ease-in-out 2s 4;
	animation: <animation-name> <animation-duration> <animation-timing-function> <animation-delay> <animation-iteration-count>
	
W3C定义的简写顺序：
	
	<single-animation> = <single-animation-name> || <time> || <single-animation-timing-function> || <time> || <single-animationiteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state>
	
一个元素用两个动画：
	
	animation: myAnimation 1s ease-in-out 2s 4, myOtherAnimation 4s ease-out 2s;

5 easing
Easing是速率被分配到整个动画过程中的方式。
在CSS动画中，是用`animation-timing-function`这个属性处理的
有三种定义方式：
	关键字；自定义三次贝塞尔曲线；steps
- 预定义的关键字有：`ease` (默认); `linear`（线性，匀速）; `ease-in`（从慢到快，蓄势待发？？？）; `ease-out`（快到慢）和`ease-in-out`（慢->快->慢）。
	ease值得到的Easing移动是ease-in-out的变体；ease在结束的时候有一个更剧烈的减速
- 贝塞尔曲线：（在线生成：http://cubic-bezier.com/）
  	常见的动画：
  	1 无限循环的背景动画

- 使用steps让雪碧图动起来

- 使用animation-play-state来启动或停止动画

- 多个动画，一个对象

- 性能及浏览器支持情况





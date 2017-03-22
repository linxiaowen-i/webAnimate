# webAnimate
稍微整理一下css动画

## 1 什么是关键帧？
关键帧就是一个描述在整个动画过程中，会发生变化的属性列表（也就是，哪些属性会改变，如何改变以及什么时候改变）。
【对CSS属性要熟】
可以用于写动画的CSS属性：https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties

    @keyframe drive{

    }

## 2 定义关键帧：
    
    @keyframe drive{
        from{
            transform: translateX(0);
        }
        to{
            transform: translateX(400px);
        }
    }
    
    @keyframe drive{
        0%{
            transform: translateX(0);
        }
        100%{
            transform: translateX(400px);
        }
    }
    
非常简单的动画，可以直接用`from to` ，也可以用`0% 100%`等，百分比不需要按照顺序来写，这个东西是描述性的。

## 3 将动画赋给html

    animation-name: drive; //告诉图像，应用哪组关键帧
    animation-duration: 2s; //时长

## 4 关于动画属性
常用的：
- `animation-name`
- `animation-duration`
- `animation-timing-function: ease;`//动画的时间函数
- `animation-iteration-count: 1;`//动画执行的次数，默认值1
- `animation-delay`

 - `animation-fill-mode` 可以接受四个值：`none`、`backwards`、`forwards`和`both`

默认值`none`，动画结束的时候，回到初始位置。
`forwards` 动画结束的时候，最后一帧在哪就在哪，**保持它最后一帧的样式**
`backwards` 小球会在`animation-delay`时变成我们**`0%`关键帧定义的样式**
`both` 是`forwards`和`backwards`的结合
    
- `animation-direction` 它的值可以是`normal`（正常）, `reverse`（反转）, `alternate`（交替）和`alternate-reverse`（交替反转）

---

> 属性都可以简写到`animation`里，（顺序不一样没关系，但是一些如果是相似的值，如`delay`和`duration`，默认先`duration`，后`delay`。）
    
    animation: myAnimation 11s ease-in-out 12s 4;
    animation: <animation-name> <animation-duration> <animation-timing-function> <animation-delay> <animation-iteration-count>

## 5 easing

Easing是速率被分配到整个动画过程中的方式。
在CSS动画中，是用`animation-timing-function`这个属性处理的
有三种定义方式：

> 关键字；自定义三次贝塞尔曲线；steps

- 预定义的关键字有：`ease` (默认); `linear`（线性，匀速）; `ease-in`; `ease-out`（快到慢）和`ease-in-out`（慢->快->慢）。
    ease值对应的Easing移动是ease-in-out的变体；ease在结束的时候有一个更剧烈的减速

- 贝塞尔曲线：（在线生成：http://cubic-bezier.com/）【Chrome devtool可以调试】

## `steps`+雪碧图

- 使用`animation-play-state`来启动或停止动画

- 多个动画，一个对象
    
一个元素用两个动画（用逗号隔开）：
    
    animation: myAnimation 1s ease-in-out 2s 4, myOtherAnimation 4s ease-out 2s;

- 性能及浏览器支持情况





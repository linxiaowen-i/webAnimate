## CSS3动画相关的属性
- `transform`
- `transition`
- `animation`

`transform`包括：`rotate`,`scale`,`skew`,`translate`,`matrix`

    transform: rotate scale skew translate matrix

### `transform`
#### `rotate`
    
    transform: rotate(30deg); //顺时针方向，0默认正上方

#### `translate` 2D位移
    
    transform: translate(x, y);
    transform: translateX();
    transform: translateY();

#### `scale` 2D缩放

    transform: scale(2, 1.5);
    transform: scaleX(2);
    transform: scaleY(2);

#### `skew` 扭曲

    transform: skew(30deg);
    transform: skewX(30deg);
    transform: skewY(30deg);

#### `matrix` 矩阵 2D变换

    transform-origin: (left, top);
    tranform: matrix(1,1,1,2,2,2);
    
| a  c  e |

| b  d  f |

| 0  0  1 |

3D变换 16个值的矩阵

---

中心点: transform-origin: x y z;

值：
- x: top center right length
- y: top center bottom length
- z: length

可以应用多个属性，用**空格**（空格 空格 空格）隔开。
如：

    transform: translateX(-100px) rotate(-360deg);

### `transition`
### `animation`




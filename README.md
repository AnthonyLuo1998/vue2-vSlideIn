# vue2-vSlideIn

## 介绍
基于Vue2自定义指令，封装的一个dom元素渐进/滑出动画指令。

## 使用案例1（全局配置）
```
// main.js
// 引入文件
import { setupVSlideIn } from "./directives/v_slide_in";
// 注册全局指令&全局配置
Vue.use(setupVSlideIn({ direction: "left", offset: 100, duration: 1000, iterations: 1 }));

// Home.vue
<div v-slide-in class="box"></div>
```

## 使用案例2（局部配置）
```
// main.js
// 引入文件
import { setupVSlideIn } from "./directives/v_slide_in";
// 注册全局指令&全局配置
Vue.use(setupVSlideIn({ direction: "left", offset: 100, duration: 1000, iterations: 1 }));

// Home.vue
<div v-slide-in="{ direction: 'top' }" class="box"></div>
```

# vue2-vSlideIn

## 介绍

基于 Vue2 自定义指令，封装的一个 dom 元素渐进/滑出动画指令。

## 使用案例 1（全局注册）

```
// main.js
// 引入文件
import { setupVSlideIn } from "./directives/v_slide_in";
// 注册全局指令&全局配置
Vue.use(setupVSlideIn({ direction: "left", offset: 100, duration: 1000, iterations: 1 }));

// Home.vue
<div v-slide-in class="box"></div>
```

## 使用案例 2（组件内使用）

```
// main.js
// 引入文件
import { vSlideIn } from "./directives/v_slide_in";

// Home.vue
<template>
    <div v-slide-in="{ direction: 'top' }" class="box">
</template>

<script>
export default {
  name: "App",
  directives: {
    lazy: vSlideIn(config),
  },
};
</script>
```

// 存储被观察元素以及配置
const hashMap = new WeakMap();

// 观察者
const ob = new IntersectionObserver((els) => {
  els.map((el) => {
    if (!el.isIntersecting) return;
    let target;
    if ((target = hashMap.get(el.target))) {
      target.element.animate(...Object.values(generateAnimate(target.config)));
      ob.unobserve(el.target);
    }
  });
});

/**
 * @description 构造指令对象
 * @param {{ direction: "top" | "bottom" | "left" | "right", offset: number, duration: number, iterations: number }} config
 */
export function vSlideIn(config) {
  // 配置接收的参数类型
  const accessTypes = ["Object", "Undefined"];
  let globalConfigType;
  if (!accessTypes.includes((globalConfigType = mineTypeof(config)))) {
    console.warn(
      `Warning[v-slide-in]: Failed options type: Invalid options value of type ${globalConfigType}, expected Object`
    );
  }
  // 默认配置
  let defaultConfig = {
    offset: 20,
    direction: "bottom",
    duration: 1000,
    iterations: 1,
  };
  // 全局配置
  let globalConfig = {};
  // 是否传入全局配置
  config
    ? (globalConfig = {
        ...defaultConfig,
        ...config,
      })
    : (globalConfig = defaultConfig);
  // 指令对象
  const vSlideIn = {
    bind(_el, binding) {
      // 类型边界处理
      let localConfigType;
      if (
        !accessTypes.includes((localConfigType = mineTypeof(binding.value)))
      ) {
        console.warn(
          `Warning[v-slide-in]: Failed binding type: Invalid binding value of type ${localConfigType}, expected Object`
        );
      }
      // 合并选项或赋值默选项
      if (binding.value) {
        binding.value = {
          ...globalConfig,
          ...binding.value,
        };
      } else {
        binding.value = globalConfig;
      }
    },
    inserted(el, binding) {
      hashMap.set(el, {
        element: el,
        config: binding.value,
      });
      ob.observe(el);
    },
    unbind(el) {
      hashMap.delete(el);
      ob.unobserve(el);
    },
  };
  return vSlideIn;
}

/**
 * @description 根据开发者传入的选项生成动画
 * @param {{ direction: "top" | "bottom" | "left" | "right", offset: number, duration: number, iterations: number }} config
 */
function generateAnimate(config) {
  const { direction, offset, duration, iterations } = config;

  const map = {
    left: {
      axis: "X",
      offset: `(-${offset}px)`,
    },
    right: {
      axis: "X",
      offset: `(${offset}px)`,
    },
    top: {
      axis: "Y",
      offset: `(-${offset}px)`,
    },
    bottom: {
      axis: "Y",
      offset: `(${offset}px)`,
    },
  };

  const keyFrame = [
    {
      transform: `translate${map[direction].axis}${map[direction].offset}`,
      opacity: "0",
    },
    { transform: `translate${map[direction].axis}(0px)`, opacity: "1" },
  ];

  const options = {
    duration,
    iterations,
  };

  return {
    keyFrame,
    options,
  };
}

/**
 * @description 值类型判断
 * @param {unknown} value
 */
function mineTypeof(value) {
  const typeStr = Object.prototype.toString.call(value).split(" ")[1];
  const type = typeStr.slice(0, typeStr.length - 1);
  return type;
}

/**
 * @description 挂载指令
 * @param {{ direction: "top" | "bottom" | "left" | "right", offset: number, duration: number, iterations: number }} config
 */
export function setupVSlideIn(config) {
  return (Vue) => Vue.directive("slideIn", vSlideIn(config));
}

import { cubicInOut } from 'svelte/easing';


export const slidefade = (
  /** @type {Element} */ node,
  /** @type {{ delay?: number; isEntering?: boolean; duration?: number; easing?: any; }} */ params
) => {
  const existingTransform = getComputedStyle(node).transform.replace('none', '');

  return {
    delay: params.delay || 0,
    duration: params.duration || 300,
    easing: params.easing || cubicInOut,
    css: (/** @type {number} */ t, /** @type {number} */ u) => {
      // move to the right during enter, move to the left during exit
      // add a fade effect during both
      // scale in during enter, scale out during exit. lowest scale is 90%
      if (params.isEntering)
        return `transform: translateX(${(t - 1) * 10}%) scale(${t * 0.1 + 0.9
          }) ${existingTransform}; opacity: ${t};`;
      else
        return `transform: translateX(${(1 - t) * 10}%) scale(${t * 0.1 + 0.9
          }) ${existingTransform}; opacity: ${t};`;
    }
  };
};
function noop() {}

function ensureFunction(fn) {
  const isFn = typeof fn === 'function';
  return isFn ? fn : noop;
}

export const messageBox = {
  alert(message, callback) {
    const opt = {
      skin: 'layui-layer-molv', //样式类名
      closeBtn: 0
    };
    const layerId = layer.alert(message, opt, () => {
      layer.close(layerId);
      ensureFunction(callback).call(null);
    });
  }
};

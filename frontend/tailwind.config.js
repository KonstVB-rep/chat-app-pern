module.exports = {
    future: {
        hoverOnlyWhenSupported: true
      },
    theme: {
      extend: {
        screens: {
          'touch': { 'raw': '(hover: none) or (pointer: coarse)' }, // Для тач-устройств
          'hover': { 'raw': '(hover: hover) and (pointer: fine)' },  // Для устройств с hover (мышь, трекпад)
        },
      },
    },
  };
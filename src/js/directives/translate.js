'use strict';

module.exports = function() {
  return {
    template: function(elem, attr) {
      return '{{ $root.translate("' + attr.translate + '") }}';
    }
  };
};

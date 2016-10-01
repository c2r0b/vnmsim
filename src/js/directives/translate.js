'use strict';

module.exports = function() {
  return {
    template: function(elem, attr) {
      return '{{ $root.translations[$root.selectedLang].text["' + attr.translate + '"] }}';
    }
  };
};

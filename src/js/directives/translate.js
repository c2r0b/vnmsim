export default function TranslateDirective() {
  return {
    template: function(elem, attr) {
      return '{{ $root.translate("' + attr.translate + '") }}'
    }
  }
}

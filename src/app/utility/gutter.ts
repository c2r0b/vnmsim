import { gutter, GutterMarker } from '@codemirror/view'

class NumberMarker extends GutterMarker {
	private number:number

	constructor(number:number) {
		super()
		this.number = number
	}

	eq(other) {
		return this.number === other.number
	}

	toDOM(_view) {
		return document.createTextNode((this.number - 1).toString())
	}
}

const maxLineNumber = (lines) => {
	let last = 9
	while (last < lines) last = last * 10 + 9
	return last
}

export const lineNumbersExtension = gutter({
	class: "cm-lineNumbers",
	renderEmptyElements: false,
	
	lineMarker(view, line, others) {
		if (others.some((m) => m.toDOM)) return null
		return new NumberMarker(view.state.doc.lineAt(line.from).number)
	},
	initialSpacer(view) {
		return new NumberMarker(maxLineNumber(view.state.doc.lines))
	},
	updateSpacer(spacer, update) {
		let max = maxLineNumber(update.view.state.doc.lines)
		return new NumberMarker(max)
	},
	domEventHandlers: {
		click(view, line, event) {
			return true
		}
	}
})
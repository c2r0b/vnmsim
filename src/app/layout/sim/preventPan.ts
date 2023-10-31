// prevent pan on inputs
export const preventPan = (e, x, y, refs) => {
	for (let ref of refs) {
		if (e.target === ref?.current) {
			return true
		}

		const contentRect = ref?.current?.getBoundingClientRect()

		const x1 = contentRect.left
		const x2 = contentRect.right
		const y1 = contentRect.top
		const y2 = contentRect.bottom

		if ((x <= x1 && x >= x2) && (y >= y1 && y <= y2)) {
			return true
		}
	}

	return false
}
import React from 'react'

import { Spinner } from '@fluentui/react-components'
import { useSelector } from 'react-redux'
import { isSimulatorRunning } from 'src/selectors'

export default () => {
	const isRunning = useSelector(isSimulatorRunning)

	// display running spinner according to sim status
	if (!isRunning) {
		return null
	}
	return (
		<Spinner
			size="small"
			aria-live="assertive"
			labelPosition="before"
		/>
	)
}
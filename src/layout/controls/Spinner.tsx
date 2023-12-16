import React from 'react'

import { Spinner } from '@fluentui/react-components'
import { isSimulatorRunning } from 'src/selectors'
import { useAppSelector } from 'src/hooks/store'

export default () => {
	const isRunning = useAppSelector(isSimulatorRunning)

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
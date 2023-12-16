import React from 'react'

import { addressBus } from './sim.styles'

export const main = () => (
	<svg style={{ ...addressBus, top: 90, left: 220 }}>
		<rect x="0" y="0" width="2" height="60"></rect>
		<rect x="0" y="60" width="377" height="2"></rect>
		<rect x="377" y="0" width="2" height="150"></rect>
	</svg>
)

export const pc = () => (
	<svg style={ addressBus }>
		<rect x="30" y="40" width="2" height="115"></rect>
		<rect x="102" y="40" width="2" height="115"></rect>
	</svg>
)
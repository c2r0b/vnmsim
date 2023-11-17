import React from 'react'

import { dataBus } from './sim.styles'

export const Main = () => (
	<svg style={ dataBus }>
		<rect x="0" y="0" width="2" height="480"></rect>
		<rect x="0" y="0" width="580" height="2"></rect>
		<rect x="580" y="0" width="2" height="20"></rect>
		<rect x="0" y="480" width="256" height="2"></rect>
		<rect x="256" y="352" width="2" height="130"></rect>
		<rect x="160" y="0" width="2" height="11%"></rect>
		<rect x="350" y="0" width="2" height="48%"></rect>
		<rect x="0" y="170" width="150" height="2"></rect>
		<rect x="150" y="170" width="2" height="40"></rect>
		<rect x="65" y="70" width="2" height="240"></rect>
		<rect x="65" y="310" width="150" height="2"></rect>
	</svg>
)

export const Acc = () => (
	<svg style={ dataBus }>
		<rect x="120" y="0" width="160" height="2"></rect>
		<rect x="280" y="0" width="2" height="160"></rect>
		<rect x="120" y="160" width="162" height="2"></rect>
	</svg>
)
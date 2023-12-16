import React, { memo } from 'react'
import { T } from '@transifex/react'

import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from '@fluentui/react-components'

import { reset } from 'src/middleware/reset'
import { useAppDispatch } from 'src/hooks/store'

interface IProps {
	show: boolean
	onDismiss: Function
}

export default memo((props:IProps) => {
	const dispatch = useAppDispatch()

	const confirm = () => {
		dispatch(reset)
		props.onDismiss()
	}

	return (
		<Dialog
			modalType="alert"
			open={ props.show }
      		onOpenChange={ () => props.onDismiss() }
		>
			<DialogSurface>
				<DialogBody>
					<DialogTitle>
						<T _str="New Project" />
					</DialogTitle>
					<DialogContent>
						<T _str="Are you sure you want to create a new project? All unsaved changes will be lost." />
					</DialogContent>
					<DialogActions>
						<DialogTrigger>
							<Button appearance="secondary">
								<T _str="Close" />
							</Button>
						</DialogTrigger>
						<Button appearance="primary" onClick={ confirm }>
							<T _str="OK, got it" />
						</Button>
					</DialogActions>
				</DialogBody>
			</DialogSurface>
		</Dialog>
	)
})
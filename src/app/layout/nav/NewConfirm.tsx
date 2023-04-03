import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";

import { SimulatorContext } from "src/store/dispatcher";
import { T } from "@transifex/react";

interface IProps {
	show: boolean;
	onDismiss: Function;
}

export default observer((props:IProps) => {
	const Sim = useContext(SimulatorContext);

	const confirm = () => {
		Sim.reset();
		props.onDismiss();
	};

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
	);
});
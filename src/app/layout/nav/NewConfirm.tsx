import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components/unstable";
import { Button } from "@fluentui/react-components";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";

interface IProps {
	show: boolean;
	onDismiss: Function;
}

export default observer((props:IProps) => {
	const Sim = useContext(SimulatorContext);
  const Locale = useContext(LocaleContext);

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
						{ Locale.get("PROJECT_NEW") }
					</DialogTitle>
					<DialogContent>
						{ Locale.get("PROJECT_NEW_CONFIRM") }
					</DialogContent>
					<DialogActions>
						<DialogTrigger>
							<Button appearance="secondary">
								{ Locale.get("CLOSE") }
							</Button>
						</DialogTrigger>
						<Button appearance="primary" onClick={ confirm }>
							{ Locale.get("GOT_IT")}
						</Button>
					</DialogActions>
				</DialogBody>
			</DialogSurface>
		</Dialog>
	);
});
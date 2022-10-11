import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { LocaleContext } from "src/locale/dispatcher";
import { Spinner } from "@fluentui/react-components";

import * as Styles from "./spinner.styles";

export default observer(() => {  
	const Sim = useContext(SimulatorContext);
	const Locale = useContext(LocaleContext);

	// display running spinner according to sim status
	if (![1,2,3].includes(Sim.getSimStatus())) {
		return null;
	}
	return (
		<Spinner
			appearance="inverted"
			size="small"
			label={ Locale.get("RUNNING") }
			aria-live="assertive"
			labelPosition="before"
			style={ Styles.status }
		/>
	);
});
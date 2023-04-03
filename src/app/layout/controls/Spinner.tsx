import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { SimulatorContext } from "src/store/dispatcher";
import { Spinner } from "@fluentui/react-components";

export default observer(() => {  
	const Sim = useContext(SimulatorContext);

	// display running spinner according to sim status
	if (![1,2,3].includes(Sim.getSimStatus())) {
		return null;
	}
	return (
		<Spinner
			size="small"
			aria-live="assertive"
			labelPosition="before"
		/>
	);
});
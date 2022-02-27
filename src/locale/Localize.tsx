import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { LocaleContext } from "src/store/dispatcher";

interface IProps {
  label: string;
}

export const Localize = observer((props:IProps) => {
  const Locale = useContext(LocaleContext);

  const text = Locale.get(props.label);
  
  return (
    <span dangerouslySetInnerHTML={{ __html: text }}/>
  );
});
import React, { useContext } from "react";

import { observer } from "mobx-react-lite";

import * as Styles from "./header.styles";

import WorkTitle from "./workTitle/WorkTitle";
import Spinner from "./spinner";

const Header = observer(() => {
  return (
    <div style={ Styles.container }>
      <div style={ Styles.logo.container }>
        <div>
          <div style={ Styles.logo.cube.standard } />
          <div style={ Styles.logo.cube.colored } />
          <div style={ Styles.logo.cube.standard } />
          <div style={ Styles.logo.cube.standard } />
        </div>
      </div>
      <WorkTitle />
      <Spinner />
    </div>
  );
});

export default Header;

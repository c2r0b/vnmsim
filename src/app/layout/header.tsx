import React from "react";

import { Stack } from "@fluentui/react";

import * as Styles from "./header.styles";

const Header = () => {
  return (
    <>
      <div style={ Styles.container }>
        <Stack>
          <div style={ Styles.logo.container }>
            <div style={ Styles.logo.cube } />
            <div style={ Styles.logo.cube } />
            <div style={ Styles.logo.cube } />
            <div style={ Styles.logo.cube } />
          </div>
        </Stack>
      </div>
    </>
  );
};

export default Header;

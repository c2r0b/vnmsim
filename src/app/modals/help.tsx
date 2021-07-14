import * as Styles from "./help.styles";

import React from "react";
import { Panel, PanelType, Link } from "@fluentui/react";

const Help = (props) => {
  return (
    <Panel
      headerText="Help"
      isOpen={ props.show }
      isLightDismiss={ true }
      type={ PanelType.custom }
      customWidth={ 500 }
      onDismiss={ props.onDismiss }
      closeButtonAriaLabel="Close"
    >
      <h3>Introduction</h3>
      <p>This simulator is meant to be a solution for students and teachers to study how a Von Neumann Machine works.</p>
      <p>For information about the project and how to contribute please visit the github project here: <Link href="https://github.com/c2r0b/vnmsim">github.com/c2r0b/vnmsim</Link></p>
      <p>Thank you all for using this simulator. &#129303;</p>
      <h3>Syntax</h3>
      <p>This simulator is fully compatible with the most common commands for the Von Neumann Machine. It is able to load data (LOD), store it (STO), do additions (ADD), subtractions (SUB), multiplications (MUL), divisions (DIV) and perform jumps (JMZ/JMP). You can create comment lines using '//something' syntax.</p>
      <table style={ Styles.table }>
        <tr>
          <td style={ Styles.cell }><b>LOD</b> <i>var/cell</i></td>
          <td style={ Styles.cell }><b>LOD</b> <i>#num</i></td>
          <td style={ Styles.cell }><b>STO</b> <i>var/cell</i></td>
          <td style={ Styles.cell }><b>JMZ</b> <i>cell</i></td>
          <td style={ Styles.cell }><b>JMP</b> <i>cell</i></td>
        </tr>
        <tr>
          <td style={ Styles.cell }><b>ADD</b> <i>var/cell</i></td>
          <td style={ Styles.cell }><b>ADD</b> <i>#num</i></td>
          <td style={ Styles.cell }><b>SUB</b> <i>var/cell</i></td>
          <td style={ Styles.cell }><b>SUB</b> <i>#num</i></td>
          <td style={ Styles.cell }><b>NOP</b></td>
        </tr>
        <tr>
          <td style={ Styles.cell }><b>MUL</b> <i>var/cell</i></td>
          <td style={ Styles.cell }><b>MUL</b> <i>#num</i></td>
          <td style={ Styles.cell }><b>DIV</b> <i>var/cell</i></td>
          <td style={ Styles.cell }><b>DIV</b> <i>#num</i></td>
          <td style={ Styles.cell }><b>HLT</b></td>
        </tr>
      </table>
      <p>Check out the samples to learn the very basics of the operations that this machine is able to perform.</p>
      <h3>I/O features</h3>
      <p>At the top of the page you can find the menu with the I/O options, you can save your work as a file on your computer. The saving includes the current machine and simulator status with the instructions and variables contained in the memory cells. It supports files opening by drag and drop.</p>
      <h3>Backward compatibility</h3>
      <p>You can still open projects made with older versions of this simulator and with the Zanichelli edition, but projects saved with this release are not backward compatible at all.</p>
      <p><b>Full disclosure &#128584;:</b> the Zanichelli edition is one of the very first versions of this simulator and it has been acquired by them in 2015 for educational purposes. This very version has nothing in common with the Zanichelli version (except for the backward compatibility) and is not supported by them in any way.</p>
      <h3>Support</h3>
      <p>There is no official way to financially show your appreciation for this project, a &#127775; on Github is more than enough.</p>
      <h3>Found a bug? &#128030;</h3>
      <p>Do you think this web app is not behaving as expected? Please file an issue on <Link href="https://github.com/c2r0b/vnmsim/issues">Github</Link>. If you are a developer, feel free to create a <Link href="https://github.com/c2r0b/vnmsim/pulls">pull request</Link>.</p>
    </Panel>
  );
};

export default Help;

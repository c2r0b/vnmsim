import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { LocaleContext } from "src/locale/dispatcher";
import { Localize } from "src/locale/Localize";

import { Button, Link, Text } from "@fluentui/react-components";

import * as Styles from "./help.styles";
import { Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components/unstable";

interface IProps {
  show: boolean;
  onDismiss: Function;
}

const Help = observer((props:IProps) => {
  const Locale = useContext(LocaleContext);

  return (
    <Dialog
      open={ props.show }
      onOpenChange={ () => props.onDismiss() }
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{ Locale.get("HELP") }</DialogTitle>
          <DialogContent>
            <h3><Localize label="GUIDE_INTRODUCTION_H"/></h3>
            <p><Localize label="GUIDE_INTRODUCTION_P1"/></p>
            <p><Localize label="GUIDE_INTRODUCTION_P2"/> <Link href="https://github.com/c2r0b/vnmsim">github.com/c2r0b/vnmsim</Link></p>
            <p><Localize label="GUIDE_INTRODUCTION_P3"/> &#129303;</p>
            <h3><Localize label="GUIDE_SYNTAX_H"/></h3>
            <p><Localize label="GUIDE_SYNTAX_P1"/></p>
            <table style={ Styles.table }>
              <tbody>
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
              </tbody>
            </table>
            <p><Localize label="GUIDE_SYNTAX_P2"/></p>
            <h3><Localize label="GUIDE_IO_H"/></h3>
            <p><Localize label="GUIDE_IO_P"/></p>
            <h3><Localize label="GUIDE_COMPATIBILITY_H"/></h3>
            <p><Localize label="GUIDE_COMPATIBILITY_P"/></p>
            <p><b><Localize label="GUIDE_COMPATIBILITY_DISCLOSURE"/> &#128584;:</b> <Localize label="GUIDE_COMPATIBILITY_DISCLOSURE_P"/></p>
            <h3><Localize label="GUIDE_SUPPORT_H"/></h3>
            <p><Localize label="GUIDE_SUPPORT_P"/></p>
            <h3><Localize label="GUIDE_BUG_H"/> &#128030;</h3>
            <p><Localize label="GUIDE_BUG_P"/></p>
          </DialogContent>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">
                { Locale.get("GOT_IT") }
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
});

export default Help;

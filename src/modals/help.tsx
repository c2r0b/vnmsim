import React, { memo } from 'react'
import { Twemoji } from 'react-emoji-render'

import { T } from '@transifex/react'

import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Link } from '@fluentui/react-components'

import * as Styles from './help.styles'

interface IProps {
  show: boolean
  onDismiss: Function
}

const Help = memo((props:IProps) => {
  return (
    <Dialog
      open={ props.show }
      onOpenChange={ () => props.onDismiss() }
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <T _str="Help" />
          </DialogTitle>
          <DialogContent>
            <h3><T _str="Introduction"/></h3>
            <p><T _str="This simulator is meant to be a solution for students and teachers to study how a Von Neumann Machine works."/></p>
            <p><T _str="For information about the project and how to contribute please visit the GitHub repository here:"/> <Link href="https://github.com/c2r0b/vnmsim">github.com/c2r0b/vnmsim</Link></p>
            <p><T _str="Thank you all for using this simulator."/> <Twemoji text=":smiling_face_with_heart_eyes:"/></p>
            <h3><T _str="Syntax"/></h3>
            <p><T _str="This simulator is fully compatible with the most common commands for the Von Neumann Machine. It is able to load data (LOD), store it (STO), do additions (ADD), subtractions (SUB), multiplications (MUL), divisions (DIV) and perform jumps (JMZ/JMP). You can create comment lines using '//something' syntax, even inline at the end of a command."/></p>
            <table style={ Styles.table }>
              <tbody>
                <tr>
                  <td style={ Styles.cell }><b>LOD</b> <i>var</i></td>
                  <td style={ Styles.cell }><b>LOD</b> <i>#num</i></td>
                  <td style={ Styles.cell }><b>STO</b> <i>var</i></td>
                  <td style={ Styles.cell }><b>JMZ</b> <i>cell</i></td>
                  <td style={ Styles.cell }><b>JMP</b> <i>cell</i></td>
                </tr>
                <tr>
                  <td style={ Styles.cell }><b>ADD</b> <i>var</i></td>
                  <td style={ Styles.cell }><b>ADD</b> <i>#num</i></td>
                  <td style={ Styles.cell }><b>SUB</b> <i>var</i></td>
                  <td style={ Styles.cell }><b>SUB</b> <i>#num</i></td>
                  <td style={ Styles.cell }><b>NOP</b></td>
                </tr>
                <tr>
                  <td style={ Styles.cell }><b>MUL</b> <i>var</i></td>
                  <td style={ Styles.cell }><b>MUL</b> <i>#num</i></td>
                  <td style={ Styles.cell }><b>DIV</b> <i>var</i></td>
                  <td style={ Styles.cell }><b>DIV</b> <i>#num</i></td>
                  <td style={ Styles.cell }><b>HLT</b></td>
                </tr>
              </tbody>
            </table>
            <p><T _str="Check out the samples to learn the very basics of the operations that this machine is able to perform."/></p>
            <h3><T _str="I/O features"/></h3>
            <p><T _str="On the left of the page you can find the menu with the I/O options, you can save your work as a file on your computer. The saving includes the current machine and simulator status with the instructions and variables contained in the memory cells. It supports files opening by drag and drop."/></p>
            <h3><T _str="Backward compatibility"/></h3>
            <p><T _str="You can still open projects made with older versions of this simulator and with the Zanichelli edition, but projects saved with this release are not backward compatible at all."/></p>
            <p><b><T _str="Full disclosure"/> <Twemoji text=":see_no_evil_monkey:"/>:</b> <T _str="the Zanichelli edition is one of the very first versions of this simulator and it has been acquired by them in 2015 for educational purposes. This version has nothing in common with the Zanichelli edition (except for the backward compatibility) and is not affiliated with them in any way."/></p>
            <h3><T _str="Support"/> <Twemoji text=":star:"/></h3>
            <p><T _str="There is no official way to financially show your appreciation for this project, a star on GitHub is more than enough."/></p>
            <h3><T _str="Found a bug?"/> <Twemoji text=":lady_beetle:"/></h3>
            <p><T _str="Have you noticed something not working as expected? Please file an issue on GitHub. If you are a developer, feel free to create a pull request. On this project GitHub page you will find information on how to contribute to translations too."/></p>
          </DialogContent>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">
                <T _str="OK, got it"/>
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
})

export default Help

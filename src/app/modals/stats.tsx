import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { T } from '@transifex/react'

import { Button, Dialog, DialogSurface, DialogBody, DialogTitle, DialogContent, DialogActions, DialogTrigger, Table, TableBody, TableCell, TableRow } from '@fluentui/react-components'
import { ArrowRotateClockwise24Filled } from '@fluentui/react-icons'

import { RootState } from 'src/store'
import { clearStats } from 'src/store/stats.slice'

import * as Styles from './stats.styles'

interface IItem {
  type: string
  count: number
}

interface IProps {
  show: boolean
  onDismiss: Function
}

const Stats = (props:IProps) => {
  const dispatch = useDispatch()
  const stats = useSelector((state:RootState) => state.stats)

  const items:Array<IItem> = Object.entries(stats).map(([key, value], i) => ({
    type: key,
    count: +(value as number)
  }))

  const handleClearStats = () => {
    dispatch(clearStats())
  }

  return (
    <Dialog
      open={ props.show }
      onOpenChange={ () => props.onDismiss() }
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <T _str="Statistics" />
          </DialogTitle>
          <DialogContent style={ Styles.container }>
            <Table size="small">
              <TableBody>
                { items.map((item) => (
                  <TableRow key={ item.type } style={ Styles.row }>
                    <TableCell style={ Styles.cell }>{ item.type }</TableCell>
                    <TableCell style={ Styles.cell }>{ item.count }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <DialogTrigger>
              <Button 
                appearance="secondary"
                icon={ <ArrowRotateClockwise24Filled /> }
                onClick={ handleClearStats }
              >
                <T _str="Clear statistics" />
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
}

export default Stats
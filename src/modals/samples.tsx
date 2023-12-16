import React, { memo } from 'react'
import { T, useT } from '@transifex/react'

import { Card, CardHeader, Button, Caption1, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Text } from '@fluentui/react-components'
import { ArrowDownload24Filled } from '@fluentui/react-icons'

import { load } from 'src/middleware/load'
import { useAppDispatch } from 'src/hooks/store'
import { SimulatorState } from 'src/types/simulatorState'

import { samples } from './samples.list'

import * as Styles from './samples.styles'
import * as SAMPLES from '../samples'

interface IProps {
  show: boolean
  onDismiss: Function
}

const Samples = memo((props:IProps) => {
  const dispatch = useAppDispatch()
  const t = useT()

  const samplesList = samples.map(s => {
    const onClick = () => {
      const obj = new SimulatorState()
      obj.fromJSON({
        ...SAMPLES[s.key].input,
        title: s.label,
      })
      dispatch(load(obj.toData()))
      props.onDismiss()
    }

    return (
      <Card
        key={ s.key }
        style={ Styles.card }
      >
        <CardHeader
          header={  <Text weight="semibold">{ s.label }</Text> }
          description={ <Caption1 style={ Styles.desc }>{ s.desc }</Caption1> }
          action={
            <Button
              appearance="transparent"
              aria-label={ t("Open") }
              icon={ <ArrowDownload24Filled /> }
              onClick={ onClick }
            />
          }
        />
      </Card>
    )
  })

  return (
    <Dialog
      open={ props.show }
      onOpenChange={ () => props.onDismiss() }
    >
      <DialogSurface>
        <DialogBody>
          <DialogTitle>
            <T _str="Samples" />
          </DialogTitle>
          <DialogContent>
            <div style={ Styles.list }>
              { samplesList }
            </div>
          </DialogContent>
          <DialogActions>
            <DialogTrigger>
              <Button appearance="secondary">
                <T _str="Close" />
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  )
})

export default Samples

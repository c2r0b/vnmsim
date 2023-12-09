import React from "react"
import { useT } from '@transifex/react'

import { Add24Filled } from '@fluentui/react-icons'
import { Tooltip, Button, Table, TableBody, TableCell, TableCellLayout, TableRow, SpinButton } from '@fluentui/react-components'

import { addTVariable, setVariable } from "src/store/ram.slice"
import { useAppDispatch, useAppSelector } from "src/hooks/store"
import { getVariables } from "src/selectors"

import * as RamStyled from '../ram.styles'
import * as Styled from './variables.styles'

interface IProps {
  focusedVar?: string
}

export const Variables = (props:IProps) => {
  const dispatch = useAppDispatch()
  const variables = useAppSelector(getVariables)

  const t = useT()

  // create an array of all variables keys to be displayed
  const allVariables = Object.keys(variables)
  
  // create an array of objects to be displayed as variables
  const items = allVariables.map((key, i) => ({
    key: i.toString(),
    type: key,
    value: variables[key]
  }))

  const onChange = (key, data) => {
    dispatch(setVariable({ name: key, value: data.displayValue }))
  }

  const handleAddVariable = () => {
    dispatch(addTVariable())
  }

  const displayVariable = (item) => {
    const isFocused = props.focusedVar === item.type;

    return (
      <Styled.Row key={ item.type }>
        <Styled.TypeCell>
          { item.type }
        </Styled.TypeCell>
        <Styled.InputCell>
          <TableCellLayout>
            <Styled.VarSpin
              className={ isFocused ? "focused" : "" }
              appearance="underline"
              value={ item.value.toString() }
              onChange={ (_e, data) => onChange(item.type, data) }
            />
          </TableCellLayout>
        </Styled.InputCell>
      </Styled.Row>
    )
  }

  return (
    <RamStyled.VerticalHalf>
      <Table size="small">
        <TableBody>
          { items.map(displayVariable) }
          <TableRow>
            <TableCell>
              <Tooltip
                content={ t("Add T variable") }
                relationship="label"
                withArrow
              >
                <Button
                  aria-label={ t("Add T variable") }
                  icon={ <Add24Filled /> }
                  onClick={ handleAddVariable }
                  appearance="subtle"
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </RamStyled.VerticalHalf>
  )
}
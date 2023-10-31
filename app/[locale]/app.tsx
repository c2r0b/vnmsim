'use client'

import React, { useEffect, useRef } from 'react'

import { useCookies } from 'react-cookie'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'

import appStyles from 'src/app/app.module.css'

import { FluentProvider } from '@fluentui/react-components'
import { tx } from '@transifex/native'

import Split from 'react-split'

import * as Styles from 'src/app/app.styles'

import Nav from 'src/app/layout/nav/Nav'
import Controls from 'src/app/layout/controls/Controls'
import Ram from 'src/app/layout/ram/Ram'
import Sim from 'src/app/layout/sim/Sim'
import Notification from 'src/app/layout/notification/Notification'

import type { RootState } from 'src/store'
import { LocaleContext } from 'src/store'
import EditorRef from 'src/types/editor'
import { getFluentTheme, setCSSVariables } from 'src/themes/utils'

tx.init({
  token: process.env.TX_NATIVE_PUBLIC_TOKEN,
  filterStatus: "reviewed",
})

interface ILanguage {
  code: string
}

interface IProps {
  locale: string
  languages: ILanguage[]
}

export default (props:IProps) => {
  const theme = useSelector((state:RootState) => state.theme.name)
  const editorRef = useRef<EditorRef>(null)
  
  const currentLocale = usePathname()?.replace("/", "")

  const [cookies] = useCookies(['NEXT_LOCALE'])

  // redirect to the saved locale route if it's different from the current one
  if (cookies.NEXT_LOCALE && cookies.NEXT_LOCALE !== currentLocale) {
    window.location.href = "/" + cookies.NEXT_LOCALE
  }

  useEffect(() => {
    setCSSVariables(theme)
  }, [theme])

  const clearEditorHighlight = editorRef?.current?.clearHighlight || (() => {});

  return (
    <LocaleContext.Provider value={ props }>
      <FluentProvider theme={ getFluentTheme(theme) }>
        <div style={ Styles.container }>
          <Split
            className={ appStyles.split }
            sizes={[35, 65]}
            minSize={ [400] }
            expandToMin={ true }
            gutterSize={ 20 }
            dragInterval={ 30 }
            direction="horizontal"
          >
            <div style={ Styles.panel }>
              <Nav />
              <Ram ref={ editorRef } />
              <Controls clearEditorHighlight={ clearEditorHighlight } />
            </div>
            <div style={ Styles.panel }>
              <Sim />
            </div>
          </Split>

          <Notification />
        </div>
      </FluentProvider>
    </LocaleContext.Provider>
  )
}
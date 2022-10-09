import * as React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Stylesheet, resetIds } from '@fluentui/react';

const stylesheet = Stylesheet.getInstance();

interface IFluentUIProps {
  styleTags: any
  serializedStylesheet: any
}

export default class Page extends React.Component<IFluentUIProps, Document> {
  static async getInitialProps(ctx) {
    resetIds();
    const initialProps = await Document.getInitialProps(ctx);
    
    return {
      ...initialProps,
      styleTags: stylesheet.getRules(true),
      serializedStylesheet: stylesheet.serialize()
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <style type="text/css" dangerouslySetInnerHTML={{ __html: this.props.styleTags }} />
          <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
            window.FabricConfig = window.FabricConfig || {};
            window.FabricConfig.serializedStylesheet = ${this.props.serializedStylesheet};
          ` }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
// source: https://react.fluentui.dev/?path=/docs/concepts-developer-server-side-rendering--page
import { createDOMRenderer, renderToStyleElements } from "@fluentui/react-components";
import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class Page extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const renderer = createDOMRenderer();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App =>
          function EnhancedApp(props) {
            const enhancedProps = {
              ...props,
              renderer
            };

            return <App {...enhancedProps} />;
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    const styles = renderToStyleElements(renderer);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Page;
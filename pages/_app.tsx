// source: https://react.fluentui.dev/?path=/docs/concepts-developer-server-side-rendering--page
import { createDOMRenderer, GriffelRenderer, SSRProvider, RendererProvider } from "@fluentui/react-components";
import type { AppProps } from "next/app";

import { setClientSideTranslations } from "../src/i18n";

type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };

export default ({ Component, pageProps, renderer }: EnhancedAppProps) => {
  setClientSideTranslations(pageProps);  
	return (
		<RendererProvider renderer={renderer || createDOMRenderer()}>
			<SSRProvider>
				<Component {...pageProps} />
			</SSRProvider>
		</RendererProvider>
	);
};
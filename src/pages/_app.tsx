import { AppProps } from 'next/app'
import { wrapper } from 'src/store/index'

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Component {...pageProps} />
)

export default wrapper.withRedux(App)

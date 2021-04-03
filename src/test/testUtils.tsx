import { enableFetchMocks } from 'jest-fetch-mock'
import type { FunctionComponent } from 'react'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from 'src/store'

enableFetchMocks()

const Providers = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

const customRender = (ui: React.ReactElement, options: RenderOptions = {}) =>
  render(ui, { wrapper: Providers as FunctionComponent, ...options })

export * from '@testing-library/react'

export { customRender as render }

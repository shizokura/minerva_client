import PageWithLayout from '@/layout/pagewithlayout'
import '@/styles/globals.scss'
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>


type AppProps=  {
  Component: PageWithLayout
  pageProps: any
}

export default function App({ Component, pageProps }: AppProps) {
  const Layout = Component.layout || (({children}) => <>{children}</>)
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

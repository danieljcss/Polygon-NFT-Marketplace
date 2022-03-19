import '../styles/globals.css'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <div className="mt-4 mb-10 mx-4 md:mx-6 lg:mx-20">
        <Component {...pageProps} />
      </div>
    </Layout>
  )
}

export default MyApp
import React from 'react'
import ClientFeedback from '../components/ClientFeedback'
import { Main } from '../components/Main'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Head from 'next/head'
import UploadClientFeedback from '../components/UploadClientFeedback'

function uploadClientFeedback() {
  return (
    <>
    <Head>
      <title>Feedback</title>
      <meta name='FeedBack' content='' />
    </Head>
    <Header/>
    <Main nav={false}>
    <UploadClientFeedback/>
</Main>
      <Footer />
    </>
  )
}

export default uploadClientFeedback
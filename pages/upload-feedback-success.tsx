import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import { Main } from '../components/Main';
import Header from '../components/Header';
import UploadFeedbackSuccess from '../components/UploadFeedBackSuccess';


function UploadFeedbackSuccessScreen() {

  return (
    <>
    <Head>
      <title>FeedBack Success</title>
      <meta name='FeedBack Success' content='' />
    </Head>
    <Header/>
    <Main nav={false}>
   < UploadFeedbackSuccess/>
    </Main>
    <Footer />
  </>
  );
}

export default UploadFeedbackSuccessScreen;

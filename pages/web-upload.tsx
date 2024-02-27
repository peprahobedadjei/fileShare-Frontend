import React from 'react';
import Footer from '../components/Footer';
import Head from 'next/head';
import { Main } from '../components/Main';
import Header from '../components/Header';
import WebUploadScreen from '../components/WebUploadScreen';

function UploadScreen() {
  return (
    <>
      <Head>
        <title>File Upload Portal</title>
        <meta name='OTP Verification' content='' />
      </Head>
      <Header/>
      <Main nav={false}>
        <WebUploadScreen/>
      </Main>
      <Footer />
    </>
  );
}

export default UploadScreen;

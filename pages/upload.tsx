import React from 'react';
import Footer from '../components/Footer';
import Head from 'next/head';
import { Main } from '../components/Main';
import Upload from '../components/Upload';
import Header from '../components/Header';

function UploadScreen() {
  return (
    <>
      <Head>
        <title>File Upload Portal</title>
        <meta name='OTP Verification' content='' />
      </Head>
      <Header/>
      <Main nav={false}>
        <Upload/>
      </Main>
      <Footer />
    </>
  );
}

export default UploadScreen;

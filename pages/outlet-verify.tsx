import React from 'react';
import Footer from '../components/Footer';
import VerifyScreen from '../components/VerifyScreen';
import Head from 'next/head';
import { Main } from '../components/Main';
import Header from '../components/Header';

function Verify() {
  return (
    <>
      <Head>
        <title>Verification</title>
        <meta name='OTP Verification' content='' />
      </Head>
      <Header/>
      <Main nav={false}>
        <VerifyScreen />
      </Main>
      <Footer />
    </>
  );
}

export default Verify;

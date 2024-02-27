import React from 'react';
import Head from 'next/head';
import Authscreen from '../components/Authscreen';
import Footer from '../components/Footer';
import { Main } from '../components/Main';
import Header from '../components/Header';
function Auth() {
  return (
    <>
      <Head>
        <title>Authentication</title>
        <meta name='Sign Up | Log In' content='' />
      </Head>
      <Header/>
      <Main nav={false}>
        <Authscreen />
      </Main>
      <Footer />
    </>
  );
}

export default Auth;

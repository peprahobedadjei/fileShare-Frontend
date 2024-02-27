import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import { Main } from '../components/Main';
import Header from '../components/Header';
import FeedBackSuccess from '../components/FeedBackSuccess';

function OutletFeedback() {

  return (
    <>
    <Head>
      <title>FeedBack</title>
      <meta name='FeedBack Success' content='' />
    </Head>
    <Header/>
    <Main nav={false}>
     <FeedBackSuccess/>   
    </Main>
    <Footer />
  </>
  );
}

export default OutletFeedback;

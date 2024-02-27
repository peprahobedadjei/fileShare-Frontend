import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import { Main } from '../components/Main';
import Header from '../components/Header';
import FeedBack from '../components/OutletFeedbackScreen';

function OutletFeedback() {

  return (
    <>
    <Head>
      <title>FeedBack</title>
      <meta name='Outlet Feedback' content='' />
    </Head>
    <Header/>
    <Main nav={false}>
      <FeedBack/>
    </Main>
    <Footer />
  </>
  );
}

export default OutletFeedback;

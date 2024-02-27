import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import { Main } from '../components/Main';
import Header from '../components/Header';
import ClientFeedbackSuccess from '../components/ClientFeedbackSuccess';

function ClientFeedbackSuccessScreen() {

  return (
    <>
    <Head>
      <title>FeedBack Success</title>
      <meta name='FeedBack Success' content='' />
    </Head>
    <Header/>
    <Main nav={false}>
     <ClientFeedbackSuccess/> 
    </Main>
    <Footer />
  </>
  );
}

export default ClientFeedbackSuccessScreen;

import React from 'react';
import Footer from '../components/Footer';
import Head from 'next/head';
import { Main } from '../components/Main';
import Header from '../components/Header';
import SavedFilesScreen from '../components/SavedFiles';

function SavedFiles() {
  return (
    <>
      <Head>
        <title>Saved Files</title>
        <meta name='Saved Files' content='' />
      </Head>
      <Main nav={false}>
        <SavedFilesScreen/>
      </Main>
    </>
  );
}

export default SavedFiles;

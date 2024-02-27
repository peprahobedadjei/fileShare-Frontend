import React from 'react';
import Head from 'next/head';
import { Main } from '../components/Main';
import UserDetails from '../components/UserDetails';
function USerDetails() {
  return (
    <>
      <Head>
        <title>Outlet Details</title>
        <meta name='Outlet Details' content='' />
      </Head>
      <Main nav={false}>
        <UserDetails />
      </Main>
    </>
  );
}

export default USerDetails;

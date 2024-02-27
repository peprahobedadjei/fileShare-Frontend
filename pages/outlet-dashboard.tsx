import React from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import { Main } from '../components/Main';
import Header from '../components/Header';
import UserDashboard from '../components/Dashboard';

function Dashboard() {

  return (
    <>
    <Head>
      <title>Dashboard</title>
      <meta name='Outlet Dashboard' content='' />
    </Head>
    {/* <Header/> */}
    <Main nav={false}>
      <UserDashboard />
    </Main>
    {/* <Footer /> */}
  </>

  );
}

export default Dashboard;

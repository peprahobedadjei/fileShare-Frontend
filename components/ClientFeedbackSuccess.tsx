import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';


function ClientFeedbackSuccess() {
    
    const router = useRouter();
    const { query } = router;
    const userName = (query.userName as string) || '';

  return (
    <section >
    <div className='mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:items-center'>
      <div className='mx-auto max-w-xl text-center justify-center items-center '>
        <h1 className=' text-2xl text-center mb-2 mt-10 text-darkPurple'>
        Thank you
        </h1>
        <h1 className=' text-2xl text-center mt-4 mb-2 font-semibold text-darkGreen '>
        {userName}
        </h1>
        <h1 className=' text-2xl text-center mt-2 mb-2 text-darkPurple'>
        for your review
        </h1>
        <div className='mt-4'>
          <Link
          href='/web-upload'
            className='p-2 rounded-lg text-center text-xl font-bold justify-center items-center border-gray-200 bg-darkGreen  text-white shadow-sm focus:border-white'
          >
           Share Files Again
          </Link>
        </div>
      </div>
    </div>
</section>
  )
}

export default ClientFeedbackSuccess
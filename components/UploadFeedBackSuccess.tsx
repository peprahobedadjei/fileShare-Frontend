import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function UploadFeedbackSuccess() {
  const router = useRouter();
  const { query } = router;
  const userName = (query.userName as string) || '';

  const [Data, setData] = useState(null)

  useEffect(() => {
    const storedUserData =
      JSON.parse(localStorage.getItem('queryNumber')) || {};
    setData(storedUserData);
  }, []);

  return (
    <section>
      <div className='mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:items-center'>
        <div className='mx-auto max-w-xl items-center justify-center text-center '>
          <h1 className=' mb-2 mt-10 text-center text-2xl text-darkPurple'>
            Thank you
          </h1>
          <h1 className=' mb-2 mt-4 text-center text-2xl font-semibold text-darkGreen '>
            {userName}
          </h1>
          <h1 className=' mb-2 mt-2 text-center text-2xl text-darkPurple'>
            for your review
          </h1>
          <div className='mt-4'>
            <a
              href={`/upload?phoneNumber=${Data}`}
              className='items-center justify-center rounded-lg border-gray-200 bg-darkGreen p-2 text-center text-xl font-bold  text-white shadow-sm focus:border-white'
            >
              Share Files Again
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UploadFeedbackSuccess;

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Data {
  outletName: string;
  outletPhoneNumber: string;
  outletOwner: string;
  outletPassword: string;
  landMark: string;
  outletUrl:string;
}

interface UserData {
  outletName: string;
  outletPhoneNumber: string;
  outletOwnerName: string;
  outletPassword: string;
  outletUrl:string;
}


const PrintScreen: React.FC = () => {
  const [Data, setData] = useState<Data>(() => ({
    outletName: '',
    outletPhoneNumber: '',
    outletOwner: '',
    outletPassword: '',
    landMark: '',
    outletUrl: ''
  }));

  const [userData, setUserData] = useState<UserData>(() => ({
    outletName: '',
    outletPhoneNumber: '',
    outletOwnerName: '',
    outletPassword:'',
    outletUrl:''
  }));



  useEffect(() => {
    const storedUserData =
      JSON.parse(localStorage.getItem('savedData')) || {};
    setData(storedUserData);
  }, []);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};
    setUserData(storedUserData);
  }, []);

  const router = useRouter();
  const gotodashboard= () => {
    router.push({
      pathname: '/outlet-dashboard',
      query: { outletName: userData?.outletName },
    });
  };

  return (
    <section >
          <div className='mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:items-center'>
            <div className='mx-auto max-w-xl text-center justify-center items-center '>
              <h1 className=' text-4xl text-center mb-6 mt-24 text-darkPurple'>
              Thank you
              </h1>
              <h1 className=' text-4xl text-center mt-4 mb-4 font-semibold text-darkGreen '>
              {Data?.outletName || userData?.outletName}
              </h1>
              <h1 className=' text-4xl text-center mt-6 mb-4 text-darkPurple'>
              for your review
              </h1>
              <div className='mt-4'>
                <button
                  onClick={gotodashboard}
                  className='p-4 rounded-lg text-center text-2xl font-bold justify-center items-center border-gray-200 bg-darkGreen  text-white shadow-sm focus:border-white'
                >
                 Go to File Interface
                </button>
              </div>
            </div>
          </div>
  </section>


  );
};

export default PrintScreen;

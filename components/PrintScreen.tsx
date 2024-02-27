import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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

  return (
    <div className='mt-4'>
      <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-lg'>
          <h1 className='text-center text-2xl font-bold text-darkPurple sm:text-3xl'>
            Eazy Share
          </h1>

          <p className='mx-auto mt-4 max-w-md text-center text-3xl font-bold '>
            Shop Name :  {Data?.outletName || userData?.outletName}
          </p>
          <p className='mx-auto mt-1 max-w-md  text-center text-3xl font-semibold'>
            Shop Phone Number : <span className='text-darkGreen'> {Data?.outletPhoneNumber ||userData?.outletPhoneNumber}</span>
          </p>

          <div className='mb-0 space-y-4 rounded-lg p-4  sm:p-6 lg:p-8'>
          <Image
                  className='mx-auto'
                  height={350}
                  width={350}
                  src={Data?.outletUrl || userData?.outletUrl}
                  alt={'QR Code'}
                  loading="lazy"
                />

            <p className='mx-auto mt-4 max-w-md px-4 text-center text-3xl font-semibold'>
              Scan <span className='text-darkGreen'>QR Code</span> with <span className='text-darkPurple'>Google Lens</span> or <span className='text-darkPurple'>Apple Camera</span> to Share files
            </p>
            <p className='mx-auto max-w-md  text-center text-3xl font-semibold'>
              <span className='text-darkRed'>or</span>
            </p>
            <p className='mx-auto mt-4 w-3/6 text-center text-3xl font-semibold'>
            Visit : <span className="text-darkGreen">www.bit.ly.com</span> to share files
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintScreen;

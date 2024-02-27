import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Image from 'next/image';
import { ApiResponse } from '../server/apiTypes';
import { login } from '../server/login';
import { useRouter } from 'next/router';
import Loader from './Loader';
import Modal from './Modal';
import PrintScreen from './PrintScreen';
import Header from './Header';

function UserDetails() {

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    isOpen: false,
    isSuccess: false,
  });
  const router = useRouter();


  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('savedData')) || {};
    setUserData(storedUserData);
  }, []);
  
  useEffect(() => {
  }, [userData]);
  const [showPrintScreen, setShowPrintScreen] = useState(false);

  const handlePrint = () => {
    setShowPrintScreen(true);
    setTimeout(() => {
      window.print();
      setShowPrintScreen(false);
    }, 500); // Adjust the timeout as needed
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const apiResponse: ApiResponse = await login(
        userData?.outletPhoneNumber,
        userData?.outletPassword
      );
      if (apiResponse.success) {
        // Save user data in local storage
        localStorage.setItem('userData', JSON.stringify(apiResponse.body));

        // Redirect to the login page
        router.push('/outlet-dashboard');
      } else {
        const errorMessage = apiResponse['body']['error'];
        setModalData({
          title: 'Error',
          message: errorMessage,
          isSuccess: false,
          isOpen: true,
        });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalData({ title: '', message: '', isOpen: false, isSuccess: false });
  };

  return (
    <div >
      {showPrintScreen ? (
        <PrintScreen />
      ) : (
        <div>
        <Header />
        <div className=' mx-auto max-w-screen-2xl px-4 py-3 sm:px-6 lg:px-8'>
        <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='rounded-md border-2 bg-white p-2 md:p-2 lg:px-16 lg:py-8'>
          <div className='mx-auto max-w-xl flex flex-col items-center'>
              <h2 className='mb-4 text-center text-2xl font-bold text-darkGreen md:text-3xl'>
                REGISTRATION SUCCESSFUL 
              </h2>
              
                <Image
                  className='mx-auto'
                  height={200}
                  width={200}
                  src={userData?.outletUrl || '/noimage.jpg'}
                  alt={'QR Code'}
                  priority
                />
                <button
                  type='submit'
                  onClick={handlePrint}
                  className='mt-24 rounded-lg border-gray-200 bg-darkGreen p-4 text-2xl font-bold text-white shadow-sm focus:border-white'
                >
                  Print QR Code
                </button>

            </div>
          </div>

          <div className='rounded-md border-2 bg-white p-2 md:p-2 lg:px-16 lg:py-24'>
          <div className='mx-auto max-w-xl flex flex-col items-center'>
              <h2 className='mb-4 text-center text-2xl font-bold text-black md:text-3xl'>
                OUTLET DETAILS
                </h2>
                <div className='text-center'>
              <p className='font-bold text-black text-xl mb-6 mt-2'>Outlet Name : {userData?.outletName}</p>
              <p className='font-bold text-black text-xl mb-6'>Outlet Owner Name : {userData?.outletOwnerName}</p>
              <p className='font-bold text-black text-xl mb-8'>Outlet PhoneNumber : {userData?.outletPhoneNumber}</p>
            </div>

              <button
                  type='submit'
                  onClick={handleLogin}
                  className=' mt-20 rounded-lg border-gray-200 bg-darkGreen p-4 text-2xl font-bold text-white shadow-sm focus:border-white'
                >
                   Go to File Interface
                </button>
            </div>
          </div>
        </div>
        {isLoading && <Loader />}
      {modalData.isOpen && (
        <Modal
          title={modalData.title}
          message={modalData.message}
          onClose={closeModal}
          isSuccess={modalData.isSuccess}
        />
      )}
      </div>
      <Footer/>
      </div>
      )}
 </div>
  );
}

export default UserDetails;

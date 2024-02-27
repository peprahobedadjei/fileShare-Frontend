import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { register } from '../server/register';
import { ApiResponse } from '../server/apiTypes';
import API_URLS from '../utils/baseUrls';

interface Data {
  outletName: string;
  outletPhoneNumber: string;
  outletOwner: string;
  outletPassword: string;
  landMark: string;
}

function VerifyScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    isOpen: false,
    isSuccess: false,
  });

  const [Data, setData] = useState<Data>(() => ({
    outletName: '',
    outletPhoneNumber: '',
    outletOwner: '',
    outletPassword: '',
    landMark: '',
  }));

  useEffect(() => {
    const storedUserData =
      JSON.parse(localStorage.getItem('registrationData')) || {};
    setData(storedUserData);
  }, []);

  const [resendCountdown, setResendCountdown] = useState(30); //15000
  const closeModal = () => {
    setModalData({ title: '', message: '', isOpen: false, isSuccess: false });
  };

  useEffect(() => {
    let countdownInterval;

    if (resendCountdown > 0) {
      countdownInterval = setInterval(() => {
        setResendCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [resendCountdown]);

  const handleResendOTP = async () => {
    setResendCountdown(30);
    setIsLoading(true);

    try {
      // Generate a 6-digit random code
      const otpCode = Math.floor(100000 + Math.random() * 900000);

      // Call your backend API to send OTP using fetch
      const response = await fetch(API_URLS.base + '/send_otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: Data.outletPhoneNumber,
          code: otpCode,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setIsLoading(false);
        setModalData({
          title: 'Success',
          message: 'OTP Successfully Sent via SMS',
          isSuccess: true,
          isOpen: true,
        });
        localStorage.setItem('otpCode', JSON.stringify(otpCode));
      } else {
        setIsLoading(false);
        setModalData({
          title: 'Error',
          message: 'OTP request Failed. Kindly Try Again',
          isSuccess: false,
          isOpen: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle other errors
    }
  };

  const handleVerify = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const otpInput = formData.get('otpInput') as string;
    setIsLoading(true);

    const storedOtpCode = localStorage.getItem('otpCode');

    if (otpInput === storedOtpCode) {
      console.log('Success! OTP matched.');

      const baseUrl = 'https://file-share-frontend-chi.vercel.app/upload'; //Remember to change localhost to production
      let qrData = `${baseUrl}?phoneNumber=${Data.outletPhoneNumber}`;
      let qrSize = '250x250';
      let charsetSource = 'ISO-8859-1';
      let charsetTarget = 'UTF-8';
      let format = 'svg';
      let margin = '2';
      let qZone = '2';
      let url = `https://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=${qrSize}&charset-source=${charsetSource}&charset-target=${charsetTarget}&format=${format}&margin=${margin}&qzone=${qZone}`;

      // Use fetch to get the QR code image
      fetch(url)
        .then(async (response) => {
          if (response.status == 200) {
            const url = response.url;
            try {
              const apiResponse: ApiResponse = await register(
                Data.outletName,
                Data.outletOwner,
                Data.outletPhoneNumber,
                Data.outletPassword,
                Data.landMark,
                url
              );
              if (apiResponse.success) {
                localStorage.setItem(
                  'savedData',
                  JSON.stringify(apiResponse.body)
                );
                router.push('/outlet-user-details');
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
          } else {
            setModalData({
              title: 'Error',
              message: 'An error occurred while generating QR Code. Try Agin.',
              isSuccess: false,
              isOpen: true,
            });
          }
        })
        .catch((error) => {
          console.error('An error occurred while generating QR Code', error);
        });
    } else {
      console.error('Error! OTP does not match.');
    }
  };

  return (
    <div className=' mx-auto max-w-screen-2xl px-4 py-3 sm:px-6 lg:px-8'>
      <div className=' mt-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='rounded-md border-2 bg-white p-2 md:p-2 lg:px-16 lg:py-24'>
          <div className='mx-auto max-w-xl '>
            <h2 className=' text-center text-2xl font-bold text-darkGreen md:text-3xl'>
              VERIFY OTP
            </h2>

            <form onSubmit={handleVerify}>
              <input
                type='digit'
                name='otpInput'
                maxLength={6}
                minLength={6}
                pattern='^\d{6}$'
                required
                placeholder='Enter OTP'
                className='flex mt-24 justify-center w-full text-center rounded-lg border-2 border-gray-300 p-4 pe-12 text-sm text-gray-600 shadow-sm focus:outline-none focus:ring focus:ring-darkGreen'
              />
              <div className='mt-8 flex items-center justify-end font-medium'>
                {resendCountdown === 0 ? (
                  <button onClick={handleResendOTP}>Resend OTP</button>
                ) : (
                  <span className='text-gray-400'>
                    Resend OTP in {Math.floor(resendCountdown / 60)}:
                    {(resendCountdown % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>
              <div className=' flex justify-center mt-8'>
                {' '}
                {/* Centering the Submit button */}
                <button
                  type='submit'
                  className='rounded-lg border-gray-200 bg-darkGreen p-4 text-2xl font-bold text-white shadow-sm focus:border-white'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='rounded-md border-2 bg-white p-2 md:p-2 lg:px-16 lg:py-24'>
          <div className='mx-auto max-w-xl text-center'>
            <h2 className='mb-4 text-center text-2xl font-bold text-black md:text-3xl'>
              OUTLET DETAILS
            </h2>
            <div>
              <p className='font-bold text-black text-xl mb-6 mt-2'>Outlet Name :  {Data.outletName}</p>
              <p className='font-bold text-black text-xl mb-6'>Outlet Owner Name :  {Data.outletOwner}</p>
              <p className='font-bold text-black text-xl mb-24 '>Outlet PhoneNumber : {Data.outletPhoneNumber}</p>


            </div>

            <div className='mt-8 flex justify-center'>
              {' '}
              {/* Centering the Edit button */}
              <button
                type='button'
                onClick={() =>
                  router.push({
                    pathname: '/outlet-auth',
                    query: {
                      outletName: Data.outletName,
                      outletPhoneNumber: Data.outletPhoneNumber,
                      outletOwner: Data.outletOwner,
                      landMark: Data.landMark,
                    },
                  })
                }
                className='rounded-lg border-gray-200 bg-darkGreen px-7 py-4 text-2xl font-bold text-white shadow-sm focus:border-white'
              >
                Edit
              </button>
            </div>
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
  );
}
export default VerifyScreen;

import React, { useEffect, useState } from 'react';
import { ApiResponse } from '../server/apiTypes';
import { login } from '../server/login';
import Loader from './Loader';
import Modal from './Modal';
import { useRouter } from 'next/router';
import API_URLS from '../utils/baseUrls';

interface Data {
  outletName: string;
  outletPhoneNumber: string;
  outletOwner: string;
  landMark: string;
}

function Authscreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    isOpen: false,
    isSuccess: false,
  });
  const router = useRouter();
  const { query } = router;

  const [editedOutletName, setEditedOutletName] = useState('');
  const [editedOutletOwner, setEditedOutletOwner] = useState('');
  const [editedOutletPhoneNumber, setEditedOutletPhoneNumber] = useState('');
  const [editedLandMark, setEditedLandMark] = useState('');

  // Extract user data from query
  useEffect(() => {
    if (typeof query.outletName === 'string') {
      setEditedOutletName(query.outletName);
    }
    if (typeof query.outletPhoneNumber === 'string') {
      setEditedOutletPhoneNumber(query.outletPhoneNumber);
    }
    if (typeof query.outletOwner === 'string') {
      setEditedOutletOwner(query.outletOwner);
    }
    if (typeof query.landMark === 'string') {
      setEditedLandMark(query.landMark);
    }
  }, [query]);

  const [formData, setFormData] = useState<Data>(() => ({
    outletName: '',
    outletPhoneNumber: '',
    outletOwner: '',
    landMark: '',
  }));

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const closeModal = () => {
    setModalData({ title: '', message: '', isOpen: false, isSuccess: false });
  };

  const handleRegistration = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const outletName = formData.get('outletName') as string;
    const outletOwner = formData.get('outletOwner') as string;
    const outletPhoneNumber = formData.get('outletPhoneNumber') as string;
    const outletPassword = formData.get('outletPassword') as string;
    const landMark = formData.get('landMark') as string;

    const registrationData = {
      outletName,
      outletOwner,
      outletPhoneNumber,
      outletPassword,
      landMark,
    };

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
          phoneNumber: outletPhoneNumber,
          code: otpCode,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setIsLoading(false);
        router.push('/outlet-verify');
        localStorage.setItem(
          'registrationData',
          JSON.stringify(registrationData)
        );
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

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const outletPhoneNumber = formData.get('outletPhoneNumber') as string;
    const outletPassword = formData.get('outletPassword') as string;
    setIsLoading(true);
    try {
      const apiResponse: ApiResponse = await login(
        outletPhoneNumber,
        outletPassword
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

  return (
    <div className=' mx-auto max-w-screen-2xl px-4 py-3 sm:px-6 lg:px-8'>
      <div className=' grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='rounded-md border-2 bg-white p-2 md:p-2 lg:px-16 lg:py-10'>
          <div className='mx-auto max-w-xl text-center '>
            <h2 className='text-2xl font-bold text-darkGreen md:text-3xl '>
              REGISTER
            </h2>
            <form
              onSubmit={handleRegistration}
              className='mb-0 space-y-2 rounded-lg p-2 sm:p-6 lg:p-8'
            >
              <input
                type='text'
                name='outletName'
                id='outletName'
                value={editedOutletName}
                onChange={(e) => setEditedOutletName(e.target.value)}
                required
                maxLength={25}
                minLength={5}
                pattern='[A-Za-z\d\s.]*'
                title="Enter Shop Name within 5-25 Characters(No special characters allowed except '.')"
                placeholder='Enter Outlet Name'
                className='w-full rounded-lg border-2 border-gray-300 p-4 pe-12 text-center text-sm text-gray-600  shadow-sm focus:outline-none focus:ring focus:ring-darkGreen'
              />
              <input
                type='text'
                name='outletOwner'
                id='outletOwner'
                value={editedOutletOwner}
                onChange={(e) => setEditedOutletOwner(e.target.value)}
                required
                maxLength={25}
                minLength={5}
                pattern='[A-Za-z\d\s.]*'
                title="Enter Shop Name within 5-25 Characters(No special characters allowed except '.')"
                placeholder='Enter Outlet Owner Full Name'
                className='w-full rounded-lg border-2 border-gray-300 p-4 pe-12 text-center text-sm text-gray-600  shadow-sm focus:outline-none focus:ring focus:ring-darkGreen'
              />
              <input
                type='text'
                name='landMark'
                id='landMark'
                value={editedLandMark}
                onChange={(e) => setEditedLandMark(e.target.value)}
                required
                maxLength={25}
                minLength={5}
                pattern='[A-Za-z\d\s.]*'
                title="Enter Shop Landmark within 5-25 Characters(No special characters allowed except '.')"
                placeholder='Enter Shop Landmark'
                className='w-full rounded-lg border-2 border-gray-300 p-4 pe-12 text-center text-sm text-gray-600  shadow-sm focus:outline-none focus:ring focus:ring-darkGreen'
              />
              <input
                type='digit'
                name='outletPhoneNumber'
                id='outletPhoneNumber'
                value={editedOutletPhoneNumber}
                onChange={(e) => setEditedOutletPhoneNumber(e.target.value)}
                maxLength={10}
                minLength={10}
                pattern='^[6789]\d{9}$'
                title='Enter a Valid 10-Digit Phone Number'
                required
                placeholder='Enter Phone Number'
                className='w-full rounded-lg border-2 border-gray-300 p-4 pe-12 text-center text-sm text-gray-600  shadow-sm focus:outline-none focus:ring focus:ring-darkGreen'
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name='outletPassword'
                placeholder='Create Password'
                maxLength={10}
                minLength={8}
                pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
                title='Please enter a valid password with at least 8 characters (include a letter, a number, and a special character).'
                required
                className='w-full rounded-lg border-2 border-gray-300 p-4 pe-12 text-center text-sm text-gray-600  shadow-sm focus:outline-none focus:ring focus:ring-darkGreen'
              />
              <div className='flex items-center'>
                <div className='flex flex-grow items-center'>
                  <input
                    type='checkbox'
                    id='showPassword'
                    checked={showPassword}
                    onChange={handleTogglePassword}
                    className='mr-2'
                  />
                  <label htmlFor='showPassword'>Show Password</label>
                </div>
              </div>
              <button
                type='submit'
                className='p-4 rounded-lg text-center text-2xl font-bold justify-center items-center border-gray-200 bg-darkGreen  text-white shadow-sm focus:border-white'
              >
                Get OTP
              </button>
            </form>
          </div>
        </div>

        <div className='rounded-md border-2'>
          <div className='mx-auto max-w-xl text-center '>
            <h2 className='text-2xl mt-10 font-bold text-darkGreen md:text-3xl '>
              LOGIN
            </h2>

            <form
      onSubmit={handleLogin}
      className='mb-0 space-y-3 rounded-lg p-4 sm:p-6 lg:p-8 mt-20 justify-center'
    >
      <input
        type='digit'
        name='outletPhoneNumber'
        maxLength={10}
        minLength={10}
        pattern='^[6789]\d{9}$'
        title='Enter a Valid 10-Digit Phone Number' 
        required
        placeholder='Enter Phone Number'
        className='w-full rounded-lg border-2 border-gray-300 p-4 pe-12 text-center text-sm text-gray-600 shadow-sm focus:outline-none focus:ring focus:ring-darkGreen'
      />
      <input
        type={showLoginPassword ? 'text' : 'password'}
        name='outletPassword'
        placeholder='Enter Password'
        maxLength={10}
        minLength={8}
        pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        title='Please enter a valid password with at least 8 characters(include a letter, a number, and a special character).'
        required
        className='w-full rounded-lg border-2 border-gray-300 p-4 pe-12 text-center text-sm text-gray-600 shadow-sm focus:outline-none focus:ring focus:ring-darkGreen'
      />
      <div className='flex items-center'>
        <div className='ml-auto flex flex-grow items-center'>
          <input
            type='checkbox'
            id='showLoginPassword'
            checked={showLoginPassword}
            onChange={handleToggleLoginPassword}
            className='mr-2 text-darkGreen'
          />
          <label htmlFor='showPassword'>Show Password</label>
        </div>
      </div>
      <div>
        <button
          className='mt-20 p-4 rounded-lg text-2xl font-bold border-gray-200 bg-darkGreen text-white shadow-sm focus:border-white'
        >
          Login
        </button>
      </div>
    </form>


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

export default Authscreen;

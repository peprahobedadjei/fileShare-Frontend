import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ApiResponse } from '../server/apiTypes';
import Loader from './Loader';
import { FaStar } from 'react-icons/fa';
import { clientFeedback } from '../server/clientFeedback';
import Modal from './Modal';


const colors = {
  orange: '#00C94C',
  grey: '#a9a9a9',
};

function UploadClientFeedback() {
  const router = useRouter();
  const { query } = router;
  const userName = (query.userName as string) || '';

  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    isOpen: false,
    isSuccess: false,
  });

  const [currentValue, setCurrentValue] = useState<number>(0);
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const [performanceOption, setPerformanceOption] = useState<string | null>(
    null
  );

  const stars = Array(5).fill(0);

  const handleClick = (value: number, index: number) => {
    setCurrentValue(value);
    console.log(`Clicked on star with index ${index}`);
  };
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };
  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const closeModal = () => {
    setModalData({ title: '', message: '', isOpen: false, isSuccess: false });
  };

  const handleOptionClick = (
    option: string,
    stateSetter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    stateSetter(option);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Selected star rating:', currentValue);
    console.log('Performance Option:', performanceOption);
    console.log('Scan Option:', selectedOption);

    setIsLoading(true);
    try {
      const apiResponse: ApiResponse = await clientFeedback(
        userName,currentValue,performanceOption, selectedOption
      );
      if (apiResponse.success) {
      setCurrentValue(0);
      setPerformanceOption(null);
      setSelectedOption(null);
      router.push({
        pathname: '/upload-feedback-success',
        query: { userName: userName },
      });
      } else {
        setModalData({
          title: 'Error',
          message: "Could not submit Feedback. Kindly Try again!",
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
    <div className='container mx-auto text-center'>
      <p className='text-center font-bold text-xl mb-1'>
        Hello, <span className='text-darkGreen'>{userName}</span> 
      </p>
      <p className='text-center font-semibold text-xl mb-2'>
        <span className='text-darkGreen font-medium text-base'>Thank you </span> 
        <span className='text-black font font-medium text-base'>for using </span> 
        <span className='text-darkPurple font-medium text-base'>EazyShare</span> 
      </p>
      <p className='text-center text-base mb-2'>
      Please, Give a Moment to Review Us!!
      </p>
  

      <form onSubmit={handleSubmit}>
      <div className='rounded-md border-2 border-gray-300 p-4'>
      <p className='mb-2 text-sm font-semibold'>
        How was your Experience with EazyShare. Rate Us!!
      </p>
        <div className=' flex justify-center'>
          {stars.map((_, index) => (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1, index)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              className='mr-4 cursor-pointer'
            />
          ))}
        </div>

        {[
          {
            question:
              'Did it Perform Better than WhatsApp/Gmail for File Sharing?',
            state: performanceOption,
            setter: setPerformanceOption,
          },
        ].map(({ question, state, setter }, index) => (
          <div key={index} className='mt-2'>
            <p className='mb-2 text-sm font-semibold'>{question}</p>
            <div className='flex justify-center'>
              <label
                onClick={() => handleOptionClick('Yes', setter)}
                className={`mr-4 cursor-pointer rounded-md border-2 border-darkGreen px-4 ${
                  state === 'Yes'
                    ? 'bg-darkGreen font-bold text-white'
                    : 'text-gray-700'
                }`}
              >
                Yes
              </label>
              <label
                onClick={() => handleOptionClick('No', setter)}
                className={`cursor-pointer rounded-md border-2 border-red-500 px-4 ${
                  state === 'No'
                    ? 'bg-red-500 font-bold text-white'
                    : 'text-gray-700'
                }`}
              >
                No
              </label>
            </div>
          </div>
        ))}
         <p className="text-sm mt-4 font-semibold">Did you face any Problem while Scanning the QR Code</p>

         <label className="block text-left text-sm mb-1">
          <input
            type="radio"
            name="option"
            value="No"
            checked={selectedOption === 'No'}
            onChange={() => handleOptionChange('No')}
          />
          No
        </label>

        <label className="block text-left text-sm mb-1">
          <input
            type="radio"
            name="option"
            value="I do not know how to Scan a QR Code"
            checked={selectedOption === 'I do not know how to Scan a QR Code'}
            onChange={() => handleOptionChange('I do not know how to Scan a QR Code')}
          />
          I do not know how to Scan a QR Code
        </label>

        <label className="block text-left text-sm mb-1">
          <input
            type="radio"
            name="option"
            value=" I do not know what is a QR Code"
            checked={selectedOption === ' I do not know what is a QR Code'}
            onChange={() => handleOptionChange(' I do not know what is a QR Code')}
          />
          I do not know what is a QR Code
        </label>
        <label className="block text-left text-sm mb-1">
          <input
            type="radio"
            name="option"
            value="option4"
            checked={selectedOption === ' I do not know what to use to Scan a QR Code'}
            onChange={() => handleOptionChange(' I do not know what to use to Scan a QR Code')}
          />
         I do not know what to use to Scan a QR Code
        </label>
        </div>
        <button 
      type='submit'
      className='group mt-4 flex h-12 w-full items-center justify-center space-x-2 rounded-md border-gray-200 bg-darkGreen text-white'>
          Submit Review
      </button>

      </form>
      

     
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

export default UploadClientFeedback;

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Loader from './Loader';
import Modal from './Modal';
import { ApiResponse } from '../server/apiTypes';
import { outletFeedback } from '../server/outletFeedback';
import { useRouter } from 'next/router';

const colors = {
  orange: '#00C94C',
  grey: '#a9a9a9',
};

const FeedBack: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    isOpen: false,
    isSuccess: false,
  });
  const router = useRouter();
  const outlet_name = router.query.outletName as string;

  const [currentValue, setCurrentValue] = useState<number>(0);
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const [fileManagementOption, setFileManagementOption] = useState<
    string | null
  >(null);
  const [performanceOption, setPerformanceOption] = useState<string | null>(
    null
  );
  const [taskEasierOption, setTaskEasierOption] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const stars = Array(5).fill(0);

  const handleClick = (value: number, index: number) => {
    setCurrentValue(value);
    console.log(`Clicked on star with index ${index}`);
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

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submit clicked!');
    console.log('Selected star rating:', currentValue);
    console.log('File Management Option:', fileManagementOption);
    console.log('Performance Option:', performanceOption);
    console.log('Task Easier Option:', taskEasierOption);
    console.log('Comment:', comment);

    setIsLoading(true);
    try {
      const apiResponse: ApiResponse = await outletFeedback(
        outlet_name,currentValue,fileManagementOption,performanceOption,taskEasierOption,comment
      );
      if (apiResponse.success) {
      setCurrentValue(0);
      setFileManagementOption(null);
      setPerformanceOption(null);
      setTaskEasierOption(null);
      setComment("");
      router.push('/feedback-success');
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
    <div className='container mx-auto p-8 text-center'>
      <p className='text-lg mb-4 font-medium'>How was your Experience with EazyShare. Rate Us!!</p>
      <form onSubmit={handleSubmit}>
        <div className='mb-4 flex justify-center'>
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
              'Did this Application make File Management and Sharing Easier?',
            state: fileManagementOption,
            setter: setFileManagementOption,
          },
          {
            question:
              'Did it Perform Better than WhatsApp/Gmail for File Sharing?',
            state: performanceOption,
            setter: setPerformanceOption,
          },
          {
            question:
              'Did this Application Make your everyday task/job Easier?',
            state: taskEasierOption,
            setter: setTaskEasierOption,
          },
        ].map(({ question, state, setter }, index) => (
          <div key={index} className='mt-6'>
            <p className='mb-2 text-lg font-medium'>{question}</p>
            <div className='flex justify-center'>
              <label
                onClick={() => handleOptionClick('Yes', setter)}
                className={`mr-4 cursor-pointer border-2 border-darkGreen px-4 rounded-md ${
                  state === 'Yes' ? 'font-bold text-white bg-darkGreen' : 'text-gray-700'
                }`}
              >
                Yes
              </label>
              <label
                onClick={() => handleOptionClick('No', setter)}
                className={`cursor-pointer border-2 border-red-500 px-4 rounded-md ${
                  state === 'No' ? 'font-bold text-white bg-red-500' : 'text-gray-700'
                }`}
              >
                No
              </label>
            </div>
          </div>
        ))}

        <div className='mt-6'>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            rows={4}
            placeholder='Please provide Feedback  -
            on your experience with this App, problems you are facing, any-thing you did not like'
            className='w-3/4 border-2 p-2 rounded-md bg-gray-100'
          />
        </div>

        <button
          type='submit'
          className='w-3/6 mt-3 rounded-md border-gray-200  bg-darkGreen p-4 pe-12 text-center text-sm text-white  shadow-sm focus:border-white font-semibold focus:outline-none'
        >
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
};

export default FeedBack;

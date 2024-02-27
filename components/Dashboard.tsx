import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PrintScreen from './PrintScreen';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { ApiResponse } from '../server/apiTypes';
import { getFiles } from '../server/getfiles';
import Loader from './Loader';
import Modal from './Modal';
import { deleteFile } from '../server/deletefile';
import { saveFile } from '../server/savefile';
import { downloadFile } from '../server/downloadfile';
import API_URLS from '../utils/baseUrls';

const DynamicDateTimeComponent = dynamic(
  () => import('../components/DateTime'),
  {
    ssr: false,
  }
);

interface UserData {
  outletName: string;
  outletPhoneNumber: string;
  outletOwnerName: string;
}

function UserDashboard() {
  const [userData, setUserData] = useState<UserData>(() => ({
    outletName: '',
    outletPhoneNumber: '',
    outletOwnerName: '',
  }));

  const router = useRouter();

  const [dataArray, setDataArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    isOpen: false,
    isSuccess: false,
  });


  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};

    // Check if userData exists in local storage
    if (!storedUserData.outletName) {
      // Redirect to the login page if userData is not present
      router.push('/outlet-auth');
    } else {
      setUserData(storedUserData);

      const fetchData = async () => {
        setIsLoading(true);
  
        try {
          const apiResponse = await getFiles(storedUserData.outletPhoneNumber);
          if (apiResponse.success) {
            setDataArray(apiResponse.body);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();

    }
  }, [router]);

  const [showPrintScreen, setShowPrintScreen] = useState(false);



  const handlegetFiles = async () => {

    setIsLoading(true)
    console.log(userData?.outletPhoneNumber)
       const apiResponse: ApiResponse = await getFiles(
         userData?.outletPhoneNumber
       );
       if (apiResponse.success) {
         setIsLoading(false)
         setDataArray(apiResponse.body);
         console.log(dataArray);
       }

    
  };

  const handleDeleteFile = (fileId) => async () => {
    setIsLoading(true);
    try {
      // Perform delete operation using fileId
      const apiResponse = await deleteFile(fileId);
      if (apiResponse.success) {
        try {
          const apiResponse: ApiResponse = await getFiles(
            userData?.outletPhoneNumber
          );
          if (apiResponse.success) {
            setDataArray(apiResponse.body);
            setModalData({
              title: 'Success',
              message: `File with ID ${fileId} deleted successfully`,
              isSuccess: true,
              isOpen: true,
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setModalData({
          title: 'Error',
          message: `Failed to delete file with ID ${fileId}`,
          isSuccess: false,
          isOpen: true,
        });
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleSaveFile = (fileId) => async () => {
    setIsLoading(true);
    try {
      // Perform delete operation using fileId
      const apiResponse = await saveFile(fileId, userData?.outletPhoneNumber);
      if (apiResponse.success) {
        try {
          const apiResponse: ApiResponse = await getFiles(
            userData?.outletPhoneNumber
          );
          if (apiResponse.success) {
            setDataArray(apiResponse.body);
            setModalData({
              title: 'Success',
              message: `File with ID ${fileId} saved successfully`,
              isSuccess: true,
              isOpen: true,
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setModalData({
          title: 'Error',
          message: `Failed to save file with ID ${fileId}`,
          isSuccess: false,
          isOpen: true,
        });
      }
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };

  const handleDownloadFile = (fileId) => async () => {
      // Open a new tab and navigate to the download endpoint
      const popup = window.open(`${API_URLS.base}/download?file_id=${fileId}`, '_blank');
  
      // Close the pop-up after a short delay (adjust timing as needed)
      setTimeout(() => {
        if (popup && !popup.closed) {
          popup.close();
        }
      }, 5000); // Close after 5 seconds (adjust as needed)


  };


  const closeModal = () => {
    setModalData({ title: '', message: '', isOpen: false, isSuccess: false });
  };




  const handleFeedback = () => {
    router.push({
      pathname: '/outlet-feedback',
      query: { outletName: userData?.outletName },
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push({
      pathname: '/outlet-auth',
    });
  };

  const handleSavedFiles = () => {
    router.push('/outlet-saved-files');
  };

  const handlePrint = () => {
    setShowPrintScreen(true);
    setTimeout(() => {
      window.print();
      setShowPrintScreen(false);
    }, 1500); // Adjust the timeout as needed
  };

  return (
    <div>
      {showPrintScreen ? (
        <PrintScreen />
      ) : (
        <div>
          <Header />
          <div className='p-5'>
            <div className='mt-4 grid grid-cols-1 lg:grid-cols-3'>
              <div className='h-16 items-center space-x-4 p-2 text-center'>
                <button
                  onClick={handleFeedback}
                  className='inline-block rounded-sm bg-darkGreen px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500'
                >
                  Feedback
                </button>
                <button
                  onClick={handlePrint}
                  className='inline-block rounded-sm bg-darkPurple px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500'
                >
                  QR Code
                </button>
              </div>

              <div className='h-16 text-center font-medium '>
                <p>{userData?.outletName}</p>
                <DynamicDateTimeComponent />
              </div>

              <div className='h-16 items-center space-x-4 p-2 text-center'>
                <button
                  onClick={handlegetFiles}
                  className='inline-block rounded-sm bg-gray-400 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500'
                >
                  Refresh List
                </button>
                <button
                  onClick={handleSavedFiles}
                  className='inline-block rounded-sm bg-darkPurple px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500'
                >
                  Saved Files
                </button>
                <button
                  onClick={handleLogout}
                  className='inline-block rounded-sm bg-darkRed px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500'
                >
                  LogOut
                </button>
              </div>
            </div>
            <div className='flex min-h-96 flex-col items-center justify-center'>
              {dataArray.length === 0 ? (
                <>
                  <p className='mb-4 text-lg'>
                    No Received Files Found for {userData?.outletName}
                  </p>
                  <button
                    onClick={handlegetFiles}
                    className='inline-block rounded-sm bg-darkGreen px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500'
                  >
                    Load All Received Files
                  </button>
                </>
              ) : (
                <div className='container mx-auto mt-5 h-full w-full p-5 text-center'>
                  {/* Header row */}
                  <div className='flex rounded-t-md border-2 border-gray-400 p-2'>
                    <div className='flex-1 text-center font-semibold'>
                      Received Files
                    </div>
                    <div className='flex-1 text-center font-semibold'>
                      Sent By
                    </div>
                    <div className='flex-1 text-center font-semibold'>
                      Actions
                    </div>
                  </div>

                  {/* Scrollable container */}
                  <div className='max-h-96 overflow-auto rounded-b-md border-2 border-borderGrey '>
                    {/* Row 1 */}
                    {dataArray.map((data, index) => (
                      <div className='mb-2 mt-2 flex border-t bg-gray-200 p-2 '>
                        <div className='flex-1 p-2'> {data.filename}</div>
                        <div className='flex-1 p-2'>{data.username}</div>
                        <div className='flex flex-1 items-center justify-center space-x-2'>
                          <button 
                           onClick={handleDownloadFile(data.file_id)}
                          className='inline-block rounded border bg-darkGreen p-1 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none'>
                            Download
                          </button>
                          <button
                            onClick={handleSaveFile(data.file_id)}
                            className='inline-block rounded border bg-darkPurple p-1 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none'
                          >
                            Save
                          </button>
                          <button
                            onClick={handleDeleteFile(data.file_id)}
                            className='inline-block rounded border bg-darkRed p-1 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none'
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
          <Footer />
        </div>
      )}
    </div>
  );
}

export default UserDashboard;

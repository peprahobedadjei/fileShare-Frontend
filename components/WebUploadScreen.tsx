import { CheckCircle, PlusCircle, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { FaPaperPlane, FaUpload } from 'react-icons/fa';
import { ApiResponse } from '../server/apiTypes';
import { upload } from '../server/upload';
import Modal from './Modal';
import Loader from './Loader';
import { useRouter } from 'next/router';

function WebUploadScreen  () {
const router = useRouter();
  const [files, setFiles] = useState<FileList | null>(null);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState<
    { fileName: string; userName: string }[]
  >([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: '',
    isOpen: false,
    isSuccess: false,
  });

  const closeModal = () => {

    setModalData({ title: '', message: '', isOpen: false, isSuccess: false });
    if(modalData.isSuccess==true){
      router.push({
        pathname: '/client-feedback',
        query: { userName: userName },
      });
  };


}

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Create a new FileList with the existing and new files
      const updatedFilesList = new DataTransfer();
      Array.from(files || []).forEach((file) =>
        updatedFilesList.items.add(file)
      );
      Array.from(e.target.files).forEach((file) =>
        updatedFilesList.items.add(file)
      );

      // Set the updated FileList
      setFiles(updatedFilesList.files);
      console.log('Files updated:', updatedFilesList.files);
    }
  };

  const handleFileRemove = (index: number) => {
    if (files) {
      // Convert FileList to array
      const updatedFilesArray = Array.from(files);

      // Remove the file from the array
      updatedFilesArray.splice(index, 1);

      // Convert the array back to FileList
      const updatedFilesList = new DataTransfer();
      updatedFilesArray.forEach((file) => updatedFilesList.items.add(file));

      setFiles(updatedFilesList.files);

      // Remove the file from the uploadingFiles array
      const updatedUploadingFiles = [...uploadingFiles];
      updatedUploadingFiles.splice(index, 1);
      setUploadingFiles(updatedUploadingFiles);
    }
  };

  const handleUpload = async () => {
    if (files && files.length > 0 && userName.trim() !== '') {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const fileName = files[i].name;
        setUploadingFiles((prevFiles) => [
          ...prevFiles,
          { fileName, userName },
        ]);

        // Append each file with a unique key (e.g., file0, file1, file2, ...)
        formData.append(`file${i}`, files[i]);
      }

      // Append the userName to the form data
      formData.append('userName', userName);
      setIsLoading(true);
      try {
        const apiResponse: ApiResponse = await upload(formData, phoneNumber);
        if (apiResponse.success) {
          const successMessage = apiResponse['message'];
          setModalData({
            title: 'Success',
            message: successMessage,
            isSuccess: true,
            isOpen: true,
          });

          setUploadProgress(null);
          setFiles(null);
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
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className='mx-auto max-w-screen-xl p-3 px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-lg'>
        <div
          className='mb-0 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8'
        >
          <div>
            <label htmlFor='email' className='sr-only'>
              Name
            </label>

            <div className='relative'>
              <input
                value={userName}
                required
                onChange={(e) => setUserName(e.target.value)}
                className='w-full rounded-md border-2 border-gray-400 p-2 text-center text-lg text-darkGreen shadow-sm outline-none'
                placeholder='Enter Your Name'
              />
            </div>
          </div>

          <div>
            <label htmlFor='email' className='sr-only'>
              Phone
            </label>

            <div className='relative'>
              <input
                value={phoneNumber}
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
                className='w-full rounded-md border-2 border-gray-400 p-2 text-center text-lg text-darkGreen shadow-sm outline-none'
                placeholder='Enter Shop Phone Number'
              />
            </div>
          </div>
          <div className='border-gray rounded-md border-2 p-3'>
            <div className='space-y-2 py-4'>
              <input
                id='file-input'
                type='file'
                required
                onChange={handleFileChange}
                multiple
                className='absolute opacity-0'
                style={{ zIndex: -1 }}
              />

              <label
                htmlFor='file-input'
                className='relative flex items-center justify-center rounded-lg px-5 text-xl text-darkGreen'
                style={{ zIndex: 0 }}
              >
                <span>
                  <FaUpload />
                </span>
                <span>Upload File</span>
              </label>
              <div className='border-b-2 border-borderGrey'></div>
            </div>
            <div className='h-56 overflow-auto p-2'>
              {files && files.length > 0 ? (
                Array.from(files).map((file, index) => (
                  <li
                    key={index}
                    className='mb-1 flex items-center rounded-md bg-gray-200 p-3 text-sm'
                  >
                    <span>
                      {file.name.length > 10
                        ? `${file.name.slice(0, 15)}...`
                        : file.name}
                    </span>

                    <div className='flex-grow'></div>
                    {uploadProgress === null ? (
                      <XCircle
                        onClick={() => handleFileRemove(index)}
                        className='size-18 flex w-20 cursor-pointer items-end text-end text-red-600'
                      />
                    ) : (
                      <CheckCircle />
                    )}
                  </li>
                ))
              ) : (
                <label
                  htmlFor='file-input'
                  className='flex h-60 flex-col items-center justify-center'
                >
                  <PlusCircle className='size-19 mb-4 font-semibold text-darkRed' />
                  <p className='font-semibold text-darkGreen'>
                    Tap to Upload Files
                  </p>
                </label>
              )}
            </div>
          </div>

          <button
            onClick={handleUpload}
            disabled={!files || files.length === 0}
            className={`group mt-4 flex h-12 w-full items-center justify-center space-x-2 rounded-md border-gray-200 ${
              !files || files.length === 0 ? 'bg-tintGrey' : 'bg-darkGreen'
            } p-4 pe-12 text-base text-white shadow-sm focus:border-white focus:outline-none`}
          >
            <span className='font-medium transition-colors group-hover:text-white'>
              {' '}
              Send File{' '}
            </span>

            <span>
              <FaPaperPlane />
            </span>
          </button>
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
export default WebUploadScreen;

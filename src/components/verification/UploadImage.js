import React, { useState } from 'react';
import axios from 'axios';
import ImageIcon from './icon/ImageIcon';
import CountdownTimer from './CountdownTimer';
import getUserIdFromToken from '../../utils/getUserIdFromToken';

const UploadImage = ({ habitImage, status, endTime, creator }) => {
  const [file, setFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const loginId = getUserIdFromToken();
  const habitId = '65052c908778e300be9d43f3';

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    onUpload();
  };

  const onUpload = async () => {
    try {
      const formData = new FormData();

      formData.append('image', file);

      const response = await axios.post(
        // `${process.env.REACT_APP_SERVER_DOMAIN}/api/image`,
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}/image`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      setUploadedImage(response.data.url);
      setUploadStatus(`업로드 성공! URL: ${response.data.url}`);
    } catch (error) {
      setUploadStatus(`업로드 실패: ${error.response.data.message}`);
    }
  };

  return (
    <div className='w-[240px] bg-dark-blue-bg rounded-xl flex'>
      {habitImage ? (
        <img
          src={habitImage}
          alt=''
          className='w-[220px] h-[280px] object-cover rounded-xl'
        />
      ) : (
        status === 'awaitingVerification' && (
          <>
            <label
              className='flex items-center justify-center w-full h-[desired-height] m-2 bg-gray-bg rounded-xl text-[#F7F8FD] hover:bg-dark-gray-bg hover:text-[#F7F8FD]'
              htmlFor='inputImage'
              style={{ cursor: 'pointer' }}
              onChange={onFileChange}
            >
              <div className='text-center font-bold'>
                {status === 'awaitingVerification' && (
                  <CountdownTimer endTime={endTime} />
                )}
                <p>사진 업로드</p>
                <ImageIcon />
              </div>
            </label>
            <input
              id='inputImage'
              type='file'
              onChange={onFileChange}
              style={{ display: 'none' }}
            />
          </>
        )
      )}
    </div>
  );
};

export default UploadImage;

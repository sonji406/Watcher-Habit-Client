import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageIcon from '../icon/ImageIcon';
import CountdownTimer from './CountdownTimer';

const UploadImage = ({ habitId, endTime, setImageUrl }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}/image`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );

      setImageUrl(response.data.imageUrl);
    } catch (error) {
      setError('업로드 실패');
    }
  };

  useEffect(() => {
    if (file) {
      onUpload();
    }
  }, [file]);

  return (
    <>
      <label
        className='flex items-center justify-center w-full m-2 rounded-xl text-[#F7F8FD] hover:bg-dark-gray-bg hover:text-[#F7F8FD]'
        htmlFor='inputImage'
        style={{ cursor: 'pointer' }}
        onChange={onFileChange}
      >
        <div className='text-center font-bold'>
          <CountdownTimer endTime={endTime} />
          <p>사진 업로드</p>
          <ImageIcon />
          {error && <p>{error}</p>}
        </div>
      </label>
      <input
        id='inputImage'
        type='file'
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default UploadImage;

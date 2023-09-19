import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageIcon from './icon/ImageIcon';
import CountdownTimer from './CountdownTimer';

const UploadImage = ({ habitId, endTime, uploadImageUrl }) => {
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

      console.log('response', response);
      uploadImageUrl(response.data.imageUrl);
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
        className='flex mt-16 items-center justify-center text-center font-bold'
        htmlFor='inputImage'
        style={{ cursor: 'pointer' }}
      >
        <div className='mx-auto'>
          <CountdownTimer endTime={endTime} />
          <ImageIcon />
        </div>
        {error && <p>{error}</p>}
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

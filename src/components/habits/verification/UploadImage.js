import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageIcon from './icon/ImageIcon';
import CountdownTimer from './CountdownTimer';
import { useDispatch, useSelector } from 'react-redux';
import { setHabitDetail } from '../../../redux/habitSlice';

const UploadImage = ({ habitId, endTime }) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const habitDetail = useSelector((state) => state.habit.habitDetail);

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

      const updatedHabitDetail = {
        ...habitDetail,
        habitImage: response.data.imageUrl,
        status: 'awaitingApproval',
      };

      dispatch(setHabitDetail(updatedHabitDetail));
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

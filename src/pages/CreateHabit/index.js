import React, { useState } from 'react';
import Header from '../../components/common/Header';
import { useValidation } from '../../hooks/useValidationForm';
import { useGroups } from '../../hooks/useGroups';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import HabitInfoForm from './HabitInfoForm';
import DateForm from './DateForm';
import RepeatForm from './RepeatForm';
import TimeForm from './TimeForm';
import GroupForm from './GroupForm';
import PenaltyForm from './PenaltyForm';
import MinApprovalForm from './MinApprovalForm';
import ValidationForm from './ValidationForm';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import axios from 'axios';
import {
  convertTimeToMinutes,
  formatTimeFromMinutes,
} from '../../utils/timeUtils';

const token = localStorage.getItem('accessToken');
const userId = getUserIdFromToken(token);

const CreateOrEditHabit = ({ isEdit = false }) => {
  const today = new Date().toISOString().split('T')[0];
  const [habitTitle, setHabitTitle] = useState('');
  const [habitContent, setHabitContent] = useState('');
  const [habitStartDate, setHabitStartDate] = useState(today);
  const [habitEndDate, setHabitEndDate] = useState('');
  const [doDay, setDoDay] = useState([]);
  const [startTime, setStartTime] = useState('01:00');
  const [duration, setDuration] = useState(0);
  const [timePeriod, setTimePeriod] = useState('AM');
  const [penalty, setPenalty] = useState('');
  const [minApprovalCount, setMinApprovalCount] = useState(0);
  const [sharedGroup, setSharedGroup] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { validationMessage, validateForm } = useValidation();
  const { groupOptions } = useGroups(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm({
      habitTitle,
      habitContent,
      habitStartDate,
      habitEndDate,
      doDay,
      startTime,
      duration,
      minApprovalCount,
      sharedGroup,
      penalty,
    });

    if (!isValid) return;

    setIsSubmitting(true);

    const startTimeInMinutes = convertTimeToMinutes(startTime, timePeriod);
    const endTimeInMinutes = startTimeInMinutes + duration;

    const newStartTime = formatTimeFromMinutes(startTimeInMinutes);
    const endTime = formatTimeFromMinutes(endTimeInMinutes);

    const habitData = {
      creator: userId,
      doDay,
      startTime: newStartTime,
      endTime,
      habitStartDate,
      habitEndDate,
      minApprovalCount,
      habitTitle,
      habitContent,
      penalty,
    };

    if (sharedGroup) {
      habitData.sharedGroup = sharedGroup;
    }

    try {
      let response;
      if (isEdit) {
        response = await axios.patch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitData.habitId}`,
          habitData,
        );
      } else {
        response = await axios.post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit`,
          habitData,
        );
      }

      if (response.status === 200 || response.status === 201) {
        console.log('Success:', response.data);
      } else {
        console.log('Error:', response.data);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col text-black bg-main-bg custom-scrollbar overflow-y-auto'>
      <Header />
      <div className='container mx-auto flex justify-center items-start h-full overflow-y-auto m-20'>
        <div className='w-full max-w-3xl p-8 m-4 bg-white rounded shadow-md overflow-y-auto'>
          <h1 className='block w-full text-center text-grey-darkest mb-6 text-2xl font-semibold'>
            {isEdit ? '습관 수정하기' : '습관 생성하기'}
          </h1>

          <form onSubmit={handleSubmit}>
            <HabitInfoForm
              habitTitle={habitTitle}
              setHabitTitle={setHabitTitle}
              habitContent={habitContent}
              setHabitContent={setHabitContent}
            />

            <DateForm
              habitStartDate={habitStartDate}
              setHabitStartDate={setHabitStartDate}
              habitEndDate={habitEndDate}
              setHabitEndDate={setHabitEndDate}
            />

            <RepeatForm doDay={doDay} setDoDay={setDoDay} />

            <TimeForm
              startTime={startTime}
              setStartTime={setStartTime}
              timePeriod={timePeriod}
              setTimePeriod={setTimePeriod}
              duration={duration}
              setDuration={setDuration}
            />

            <GroupForm
              sharedGroup={sharedGroup}
              setSharedGroup={setSharedGroup}
              groupOptions={groupOptions}
            />

            <PenaltyForm penalty={penalty} setPenalty={setPenalty} />

            <MinApprovalForm
              minApprovalCount={minApprovalCount}
              setMinApprovalCount={setMinApprovalCount}
              sharedGroup={sharedGroup}
            />

            <ValidationForm validationMessage={validationMessage} />

            <div className='flex justify-between mt-6'>
              <SubmitButton
                isEdit={isEdit}
                isLoading={isSubmitting}
                handleSubmit={handleSubmit}
              />

              <CancelButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditHabit;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useValidation } from '../../hooks/useValidationForm';
import { useFetchUserInfo } from '../../hooks/useFetchUserInfo';
import { useHandleSubmit } from '../../hooks/useHandleSubmit';
import { useFetchHabitData } from '../../hooks/useFetchHabitData';
import { useFetchUserData } from '../../hooks/useFetchUserData';
import getUserIdFromToken from '../../utils/getUserIdFromToken';

import HabitInfoForm from './forms/HabitInfoForm';
import DateForm from './forms/DateForm';
import RepeatForm from './forms/RepeatForm';
import TimeForm from './forms/TimeForm';
import GroupForm from './forms/GroupForm';
import PenaltyForm from './forms/PenaltyForm';
import MinApprovalForm from './forms/MinApprovalForm';
import ValidationForm from './forms/ValidationForm';
import SubmitButton from './utils/SubmitButton';
import CancelButton from './utils/CancelButton';
import calculateTimeDetails from './utils/calculateTimeDetails';

const token = localStorage.getItem('accessToken');
const userId = getUserIdFromToken(token);

const CreateOrEditHabit = ({ isEdit = false }) => {
  const today = new Date().toISOString().split('T')[0];
  const { habitId } = useParams();
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
  const { validationMessage, validateForm } = useValidation();
  const [groupList, setGroupList] = useState([]);
  const navigate = useNavigate();
  const nickname = useFetchUserInfo(userId);

  const habitData = useFetchHabitData(habitId, isEdit);
  const fetchedGroupList = useFetchUserData(userId);

  useEffect(() => {
    if (habitData) {
      setHabitTitle(habitData.habitTitle);
      setHabitContent(habitData.habitContent);
      setHabitStartDate(habitData.habitStartDate);
      setHabitEndDate(habitData.habitEndDate);
      setDoDay(habitData.doDay);

      const { timePeriod, hour, minute, duration } = calculateTimeDetails(
        habitData.startTime,
        habitData.endTime,
      );

      setStartTime(`${hour}:${minute}`);
      setTimePeriod(timePeriod);
      setDuration(duration);

      setPenalty(habitData.penalty);
      setMinApprovalCount(habitData.minApprovalCount);

      if (habitData.sharedGroup === null) {
        setSharedGroup('');
      } else {
        setSharedGroup(habitData.sharedGroup._id);
      }
    }
  }, [habitData]);

  useEffect(() => {
    if (fetchedGroupList) {
      setGroupList(fetchedGroupList);
    }
  }, [fetchedGroupList]);

  useEffect(() => {
    if (!isEdit) {
      setHabitTitle('');
      setHabitContent('');
      setHabitStartDate(today);
      setHabitEndDate('');
      setDoDay([]);
      setStartTime('01:00');
      setDuration(0);
      setPenalty('');
      setMinApprovalCount(0);
      setSharedGroup(null);
    }
  }, [isEdit, today]);

  const { handleSubmit, isSubmitting, message, messageType } = useHandleSubmit(
    validateForm,
    userId,
    navigate,
    nickname,
    isEdit,
    habitId,
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();

    handleSubmit({
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
      timePeriod,
    });
  };

  return (
    <div
      className='min-h-screen flex flex-col text-black bg-main-bg custom-scrollbar overflow-y-auto bg-vignette'
      style={{ fontFamily: 'NotoSansKR' }}
    >
      <div className='container mx-auto flex justify-center items-start h-full overflow-y-auto m-20'>
        <div className='w-full max-w-3xl p-8 m-4 bg-white rounded shadow-md overflow-y-auto'>
          <h1 className='block w-full text-center text-grey-darkest mb-6 text-2xl font-semibold'>
            {isEdit ? '습관 수정하기' : '습관 생성하기'}
          </h1>

          <form onSubmit={handleFormSubmit}>
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
              groupOptions={groupList}
              isEdit={isEdit}
            />

            <PenaltyForm penalty={penalty} setPenalty={setPenalty} />

            <MinApprovalForm
              minApprovalCount={minApprovalCount}
              setMinApprovalCount={setMinApprovalCount}
              sharedGroup={sharedGroup}
            />

            <ValidationForm validationMessage={validationMessage} />

            <div
              className={`message text-${
                messageType === 'success' ? 'green-500' : 'red-500'
              }`}
            >
              {message}
            </div>

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

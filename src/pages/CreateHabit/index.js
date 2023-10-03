import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDocumentTitle } from '../../hooks/useDocumentTitle';
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
  const documentTitle = isEdit ? '습관 수정 페이지' : '습관 생성 페이지';
  useDocumentTitle(documentTitle);
  const navigate = useNavigate();
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

      const group = habitData.sharedGroup ? habitData.sharedGroup._id : '';
      setSharedGroup(group);
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
      className='min-h-screen flex flex-col bg-main-bg custom-scrollbar bg-vignette'
      style={{ fontFamily: 'NotoSansKR' }}
    >
      <div className='container mx-auto flex justify-center items-center h-full'>
        <div className='flex justify-center items-center'>
          <div className='flex flex-col w-full max-w-3xl mt-16'>
            <h1 className='self-center block text-center text-white text-2xl font-semibold'>
              {isEdit ? '습관 수정하기' : '습관 생성하기'}
            </h1>
            <div className='relative'>
              <div
                className='items-center w-[70vw] h-[74vh] max-w-3xl p-10 my-4 bg-[#2D3C4A] rounded-2xl shadow-md overflow-y-auto custom-scrollbar border-4 border-customdarkgray'
                style={{ maxHeight: 'calc(100vh - 2rem)' }}
              >
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
                  <div className='flex justify-end mr-10'>
                    <div className='absolute bottom-[-40] right-10'>
                      <div className='flex space-x-4'>
                        <ValidationForm validationMessage={validationMessage} />
                        <span
                          className={`message ${
                            messageType === 'success'
                              ? 'text-green-500'
                              : 'text-red-500'
                          } text-right mt-4 `}
                        >
                          {message}
                        </span>

                        <SubmitButton
                          isEdit={isEdit}
                          isLoading={isSubmitting}
                          handleSubmit={handleSubmit}
                        />
                        <CancelButton />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditHabit;

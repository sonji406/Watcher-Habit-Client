import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import { useValidation } from '../../hooks/useValidationForm';
import { useGroups } from '../../hooks/useGroups';
import { useSubmitHabit } from '../../hooks/useSubmitHabit';
import decodeJwtResponse from '../../utils/decodeJwtResponse';

const getUserIdFromToken = () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const decoded = decodeJwtResponse(accessToken);
    return decoded.userId;
  } catch (decodeError) {
    console.error('Error decoding JWT:', decodeError);
    return null;
  }
};

const userId = getUserIdFromToken();

console.log(userId);

const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
const minuteOptions = ['00', '15', '30', '45'];

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
  const [submitFlag, setSubmitFlag] = useState(false);
  const { validationMessage, validateForm } = useValidation();

  const navigate = useNavigate();

  const hourOptions =
    timePeriod === 'AM'
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 12 }, (_, i) => i + 1);

  const durationOptions = Array.from({ length: 13 }, (_, i) => i);

  const isFormValid =
    habitTitle &&
    habitContent &&
    habitStartDate &&
    habitEndDate &&
    doDay.length &&
    startTime &&
    duration;

  const { groupOptions } = useGroups();

  const handleSubmit = () => {
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
    });

    if (!isValid) return;

    setSubmitFlag(!submitFlag);
  };

  const toggleDay = (day) => {
    setDoDay((prevDoDay) => {
      if (prevDoDay.includes(day)) {
        return prevDoDay.filter((d) => d !== day);
      } else {
        return [...prevDoDay, day];
      }
    });
  };

  const toggleAllDays = () => {
    if (doDay.length === 7) {
      setDoDay([]);
    } else {
      setDoDay(daysOfWeek);
    }
  };

  const habitData = {
    habitTitle,
    habitContent,
    habitStartDate,
    habitEndDate,
    doDay,
    startTime,
    timePeriod,
    duration,
    penalty,
    minApprovalCount,
    sharedGroup,
    creator: userId,
  };

  useSubmitHabit(habitData, isFormValid, isEdit, submitFlag);

  return (
    <div className='min-h-screen flex flex-col text-black bg-main-bg custom-scrollbar overflow-y-auto'>
      <Header />
      <div className='container mx-auto flex justify-center items-start h-full overflow-y-auto m-20'>
        <div className='w-full max-w-3xl p-8 m-4 bg-white rounded shadow-md overflow-y-auto'>
          <h1 className='block w-full text-center text-grey-darkest mb-6 text-2xl font-semibold'>
            {isEdit ? '습관 수정하기' : '습관 생성하기'}
          </h1>

          <label>습관 제목</label>
          <div className='mb-4'>
            <input
              className='w-full p-2 border rounded'
              type='text'
              value={habitTitle}
              onChange={(e) => setHabitTitle(e.target.value)}
              placeholder='습관 제목을 입력하세요(최대 10자)'
              minLength={2}
              maxLength={10}
            />
          </div>

          <label>습관 내용</label>
          <div className='mb-4'>
            <textarea
              className='w-full p-2 border rounded'
              value={habitContent}
              onChange={(e) => setHabitContent(e.target.value)}
              placeholder='습관 내용을 입력하세요(최대 100자)'
              minLength={2}
              maxLength={100}
            />
          </div>

          <label>기한</label>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <input
              className='p-2 border rounded'
              type='date'
              value={habitStartDate}
              min={today}
              onChange={(e) => setHabitStartDate(e.target.value)}
              placeholder='Start Date'
            />

            <input
              className='p-2 border rounded'
              type='date'
              value={habitEndDate}
              min={habitStartDate}
              onChange={(e) => setHabitEndDate(e.target.value)}
              placeholder='End Date'
            />
          </div>

          <label>반복 주기</label>
          <div className='mb-4 flex justify-between'>
            <button
              className={`py-2 px-4 border rounded ${
                doDay.length === 7 ? 'bg-green-bg' : ''
              }`}
              onClick={toggleAllDays}
            >
              매일
            </button>

            <span>매주</span>
            {daysOfWeek.map((day) => (
              <button
                key={day}
                className={`py-2 px-4 border rounded ${
                  doDay.includes(day) ? 'bg-green-bg' : ''
                }`}
                onClick={() => {
                  toggleDay(day);
                }}
              >
                {day}
              </button>
            ))}
          </div>

          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div className='flex items-center space-x-2'>
              <span>시작시간 </span>
              <select
                className='p-2 border rounded'
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
              >
                <option value='AM'>AM</option>
                <option value='PM'>PM</option>
              </select>
              <select
                className='p-2 border rounded'
                value={startTime.split(':')[0]}
                onChange={(e) => {
                  const newHour = e.target.value;
                  const newMinute = startTime.split(':')[1];
                  setStartTime(`${newHour}:${newMinute}`);
                }}
              >
                {hourOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <span>시</span>

              <select
                className='p-2 border rounded'
                value={startTime.split(':')[1]}
                onChange={(e) => {
                  const newHour = startTime.split(':')[0];
                  const newMinute = e.target.value;
                  setStartTime(`${newHour}:${newMinute}`);
                }}
              >
                {minuteOptions.map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
              <span>분 부터</span>
            </div>

            <div className='flex space-x-2'>
              <select
                className='p-2 border rounded'
                value={Math.floor(duration / 60)}
                onChange={(e) => setDuration(e.target.value * 60)}
              >
                {durationOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <span>시간</span>

              <select
                className='p-2 border rounded'
                value={duration % 60}
                onChange={(e) =>
                  setDuration(
                    Math.floor(duration / 60) * 60 + Number(e.target.value),
                  )
                }
              >
                {minuteOptions.map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
              <span>분 동안</span>
            </div>
          </div>

          <label>그룹 선택</label>
          <div className='mb-4'>
            <select
              className='w-full p-2 border rounded'
              value={sharedGroup || ''}
              onChange={(e) => setSharedGroup(e.target.value)}
            >
              <option value=''>
                초대된 그룹만 선택 가능합니다(미선택 시 비공개 처리됩니다)
              </option>
              {groupOptions.map((group) => (
                <option key={group.groupId} value={group.groupId}>
                  {group.groupName}
                </option>
              ))}
            </select>
          </div>

          <label>패널티 내용</label>
          <div className='mb-4'>
            <textarea
              className='w-full p-2 border rounded'
              type='text'
              value={penalty}
              onChange={(e) => setPenalty(e.target.value)}
              placeholder='(선택사항) 패널티 내용을 입력하세요(최대 50자)'
              minLength={2}
              maxLength={50}
            />
          </div>

          {sharedGroup && (
            <>
              <label>최소 승인 인원</label>
              <div className='mb-4 flex items-center'>
                <button
                  className='bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded'
                  onClick={() =>
                    setMinApprovalCount(Math.max(minApprovalCount - 1, 0))
                  }
                >
                  -
                </button>
                <span className='px-4'>{minApprovalCount}</span>
                <button
                  className='bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded'
                  onClick={() => setMinApprovalCount(minApprovalCount + 1)}
                >
                  +
                </button>
              </div>
            </>
          )}
          {validationMessage && (
            <div className='text-red-500'>{validationMessage}</div>
          )}
          <div className='flex justify-between mt-6'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleSubmit}
            >
              {isEdit ? 'Edit' : 'Create'}
            </button>
            <button
              className='bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded'
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrEditHabit;

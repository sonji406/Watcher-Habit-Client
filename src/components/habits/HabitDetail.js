import React from 'react';
import { useSelector } from 'react-redux';
import ClockArcs from './ClockArcs';

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const HabitDetail = () => {
  const habitDetail = useSelector((state) => state.habit.habitDetail);

  console.log(habitDetail);

  if (!habitDetail || isEmptyObject(habitDetail)) {
    return (
      <div className='h-[70vh] text-dark-gray-txt flex justify-center items-center text-center'>
        좌측의 카드를 클릭하여
        <br />
        해당 습관의 상세 정보를 확인할 수 있습니다
      </div>
    );
  }

  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const daysOfWeekInKorean = ['일', '월', '화', '수', '목', '금', '토'];

  const startDate = new Date(habitDetail.habitStartDate);
  const endDate = new Date(habitDetail.habitEndDate);
  const durationDays =
    Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  const [startHour, startMinute] = habitDetail.startTime.split(':').map(Number);
  const [endHour, endMinute] = habitDetail.endTime.split(':').map(Number);
  let durationHours = endHour - startHour;
  let durationMinutes = endMinute - startMinute;

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  let timeDisplay = '';
  if (durationHours > 0 && durationMinutes > 0) {
    timeDisplay = `${durationHours}시간 ${durationMinutes}분`;
  } else if (durationHours > 0) {
    timeDisplay = `${durationHours}시간`;
  } else if (durationMinutes > 0) {
    timeDisplay = `${durationMinutes}분`;
  }

  return (
    <div className='h-full overflow-hidden bg-dark-blue-bg rounded-3xl z-10 relative p-3'>
      <div className='h-full overflow-y-auto pt-4 pr-2 custom-scrollbar'>
        <div className='p-4 rounded-lg flex justify-between items-end'>
          <h1 className='text-3xl text-center flex-1'>
            {habitDetail.habitTitle}
          </h1>
        </div>
        <div className='mb-4 text-right'>
          작성자 {habitDetail.creator.nickname}
        </div>
        <div className='bg-main-bg p-4 rounded-lg mb-4 text-center'>
          <p className='font-bold text-left'>내용</p>
          <p className='mb-4 text-2xl'>{habitDetail.habitContent}</p>
        </div>

        <div className='bg-main-bg p-4 rounded-lg mb-4 text-center'>
          <p className='font-bold text-left'>패널티</p>
          <p className='mb-4 text-2xl'>{habitDetail.penalty}</p>
        </div>

        <div className='flex justify-between'>
          <div className='bg-main-bg p-4 rounded-lg mb-4 w-1/3 mr-2'>
            <span className='font-bold text-left block'>기한</span>

            <div className='text-center text-xl'>
              {habitDetail.habitStartDate}
            </div>
            <div className='text-center text-xl mb-4'>
              ~ {habitDetail.habitEndDate}
            </div>
            <div className='text-center text-xl mb-2'>
              {durationDays}일 동안
            </div>
          </div>

          <div className='bg-main-bg p-4 rounded-lg mb-4 w-2/3 ml-2 flex justify-between'>
            <div className='w-1/2'>
              <span className='font-bold text-left block'>시간</span>
              <div className='text-center text-xl'>{habitDetail.startTime}</div>
              <div className='text-center text-xl mb-4'>
                ~ {habitDetail.endTime}
              </div>
              <div className='text-center text-xl mb-2'>
                하루에 {timeDisplay}
              </div>
            </div>

            <div className='w-1/2 flex justify-center mt-4'>
              <ClockArcs startMinutes={startMinutes} endMinutes={endMinutes} />
            </div>
          </div>
        </div>
        <div className='bg-main-bg p-4 rounded-lg mb-4 text-left'>
          <span className='font-bold'>반복 요일</span>
          <div className='flex justify-center'>
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className={`mr-1 ml-1 mb-4 flex text-center rounded-full pr-3 pl-3 pt-1 pb-1 ${
                  habitDetail.doDay.includes(day)
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              >
                {daysOfWeekInKorean[index]}
              </div>
            ))}
          </div>
        </div>

        <div className='bg-main-bg p-4 rounded-lg'>
          <p className='mb-4'>왓쳐 공간</p>
        </div>
      </div>
    </div>
  );
};

export default HabitDetail;

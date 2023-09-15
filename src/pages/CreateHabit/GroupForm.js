import React from 'react';

const GroupForm = ({ sharedGroup, setSharedGroup, groupOptions }) => {
  return (
    <div>
      <label className='relative'>
        그룹 선택
        <span className='ml-2 inline-block group cursor-pointer'>
          <span className='bg-gray-200 rounded-full pr-2 pl-2'>?</span>
          <span
            className='absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity p-4 rounded border text-sm'
            style={{
              left: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              minWidth: '300px',
              backgroundColor: '#f2f2f2',
            }}
          >
            <div className='mb-2'>
              <span className='text-black'>그룹 선택이란?</span>
            </div>
            <div className='mb-2'>
              <span className='text-green-500'>그룹 미선택 시</span>
              <div>
                비공개 처리 되며, 나의 습관 관리 페이지에서 본인만 확인 가능한
                습관이 생성됩니다.
              </div>
            </div>
            <div>
              <span className='text-blue-500'>그룹 선택 시</span>
              <div>
                해당 그룹 페이지에 공유 되며, 나의 습관 관리 페이지에서도 확인
                가능한 습관이 생성됩니다.
              </div>
            </div>
          </span>
        </span>
      </label>
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
    </div>
  );
};

export default GroupForm;

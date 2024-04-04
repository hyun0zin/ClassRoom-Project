import React, { useEffect, useId, useState } from 'react';
import { userId } from '@/app/(clrm)/mypage/page';
import { getTeacherInfo, updateTeacherInfo } from '@/app/api/mypage/user-api';
import { useUserStore } from '@/store/UserInfoStore';
import { useQuery } from '@tanstack/react-query';
import { FIELDS, FieldType, JOBS, JobType } from '@/types/authUser/authUserTypes';
import SelectOption from '../SelectOption';

const EditTeacherInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [newSelectedJob, setNewSelectedJob] = useState('');
  const [newSelectedField, setNewSelectedField] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [account, setAccount] = useState('');

  const { userInfo } = useUserStore();

  const { data: teacherInfo, isPending } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getTeacherInfo()
  });

  // id와 htmlFor 연결 => useId 내장 훅 사용
  const jobId = useId();
  const fieldId = useId();
  const bankId = useId();

  const koreanBanks = [
    '국민은행',
    '우리은행',
    '신한은행',
    '하나은행',
    '기업은행',
    '농협은행',
    'KEB하나은행',
    'SC제일은행',
    '씨티은행',
    'BNK경남은행',
    '광주은행',
    '대구은행',
    '부산은행',
    '전북은행',
    '제주은행',
    '카카오뱅크'
  ];

  // 초기 직업/ 비지니스 분야
  useEffect(() => {
    if (teacherInfo) {
      setNewSelectedJob(teacherInfo.job);
      setNewSelectedField(teacherInfo.field);
      setSelectedBank(teacherInfo ? teacherInfo?.bank : '');
      setAccount(teacherInfo ? teacherInfo.account : '');
    }
  }, [teacherInfo]);

  const handleOnChangeJob = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewSelectedJob(e.target.value);
  };
  const handleOnChangeField = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewSelectedField(e.target.value);
  };
  const handleOnChangeSelectedBank = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(e.target.value);
  };
  const handleOnChangeAddAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 계좌번호 숫자만 입력 가능하게 하기 (유효성 검사)
    setAccount(value);
  };

  // 수정하기 버튼 -> supabase에 수정한 정보 update
  const handleOnClickEditTeacherInfoBtn = () => {
    // 수정된 사항이 없는 경우
    const isJobChanged = newSelectedJob !== teacherInfo?.job;
    const isFieldChanged = newSelectedField !== teacherInfo?.field;
    const isSelectedBankChanged = selectedBank !== teacherInfo?.bank;
    const isAccountChanged = account !== teacherInfo?.account;

    if (!isJobChanged && !isFieldChanged && !isSelectedBankChanged && !isAccountChanged) {
      alert('수정 사항이 없습니다.');
      return;
    }

    // 수정된 사항이 있는 경우
    updateTeacherInfo({ newSelectedJob, newSelectedField, selectedBank, account });
    setIsEditing(false);
    alert('선생님 정보 수정이 완료되었습니다.');
  };

  // 취소하기 버튼
  const handleOnClickCancleBtn = () => {
    if (isEditing) {
      const confirm = window.confirm('취소하시겠습니까?');
      if (confirm) {
        setIsEditing(false);
        setIsActiveBtn(false);
      }
    }
  };

  // 계좌번호 앞 6자리 남기고 가리기
  const secretAccount = account && account.length > 6 ? account.slice(0, 6) + '*'.repeat(account.length - 6) : account;

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!teacherInfo) {
    return <div> 선생님 정보가 없습니다.</div>;
  }
  return (
    <div className="flex">
      <div className="flex flex-col items-center p-4 gap-4">
        <img src={userInfo?.profile_image} alt="기본 프로필 이미지" width={100} height={100} className="rounded-full" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <SelectOption
            id={jobId}
            label="직업"
            value={newSelectedJob}
            onChange={handleOnChangeJob}
            disabled={!isEditing}
            options={JOBS}
          />
          <SelectOption
            id={fieldId}
            label="비지니스 분야"
            value={newSelectedField}
            onChange={handleOnChangeField}
            disabled={!isEditing}
            options={FIELDS}
          />
          <SelectOption
            id={bankId}
            label="은행"
            value={selectedBank}
            onChange={handleOnChangeSelectedBank}
            disabled={!isEditing}
            options={koreanBanks}
          />
          <div className="m-4 p-4 flex gap-4">
            <span>계좌 정보</span>
            {isEditing ? (
              <input
                type="text"
                placeholder="계좌 번호를 입력해주세요."
                className="input input-bordered w-[300px]"
                value={account}
                onChange={handleOnChangeAddAccount}
              />
            ) : (
              <p>{secretAccount}</p>
            )}
          </div>
          <div className="m-4 p-4 flex gap-4">
            <span>총 수익</span>
            {/* <span>어떤 값이 들어 가야 할까요?</span> */}
          </div>
        </div>
        <div className="p-4 flex gap-4">
          {isEditing ? (
            <button onClick={handleOnClickEditTeacherInfoBtn} className="btn w-[100px]">
              수정 완료
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="btn w-[100px]">
              수정하기
            </button>
          )}
          <button onClick={handleOnClickCancleBtn} className="btn w-[100px]  bg-point-color text-white">
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeacherInfo;

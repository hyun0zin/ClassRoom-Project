'use client';

import { userId } from '@/app/mypage/page';
import { UpdateUserInfoType, UserType } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { checkUserNickname, getUserInfo, updateUserInfo } from '@/app/api/mypage/user-api';
import EditProfileImage from './EditProfileImage';

const EditProfile = () => {
  const queryClient = useQueryClient();

  const { data: userInfo, isPending } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserInfo()
  });

  const [newNickname, setNewNickname] = useState('');
  const [isEditing, setIsEditing] = useState(false); // 수정된 사항 확인 여부
  const [isAvailableNickname, setIsAvailableNickname] = useState(true); // 닉네임 중복 여부 상태 업데이트
  const [isActiveBtn, setIsActiveBtn] = useState(false); // 수정 완료 버튼 활성화 상태

  useEffect(() => {
    if (userInfo) {
      setNewNickname(userInfo.nickname || '');
    }
  }, [userInfo]);

  // 닉네임 수정
  const handleOnChangeNickname = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNewNickname(newNickname); // 새로 작성한 닉네임

    const isAvailable = !(await checkUserNickname({ newNickname }));
    setIsAvailableNickname(isAvailable); // 중복 여부 상태 업데이트

    // 이미 존재하는 닉네임을 입력한 경우 수정 완료 버튼 비활성화
    setIsActiveBtn(!isAvailable);
  };

  // 유저 정보 수정하기 : useMutation
  const { mutate: updateUserInfoMutation } = useMutation({
    mutationFn: ({ newNickname }: UpdateUserInfoType) => updateUserInfo({ newNickname }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      });
      setIsEditing(false);
    }
  });

  // 수정하기 버튼 -> supabase에 수정한 정보 update
  const handleOnClickEditProfileBtn = () => {
    // 수정된 사항이 없는 경우
    const isNicknameChanged = newNickname !== userInfo?.nickname;

    if (!isNicknameChanged) {
      alert('수정 사항이 없습니다.');

      if (!isAvailableNickname) {
        alert('이미 사용 중인 닉네임입니다. 다른 닉네임을 다시 입력해주세요.');
      }
      return;
    }

    // 수정된 사항이 있는 경우
    updateUserInfoMutation({ newNickname });
    alert('프로필 수정이 완료되었습니다.');
  };

  // 취소하기 버튼

  const handleOnClickCancleBtn = () => {
    if (isEditing) {
      setIsEditing(false);
      setNewNickname(userInfo?.nickname || '');
      setIsAvailableNickname(true);
      setIsActiveBtn(false);
      alert('프로필 수정이 취소 되었습니다. ');
    }
  };

  if (isPending) {
    return <div> 로딩중 ... </div>;
  }

  if (!userInfo) {
    return <div> 유저 정보가 없습니다.</div>;
  }

  return (
    <div className="flex">
      <EditProfileImage userInfo={userInfo} />
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="m-4 p-4 gap-4">
            <p>닉네임</p>
            {isEditing ? (
              <input
                type="text"
                placeholder="닉네임을 입력하세요."
                className="input input-bordered w-full max-w-xs"
                value={newNickname}
                onChange={handleOnChangeNickname}
              />
            ) : (
              <p>{newNickname}</p>
            )}
            {isAvailableNickname ? (
              ''
            ) : (
              <p className="font-thin p-2">이미 사용중인 닉네임입니다. 다른 닉네임을 입력해주세요.</p>
            )}
          </div>
          <div className="m-4 p-4">
            <p>이메일</p>
            <p>{userInfo?.email}</p>
          </div>
        </div>
        <div className="m-4 p-4 flex gap-4">
          {isEditing ? (
            <button
              onClick={handleOnClickEditProfileBtn}
              className="p-4 border rounded-xl w-[150px]"
              disabled={isActiveBtn}
            >
              수정 완료
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="p-4 border rounded-xl w-[150px]">
              수정하기
            </button>
          )}
          <button onClick={handleOnClickCancleBtn} className="p-4 border rounded-xl w-[150px]  bg-rose-500 text-white">
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

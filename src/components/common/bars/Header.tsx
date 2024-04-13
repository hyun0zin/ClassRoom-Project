'use client';

import LoginState from '@/components/login/LoginState';
import { userInfoStore } from '@/store/mypage/userInfoStore';
import { useUserRoleStore } from '@/store/mypage/userRoleStore';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren, Suspense } from 'react';
import Notification from '@/components/notifications/Notification'
import basicProfileImage from '../../../../public/profile-image.png';
import { SearchClass } from './categories/SearchClass';

const Header = ({ children }: PropsWithChildren) => {
  const { userInfo } = userInfoStore();

  const { isTeacher } = useUserRoleStore();

  // 수강생인지 강사인지 명시적으로 보여주기
  const roleName = isTeacher === true ? '강사' : '회원';
  // console.log('roleName', roleName);

  // 프로필 이미지가 없을 때, 기본 프로필 이미지 보여주기
  const profileImage = userInfo?.profile_image ? userInfo?.profile_image : basicProfileImage;

  return (
    <>
      <div className="flex p-[15px] justify-between items-center h-[60px] border-b-[1px] border-solid border-gray-300">
        <Link href="/">Logo</Link>
        <div className="flex items-center justify-center ml-60">
          <SearchClass />
        </div>
        <div className="flex justify-center items-center"></div>
        <div className="flex items-center">
          <Notification />
          <p className="p-4">
            {userInfo?.nickname} <span className="text-point-color font-bold">{roleName}님</span>
          </p>
          {/*todo : 드랍다운으로 변경*/}
          <Link href={'/mypage'}>
            <Image
              src={profileImage}
              alt="Profile image"
              className="mr-[5px] rounded-full"
              width={50}
              height={50}
              unoptimized={true}
            />
          </Link>
        </div>
        <Suspense fallback={<div>Logout</div>}>
          <LoginState />
        </Suspense>
      </div>
      {children}
    </>
  );
};

export default Header;

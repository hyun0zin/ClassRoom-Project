'use client';

import StudentMyPageTab from '@/components/mypage/student/StudentMyPageTab';
import TeacherMyPageTab from '@/components/mypage/teacher/TeacherMyPageTab';
import { useLoginStore } from '@/store/login/loginUserIdStore';
import { useUserRoleStore } from '@/store/userRoleStore';
import { redirect, useRouter } from 'next/navigation';

const MyPage = () => {
  const router = useRouter();

  const { isTeacher } = useUserRoleStore();
  const { loginUserId } = useLoginStore();

  // 마이페이지 접근 제한 막기 -> 다른 방법 생각해보자.. 미들웨어 찾아보기
  // if (loginUserId === null) {
  //   const confirm = window.confirm('로그인이 필요한 페이지입니다. 로그인 페이지로 이동하시겠습니까?');
  //   if (confirm) {
  //     router.push('/hello');
  //     return null;
  //   } else {
  //     router.push('/');
  //     return null;
  //   }
  // }

  return (
    <>
      <div className="w-xl flex ">
        {/* teacher의 boolean 값에 따라 마이페이지 구분*/}
        {isTeacher ? <TeacherMyPageTab /> : <StudentMyPageTab />}
      </div>
    </>
  );
};

export default MyPage;

import Image from 'next/image';
import React from 'react';

const MyClass = () => {
  return (
    <div className="flex gap-4">
      <Image src="/class-sample-img.jpeg" alt="클래스 대표 사진" width={300} height={200} />
      <div className="flex flex-col p-4">
        <div>
          <p>쿠키 만들기 클래스</p>
          <div>
            <span>날짜</span>
            <span>시간</span>
          </div>
        </div>
        <div className="m-4">
          <button className="border p-4">클래스 삭제하기</button>
          <button className="border p-4">클래스 보러가기</button>
          <button className="border p-4">예약한 수강생 보기</button>
        </div>
      </div>
    </div>
  );
};

export default MyClass;

'use client';

import { useCategoryFilterStore } from '@/store/classFilterStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoIosSearch } from 'react-icons/io';
import _ from 'lodash';
import { useEffect, useState } from 'react';
//yarn add --dev @types/lodash
//yarn add lodash

export const SearchClass = () => {
  const { setSelectedCategory } = useCategoryFilterStore();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTitle, setSelectedTitle] = useState('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(e.target.value);
  };

  //query= 뒤에있는 query string을 가져온다
  const searchQuery = searchParams?.get('query');

  //List페이지가 떠날 때 카테고리 초기화
  useEffect(() => {
    const handleLeavePage = () => {
      if (pathName !== '/list') {
        setSelectedCategory('');
      }
    };

    handleLeavePage();
  }, [pathName, setSelectedCategory]);

  const handleSearchBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimedSelectedTitle = selectedTitle.trim();
    if (!trimedSelectedTitle) return;
    router.push(`/list?query=${trimedSelectedTitle}`);
  };
  //url로 접근할 경우
  useEffect(() => {
    setSelectedTitle(searchQuery ?? '');
  }, [searchQuery]);

  return (
    <form className="h-[120px ml-2 relative w-full flex items-center justify-center" onSubmit={handleSearchBtn}>
      <div className="border-[1px] rounded-xl w-full items-end justify-end border-point-color relative">
        <input
          maxLength={20}
          onChange={handleSearchChange}
          value={selectedTitle}
          className="h-12 ml-16 outline-none rounded-xl"
          type="text"
          placeholder="검색하기"
        />
        <button
          type="submit"
          className="btn border-[1px] border-transparent shadow-none hover:bg-transparent hover:border-transparent  w-16 rounded-xl absolute left-0 bottom-0 bg-transparent"
        >
          <IoIosSearch className="text-2xl text-icon-color" />
        </button>
      </div>
    </form>
  );
};

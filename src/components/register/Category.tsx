'use client';
import React, { useEffect } from 'react';
import useRegisterStore from '@/store/registerStore';

interface InitialDataType {
  category: string;
}

interface CategoryProps {
  isEditMode: boolean;
  initialData?: InitialDataType;
}

const Category: React.FC<CategoryProps> = ({ isEditMode, initialData }) => {
  const { category, setCategory } = useRegisterStore();

  useEffect(() => {
    if (isEditMode && initialData) {
      setCategory(initialData.category);
    }
  }, [isEditMode, initialData, setCategory]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  return (
    <div className="my-4">
      <div className="flex items-center space-x-4 my-2">
        <div>
          {/* 카테고리 드롭다운 */}
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border border-[#D5D5D5] rounded-md p-2 w-full text-gray-700"
          >
            <option value="">카테고리</option>
            <option value="요리">요리</option>
            <option value="공예&공방">공예&공방</option>
            <option value="운동">운동</option>
            <option value="교육">교육</option>
            <option value="악기&음악">악기&음악</option>
            <option value="뷰티">뷰티</option>
            <option value="예술">예술</option>
            <option value="기타">기타</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Category;

import { useSearchStore } from '@/store/classFilterStore';

export const SearchClass = () => {
  const { selectedTitle, setSelectedTitle } = useSearchStore();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(e.target.value);
  };
  const handleSearchBtn = () => {};
  return (
    <form className="h-[120px] flex items-center justify-center" onSubmit={handleSearchBtn}>
      <input
        onChange={handleSearchChange}
        value={selectedTitle}
        type="text"
        placeholder="클래스 검색"
        className="input input-bordered border-[#5373FF] input-info w-full max-w-xs"
      />
      <button type="submit" className="btn text-white bg-[#5373FF] ml-2">
        Button
      </button>
    </form>
  );
};

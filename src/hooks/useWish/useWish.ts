import { checkIsWished } from '@/app/api/wish/wish';
import { QueryKeys } from '@/constants/QueryKeys';
import { useQuery } from '@tanstack/react-query';

export const useCheckIsWishedQuery = ({ userId, classId }: { userId: string | null; classId: string | undefined }) => {
  return useQuery({
    queryKey: [QueryKeys.WISH],
    queryFn: () => checkIsWished({ userId, classId }),
    enabled: !!userId && !!classId
  });
};

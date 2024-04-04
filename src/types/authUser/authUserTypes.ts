import exp from 'constants';

export interface SessionUserType {
  user: {
    email: string;
    name: string | null;
    image: string | null;
  };
}

export interface CreateNewUserType {
  email: string;
  nickname: string | null;
  image: string | null;
}

//store
export interface NewUserType {
  isTeacher: boolean;
  job?: string | null;
  field?: string | null;
  setTeacher: (teacher: boolean) => void;
  setJob: (job: string) => void;
  setField: (field: string) => void;
}

//PickRole
export type RoleType = 'teacher' | 'student';
export type SocialType = 'google' | 'kakao' | 'naver';

//moreinfo

export interface MoreInfoType {
  isJob: string;
  setIsJob: (isJob: string) => void;
  isField: string;
  setIsField: (isField: string) => void;
}

export type JobType = '교사' | '요리사' | '개발자' | '운동선수' | '음악가' | '예술가' | '뷰티';
export const JOBS: JobType[] = ['교사', '요리사', '개발자', '운동선수', '음악가', '예술가', '뷰티'];

export type FieldType = '교육' | '요리' | 'IT' | '스포츠' | '피아니스트' | '공방' | '애견미용';
export const FIELDS: FieldType[] = ['교육', '요리', 'IT', '스포츠', '피아니스트', '공방', '애견미용'];

//signup
export interface SignInType {
  name: string;
  value: string;
}

//login

export interface getLoginUserType {
  user_id: string;
}

export interface SetUserLoginIdType {
  loginUserId: string | null;
  setLoginUserId: (id: string) => void;
}

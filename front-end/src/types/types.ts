export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type UserApiResponse = {
  data: UserType;
  message: string;
  success: boolean;
};

export type NoteType = {
  id: number;
  title: string;
  content: string;
  publish: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
    email: string;
  };
};

export type GetANoteApiResponse = {
  data: NoteType;
};

export type NoteApiResponse = {
  data: NoteType[];
  meta: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
  };
};

export type AdminStatsResponse = {
  data: { totalUsers: number; totalNotes: number };
  message: string;
  success: boolean;
};

export type AdminUserListResponse = {
  data: (UserType & { notes: NoteType[] })[];
  meta: {
    page: number;
    limit: number;
    totalPages: number;
    totalCount: number;
  };
};

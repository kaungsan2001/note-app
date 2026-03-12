import api from "./api";
import type { AdminStatsResponse, AdminUserListResponse } from "@/types/types";

export async function getAdminStats() {
  const res = await api.get<AdminStatsResponse>("/admin/stats", {
    withCredentials: true,
  });
  return res.data;
}

export async function getAdminUsers(page: number) {
  const res = await api.get<AdminUserListResponse>(
    `/admin/users?page=${page}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
}

export async function adminDeleteUser(userId: number) {
  const res = await api.delete(`/admin/user/${userId}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function adminDeleteNote(noteId: number) {
  const res = await api.delete(`/admin/note/${noteId}`, {
    withCredentials: true,
  });
  return res.data;
}

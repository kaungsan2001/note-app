import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAdminStats,
  getAdminUsers,
  adminDeleteUser,
  adminDeleteNote,
} from "@/api/adminApi";

export function useAdminStats() {
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: getAdminStats,
  });
}

export function useAdminUsers(page: number) {
  return useQuery({
    queryKey: ["adminUsers", page],
    queryFn: () => getAdminUsers(page),
  });
}

export function useAdminDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => adminDeleteUser(userId),
    onSuccess: () => {
      toast.success("User deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
    },
    onError: () => {
      toast.error("Failed to delete user.");
    },
  });
}

export function useAdminDeleteNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: number) => adminDeleteNote(noteId),
    onSuccess: () => {
      toast.success("Note deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
    },
    onError: () => {
      toast.error("Failed to delete note.");
    },
  });
}

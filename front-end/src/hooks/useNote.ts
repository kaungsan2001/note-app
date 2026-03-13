import {
  getANoteById,
  updateANoteById,
  createNote,
  deleteANoteById,
  getNoteList,
} from "@/api/noteApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { NoteCreatePayLoad } from "@/zod/noteSchema";
import { useNavigate } from "react-router";

export function useGetANoteById(noteId: number) {
  return useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getANoteById(noteId),
    enabled: !!noteId,
  });
}

export function useGetNoteList(page: number) {
  return useQuery({
    queryKey: ["noteList", page],
    queryFn: () => getNoteList(page),
    enabled: !!page,
  });
}

export function useUpdateANoteById() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      noteId,
      data,
    }: {
      noteId: number;
      data: NoteCreatePayLoad;
    }) => updateANoteById(noteId, data),
    onSuccess: () => {
      toast.success("A Note Updated Successfully.");
      queryClient.invalidateQueries({ queryKey: ["noteList"] });
      navigate("/");
    },
    onError: () => {
      toast.error("Failed To Updated A Note.");
    },
  });
}

export function useCreateNote() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: NoteCreatePayLoad) => createNote(data),
    onSuccess: () => {
      toast.success("A Note Created Successfully.");
      navigate("/");
    },
    onError: () => {
      toast.error("Failed To Created A Note.");
    },
  });
}

export function useDeleteANoteById() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (noteId: number) => deleteANoteById(noteId),
    onSuccess: () => {
      toast.success("A Note Deleted Successfully.");
      queryClient.invalidateQueries({ queryKey: ["noteList"] });
    },
    onError: () => {
      toast.error("Failed To Delete A Note.");
    },
  });
}

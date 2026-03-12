import type { NoteCreatePayLoad } from "@/zod/noteSchema";
import api from "./api";
import type { GetANoteApiResponse, NoteApiResponse } from "@/types/types";

export async function createNote(data: NoteCreatePayLoad) {
  const res = await api.post("/note/create", data, {
    withCredentials: true,
  });
  return res.data;
}

export async function updateANoteById(noteId: number, data: NoteCreatePayLoad) {
  const res = await api.put(`/note/update/${noteId}`, data, {
    withCredentials: true,
  });
  return res.data;
}

export async function getANoteById(noteId: number) {
  const res = await api.get<GetANoteApiResponse>(`/note/${noteId}`, {
    withCredentials: true,
  });
  return res.data;
}

export async function getNoteList(page: number) {
  const res = await api.get<NoteApiResponse>(`/note?page=${page}`, {
    withCredentials: true,
  });
  return res.data;
}
export async function deleteANoteById(noteId: number) {
  const res = await api.delete(`/note/${noteId}`, {
    withCredentials: true,
  });
  return res.data;
}

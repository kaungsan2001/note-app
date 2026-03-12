import api from "./api";
import type { SignInPayLoadType, SignUpPayLoadType } from "@/zod/authSchema";
import type { UserApiResponse } from "@/types/types";
// example type for api response
type SignInResponse = {
  name: string;
  email: string;
};

export async function signIn(data: SignInPayLoadType) {
  const res = await api.post<SignInResponse>("/auth/sign-in", data, {
    withCredentials: true,
  });
  return res.data;
}

export async function signUp(data: SignUpPayLoadType) {
  const res = await api.post("/auth/sign-up", data, {
    withCredentials: true,
  });
  return res.data;
}

export async function signOut() {
  const res = await api.delete("/auth/sign-out", {
    withCredentials: true,
  });
  return res.data;
}

export async function getMe() {
  const res = await api.get<UserApiResponse>("/auth/me", {
    withCredentials: true,
  });
  return res.data;
}

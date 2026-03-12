import { getMe, signIn, signOut, signUp } from "@/api/authApi";
import type { SignInPayLoadType, SignUpPayLoadType } from "@/zod/authSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SignInPayLoadType) => signIn(data),
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => {
      toast.error("Failed");
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SignUpPayLoadType) => signUp(data),
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => {
      toast.error("Failed");
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      toast.success("Success");
      queryClient.setQueryData(["me"], null);
    },
    onError: () => {
      toast.error("Failed");
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    retry: false,
  });
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "@/shared/api/projectApi";

// 멤버 목록 조회
export const useMembers = (projectId: number) => {
  return useQuery({
    queryKey: ["projectMembers", projectId],
    queryFn: async () => {
      const response = await projectApi.getProjectMembers(projectId);
      return response.data;
    },
    enabled: !!projectId,
  });
};

// 초대 코드 생성
export const useCreateInviteCode = (projectId: number) => {
  return useQuery({
    queryKey: ["inviteCode", projectId],
    queryFn: async () => {
      const response = await projectApi.createInviteCode(projectId);
      return response.data;
    },
    enabled: !!projectId,
    staleTime: 0, // 매번 새로 생성
  });
};

// 멤버 삭제
export const useRemoveMember = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) =>
      projectApi.removeMember(projectId, memberId),
    onSuccess: () => {
      // 멤버 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ["projectMembers", projectId],
      });
    },
  });
};

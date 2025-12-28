import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "@/shared/api/projectApi";
import { useNavigate } from "react-router-dom";

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

// 멤버 삭제 (강퇴 - 오너용)
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
    onError: (error: any) => {
      const message = error.response?.data?.message || "멤버 삭제에 실패했습니다";
      alert(message);
    }
  });
};

// 프로젝트 나가기 (본인 탈퇴)
export const useLeaveProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ projectId, memberId }: { projectId: number; memberId: number }) =>
      projectApi.removeMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      alert("프로젝트에서 나갔습니다");
      navigate("/projects");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "프로젝트 나가기에 실패했습니다";
      alert(message);
    }
  });
};

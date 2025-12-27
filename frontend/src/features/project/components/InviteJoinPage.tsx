import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { projectApi } from '@/shared/api/projectApi';
import { useProjectInvite } from '../hooks/useProjectInvite';
import { Button } from '@/shared/components/Button';
import type { InvitationInfoResponse } from '@/shared/features-types/project.types';
import { IoPeopleCircleOutline, IoCalendarOutline } from 'react-icons/io5';
import { useAuthStore } from '@/features/auth/store/authStore';

export function InviteJoinPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code = searchParams.get('code');
    const { joinProject } = useProjectInvite();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const [info, setInfo] = useState<InvitationInfoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!code) {
            setError('초대 코드가 없습니다.');
            setLoading(false);
            return;
        }

        const fetchInfo = async () => {
            try {
                const response = await projectApi.getInvitationInfo(code);
                if (response.success && response.data) {
                    setInfo(response.data);
                } else {
                    setError('초대 정보를 불러올 수 없습니다.');
                }
            } catch (err: any) {
                setError(err.response?.data?.message || '유효하지 않거나 만료된 초대 링크입니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, [code]);

    const handleJoin = () => {
        if (!code) return;

        // 로그인 여부 확인
        if (!isAuthenticated) {
            const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
            navigate(`/login?returnUrl=${returnUrl}`);
            return;
        }

        joinProject.mutate(
            { inviteCode: code },
            {
                onSuccess: (response) => {
                    alert('프로젝트에 성공적으로 참여했습니다!');
                    // 프로젝트 데이터에서 ID를 추출하여 에디터로 직접 이동
                    const projectId = response.data?.project?.project_id;
                    if (projectId) {
                        navigate(`/projects/${projectId}/editor`);
                    } else {
                        navigate('/projects');
                    }
                },
                onError: (err: any) => {
                    alert(err.response?.data?.message || '참여 중 오류가 발생했습니다.');
                },
            }
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-black flex items-center justify-center">
                <div className="text-gray-400">초대 정보를 확인 중입니다...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#1f1f1f] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
                {error ? (
                    <div className="p-8 text-center space-y-4">
                        <div className="text-red-400 text-lg font-medium">{error}</div>
                        <Button variant="outline" onClick={() => navigate('/projects')}>
                            메인으로 이동
                        </Button>
                    </div>
                ) : info ? (
                    <div className="p-8 space-y-8">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold text-white">프로젝트 초대</h1>
                            <p className="text-gray-400">새로운 프로젝트에 초대되었습니다.</p>
                        </div>

                        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <IoPeopleCircleOutline size={28} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">프로젝트명</div>
                                    <div className="text-lg font-semibold text-white">{info.projectName}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 border-t border-gray-800 pt-4">
                                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <span className="text-lg font-bold">{info.inviterName[0]}</span>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">초대한 분</div>
                                    <div className="text-white">{info.inviterName}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 border-t border-gray-800 pt-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <IoCalendarOutline size={24} />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">링크 만료일</div>
                                    <div className="text-sm text-gray-400">
                                        {new Date(info.expiresAt).toLocaleString('ko-KR')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={handleJoin}
                                className="w-full py-6 text-lg"
                                disabled={joinProject.isPending}
                            >
                                {joinProject.isPending ? '참여 중...' : '프로젝트 참여하기'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate('/projects')}
                                className="w-full"
                            >
                                나중에 하기
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

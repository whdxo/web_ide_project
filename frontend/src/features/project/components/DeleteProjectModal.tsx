import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/Button';
import { IoWarningOutline } from 'react-icons/io5';

interface DeleteProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
    projectName?: string; // 프로젝트명 표시용
}

export function DeleteProjectModal({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
    projectName
}: DeleteProjectModalProps) {
    const [step, setStep] = useState<1 | 2>(1);

    // 모달이 열릴 때마다 step 초기화
    useEffect(() => {
        if (isOpen) {
            setStep(1);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClose = () => {
        setStep(1);
        onClose();
    };

    const handleNext = () => {
        setStep(2);
    };

    const handleConfirm = async () => {
        try {
            await onConfirm();
            // 성공 시에만 모달 닫기 (부모에서 처리하거나)
            handleClose();
        } catch (error) {
            // 에러 처리는 부모에서 하되, step은 유지
            console.error('삭제 실패:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-[400px] rounded-xl bg-[#1f1f1f] border border-gray-800 shadow-2xl p-6 space-y-6">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                        <IoWarningOutline size={28} />
                    </div>

                    {step === 1 ? (
                        <>
                            <h3 className="text-xl font-bold text-white">프로젝트 삭제</h3>
                            <div className="text-gray-400 space-y-2 text-sm">
                                <p>
                                    {projectName ? `"${projectName}" 프로젝트를` : '프로젝트를'} 삭제하시겠습니까?
                                </p>
                                <p className="text-red-400">
                                    모든 파일, 코드, 채팅 내역이 영구적으로 삭제됩니다.<br />
                                    이 작업은 되돌릴 수 없습니다.
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold text-red-500">최종 확인</h3>
                            <div className="text-gray-400 space-y-2 text-sm">
                                <p>정말로 삭제하시겠습니까?</p>
                                <p className="text-red-400 font-medium">
                                    삭제된 데이터는 복구할 수 없습니다.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex gap-3 pt-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="flex-1"
                        disabled={isLoading}
                    >
                        취소
                    </Button>

                    {step === 1 ? (
                        <Button
                            onClick={handleNext}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0"
                            disabled={isLoading}
                        >
                            삭제 계속
                        </Button>
                    ) : (
                        <Button
                            onClick={handleConfirm}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0"
                            disabled={isLoading}
                        >
                            {isLoading ? '삭제 중...' : '확인 및 삭제'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

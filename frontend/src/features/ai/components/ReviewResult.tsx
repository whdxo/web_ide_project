export function ReviewResult() {
  return (
    <div className="mt-4 space-y-4 text-xs">
      {/* 요약 */}
      <section>
        <h3 className="mb-1 font-semibold text-sm">요약</h3>
        <p className="text-gray-300">
          간단한 인사 메시지를 콘솔에 출력하는 함수입니다.
        </p>
      </section>

      {/* 이슈 */}
      <section>
        <h3 className="mb-1 font-semibold text-sm">문제점</h3>
        <ul className="list-disc pl-4 space-y-1 text-gray-300">
          <li>함수 이름이 애매합니다.</li>
        </ul>
      </section>

      {/* 제안 */}
      <section>
        <h3 className="mb-1 font-semibold text-sm">개선 제안</h3>
        <ul className="list-disc pl-4 space-y-1 text-gray-300">
          <li>매개변수를 받아 일반화할 수 있습니다.</li>
          <li>ES6 arrow function 문법을 사용할 수 있습니다.</li>
        </ul>
      </section>
    </div>
  );
}

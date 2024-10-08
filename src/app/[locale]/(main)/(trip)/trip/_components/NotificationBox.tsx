export default function NotificationBox() {
  return (
    <div
      className={
        'bg-gray600 rounded-lg w-full p-3 my-4 mb-6 text-xs md:text-sm'
      }
    >
      <ul className={'list-disc pl-5'}>
        <li>
          입력하신 여행 기간이 시차를 고려한
          <strong>현지 여행 기간(여행지 도착 날짜, 여행지 출발 날짜)</strong>이
          맞는지 확인해 주세요.
        </li>
        <li>
          각 날짜의 일정 <strong>시작시간</strong>과 <strong>종료시간</strong>을
          현지 시간 기준으로 설정해 주세요.
        </li>
        <li>
          기본 설정 시간은 <strong>오전 10시~오후10시 총 12시간</strong>
          입니다.
        </li>
      </ul>
    </div>
  );
}

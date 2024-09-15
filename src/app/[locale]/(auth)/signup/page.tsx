import SignUpProgressIndicator from '@/app/[locale]/(auth)/_components/SignUpProgressIndicator';

export default function SignUpPage() {
  return (
    <>
      <h1 className={'mb-5 text-3xl font-bold '}>Logo</h1>
      <div className={'flex gap-3'}>
        <SignUpProgressIndicator />
        <h2 className={'text-2xl font-bold mb-14'}>이메일로 가입하기</h2>
      </div>
    </>
  );
}

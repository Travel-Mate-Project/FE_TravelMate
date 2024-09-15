import SignUpProgressIndicator from '@/app/[locale]/(auth)/_components/SignUpProgressIndicator';
import SignUpForm from '@/app/[locale]/(auth)/_components/SignUpForm';

export default function SignUpPage() {
  return (
    <>
      <h1 className={'mb-5 text-3xl font-bold '}>Logo</h1>
      <div className={'flex items-center gap-3 mb-14'}>
        <SignUpProgressIndicator />
        <h2 className={'text-2xl font-bold '}>이메일로 가입하기</h2>
      </div>
      <SignUpForm />
    </>
  );
}

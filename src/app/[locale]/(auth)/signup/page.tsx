import SignUpForm from '@/app/[locale]/(auth)/_components/SignUpForm';
import SignUpProgressIndicator from '@/app/[locale]/(auth)/_components/SignUpProgressIndicator';

export default function SignUpPage() {
  return (
    <>
      <h1 className={'mb-5 text-3xl font-bold '}>Logo</h1>
      <div className={'flex items-center gap-3 mb-14'}>
        <SignUpProgressIndicator />
        <h2 className={'text-2xl font-bold '}>이메일로 가입하기</h2>
      </div>
      <div className={'w-screen px-6 pb-10 md:w-96 md:px-0'}>
        <SignUpForm />
      </div>
    </>
  );
}

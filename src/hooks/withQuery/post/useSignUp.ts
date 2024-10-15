import {useMutation} from '@tanstack/react-query';

import {signUp} from '@/api/auth';
import {useRouter} from '@/i18n/routing';

export const useSignUp = () => {
  const router = useRouter();
  const {mutate: signUpMutation} = useMutation({
    mutationFn: signUp,
    onSuccess: () => router.push('/welcome'),
  });

  return signUpMutation;
};

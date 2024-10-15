import {useMutation} from '@tanstack/react-query';

import {signIn} from '@/api';
import {useRouter} from '@/i18n/routing';

export const useSignIn = () => {
  const router = useRouter();
  const {mutate: signInMutation} = useMutation({
    mutationFn: signIn,
    onSuccess: () => router.push('/'),
  });

  return signInMutation;
};

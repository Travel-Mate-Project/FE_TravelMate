import {useMutation} from '@tanstack/react-query';
import {useRouter} from '@/i18n/routing';
import {signIn} from '@/api';

export const useSignIn = () => {
  const router = useRouter();
  const {mutate: signInMutation} = useMutation({
    mutationFn: signIn,
    onSuccess: () => router.push('/'),
  });

  return signInMutation;
};

import { UseGuard } from '@shared/types/guard.type';

export const useAuthGuard: UseGuard = () => {
  return () => {
    const currentUser = localStorage.getItem('currentUser');
    const user: { id: string; email: string } = currentUser ? JSON.parse(currentUser) : {};

    if (!user || !user.id) {
      return { authorized: false, navigateTo: '/login' };
    }

    return { authorized: true };
  };
};

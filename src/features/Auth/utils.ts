export const isLogged = () => {
  const currentUser = localStorage.getItem('currentUser');
  const user: { id: string; email: string } = currentUser ? JSON.parse(currentUser) : {};
  return user?.id;
};

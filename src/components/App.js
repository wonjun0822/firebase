import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fireInterface';

function App() {
  const [user, setUser] = useState(null);

  const refreshUser = () => {
    setUser({
      displayName: authService.currentUser.displayName,
      uid: authService.currentUser.uid,
      email: authService.currentUser.email,
      updateProfile: (args) => user.updateProfile(args)
    });
  };

  useEffect(() => {
      authService.onAuthStateChanged((user) => {
        if (user) {
          setUser({
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
            updateProfile: (args) => user.updateProfile(args)
          });
        }

        else {
          setUser(null);
        }
      });
  }, []);

  return (
    <>
      <AppRouter refreshUser={refreshUser} isLogin={Boolean(user)} user={user} />
    </>
  );
}

export default App;

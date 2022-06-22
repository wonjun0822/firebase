import { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fireInterface';

function App() {
  const [init, setInit] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
      authService.onAuthStateChanged((user) => {
        if (user) {
          setIsLogin(true);

          setUser(user);
        }

        else {
          setIsLogin(false);

          setUser(null);
        }

        setInit(true);
      });
  }, []);

  return (
    <>
      <AppRouter isLogin={isLogin} user={user} />
    </>
  );
}

export default App;

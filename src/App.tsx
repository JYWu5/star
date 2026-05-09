// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import UserStatus from './components/UserStatus';
import AppRouter from './router';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Welcome from './components/pages/Welcome';



function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>加载中...</div>;
  }

  if(!user) {
    return <AuthForm />;
  }
  return <AppRouter user={user}/>;
}

export default App;
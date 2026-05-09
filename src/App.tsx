// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import UserStatus from './components/UserStatus';
import AppRouter from './router';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Welcome from './components/pages/Welcome';

function HomePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>欢迎来到星语心愿</h1>
      <UserStatus />
    </div>
  );
}

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

  return (
    <div style={{ padding: 20 }}>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route 
          path="/" 
          element={user ? <Welcome /> : <Navigate to="/login" />} 
        />
        {/* 其他所有路由交给 AppRouter */}
        <Route path="/*" element={<AppRouter />} />
      </Routes>
    </div>
  );
}

export default App;
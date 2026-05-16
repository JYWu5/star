// App.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import AuthForm from './components/AuthForm';
import AppRouter from './router';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 初始获取用户状态
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
      if (data.user) {
        navigate('/'); // 用户已登录，跳转到欢迎页
      }
    });

    // 监听登录/登出事件
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate('/'); // 登录成功后跳转
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div style={{ padding: 20 }}>加载中...</div>;
  }

  if (!user) {
    return <AuthForm />; // 未登录显示登录表单
  }

  return <AppRouter user={user} />; // 已登录显示路由
}

export default App;
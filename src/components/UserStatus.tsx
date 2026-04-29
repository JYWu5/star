// UserStatus.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function UserStatus() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // 1. 获取当前用户
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        // 2. 获取 profiles 表里的用户资料
        fetchProfile(data.user.id);
      }
    });

    // 3. 监听登录状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return <div>未登录</div>;
  }

  return (
    <div style={{ padding: 20, background: '#f5f5f5' }}>
      <h3>用户信息</h3>
      <p>邮箱: {user.email}</p>
      <p>用户ID: {user.id.slice(0, 8)}...</p>
      {profile && <p>用户名: {profile.username}</p>}
      <button onClick={handleLogout} style={{ marginTop: 10 }}>
        退出登录
      </button>
    </div>
  );
}
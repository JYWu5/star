// AuthForm.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AuthForm() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true); // 登录/注册切换
  const [loading, setLoading] = useState(false);

  // 处理登录
   const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      alert('登录失败: ' + error.message);
    } else {
      alert('登录成功！');
      navigate('/'); // 改为 useNavigate
    }
  };

  // 处理注册
  const handleSignUp = async () => {
    if (!username.trim()) {
      alert('请输入用户名');
      return;
    }
    setLoading(true);
    
    // 1. 注册用户到 auth.users
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError) {
      alert('注册失败: ' + authError.message);
      setLoading(false);
      return;
    }
    
    // 2. 插入用户资料到 profiles 表
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id, // 关键：用 auth 的用户ID
          username,
        });
      
      if (profileError) {
        alert('创建用户资料失败: ' + profileError.message);
      } else {
        alert('注册成功！请检查邮箱验证邮件。');
        setIsLogin(true); // 切换到登录
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h2>{isLogin ? '登录' : '注册'}</h2>
      
      {!isLogin && (
        <div style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
      )}
      
      <div style={{ marginBottom: 10 }}>
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      
      <button
        onClick={isLogin ? handleLogin : handleSignUp}
        disabled={loading}
        style={{ width: '100%', padding: 10, background: '#007bff', color: 'white' }}
      >
        {loading ? '处理中...' : (isLogin ? '登录' : '注册')}
      </button>
      
      <p style={{ marginTop: 20, textAlign: 'center' }}>
        {isLogin ? '还没有账号？' : '已有账号？'}
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
        >
          {isLogin ? '去注册' : '去登录'}
        </button>
      </p>
    </div>
  );
}
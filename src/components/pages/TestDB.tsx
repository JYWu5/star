// src/pages/TestDB.tsx
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function TestDB() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*');
    
    if (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    } else {
      setData(data || []);
      console.log('Data:', data);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>数据库连接测试</h1>
      <button onClick={fetchData} disabled={loading}>
        {loading ? '加载中...' : '点击测试读取profiles表'}
      </button>
      
      {data.length > 0 ? (
        <div style={{ marginTop: '20px' }}>
          <h3>成功！读取到 {data.length} 条数据:</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        <p style={{ marginTop: '20px' }}>暂无数据，点击按钮测试</p>
      )}
    </div>
  );
}
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/users');
  });

  return <h1>Home</h1>;
}

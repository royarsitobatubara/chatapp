import '@/styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';

const publicRoutes = ['/auth/login', '/auth/registrasi'];

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isPublic = publicRoutes.includes(router.pathname);

    if (!token) {
      // Tidak ada token, hanya boleh akses halaman public
      if (!isPublic) {
        router.replace('/auth/login');
      }
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        // Token expired
        localStorage.removeItem('token');
        if (!isPublic) router.replace('/auth/login');
        return;
      }

      // Token valid
      if (isPublic) {
        router.replace('/chat');
        return;
      }
    } catch (err) {
      // Token rusak
      localStorage.removeItem('token');
      if (!isPublic) router.replace('/auth/login');
    }
  }, [router.pathname]);

  return <Component {...pageProps} />;
}

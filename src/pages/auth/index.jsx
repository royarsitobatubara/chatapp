import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

function Auth() {
    const router = useRouter();
  
    useEffect(() => {
      router.replace('/auth/login'); 
    }, []);
}

export default Auth;
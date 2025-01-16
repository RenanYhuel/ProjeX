"use client";

import { SessionData } from '@/types/sessionData';
import checkSession from '@/utils/checkSession';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkSession(token).then((data: SessionData) => {
        if (data.success == false) {
          router.push('/auth/login');
        }
      });
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className=''>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia tenetur ab, vero odit eligendi aut quo qui odio doloremque illum! Dicta necessitatibus totam beatae a corporis molestias reiciendis numquam impedit!
    </div>
  );
}

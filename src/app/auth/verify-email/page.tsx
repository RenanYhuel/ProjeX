"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import checkSession from '@/utils/checkSession';
import { SessionData } from '@/types/sessionData';

type ApiResponse = {
  success: boolean;
  message?: string;
  error?: string;
  already?: boolean;
};

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkSession(token).then((data: SessionData) => {
        if (data.success) {
          router.push('/');
        }
      });
    }
  }, [router]);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          if (data.success) {
            setVerificationStatus('Email verification successful.');
          } else if (data.already) {
            setVerificationStatus('Email already verified.');
          } else {
            throw new Error(data.message || 'Something went wrong');
          }
        })
        .catch((error) => {
          setVerificationStatus(error.message);
        });
    } else {
      setVerificationStatus('No token provided.');
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Email Verification</h1>
      {verificationStatus ? (
        <p>{verificationStatus}</p>
      ) : (
        <p>Verifying your email...</p>
      )}
      <button onClick={() => router.push('/auth/login')}>Login</button>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}

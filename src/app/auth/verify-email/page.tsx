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
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

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
            setIsSuccess(true);
          } else if (data.already) {
            setVerificationStatus('Email already verified.');
            setIsSuccess(true);
          } else {
            throw new Error(data.message || 'Something went wrong');
          }
        })
        .catch((error) => {
          setVerificationStatus(error.message);
          setIsSuccess(false);
        });
    } else {
      setVerificationStatus('No token provided.');
      setIsSuccess(false);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-6">Email Verification</h1>
        {verificationStatus ? (
          <div className="mb-4">
            {isSuccess ? (
              <svg className="w-12 h-12 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            ) : (
              <svg className="w-12 h-12 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
            <p>{verificationStatus}</p>
          </div>
        ) : (
          <p className="mb-4">Verifying your email...</p>
        )}
        {isSuccess && (
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </button>
        )}
      </div>
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
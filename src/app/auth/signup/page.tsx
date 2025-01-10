"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import checkSession from '@/utils/checkSession';
import { SessionData } from '@/types/sessionData';

type ApiResponse = {
  message?: string;
  success: boolean;
  error?: string;
  mail_token?: string;
};

export default function Signup() {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [resendAttempts, setResendAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [signupData, setSignupData] = useState<ApiResponse | null>(null);

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

  const validatePassword = (password: string) => {
    const errorMessages = [];
    if (password.length < 8) errorMessages.push('at least 8 characters');
    if (!/[A-Z]/.test(password)) errorMessages.push('an uppercase letter');
    if (!/[a-z]/.test(password)) errorMessages.push('a lowercase letter');
    if (!/[0-9].*[0-9]/.test(password)) errorMessages.push('two numbers');
    if (!/[!@#$%^&*]/.test(password)) errorMessages.push('a symbol');
    return errorMessages;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passwordErrors = validatePassword(form.password);
    if (form.password !== form.confirmPassword) {
      passwordErrors.push('Passwords do not match');
    }
    if (passwordErrors.length > 0) {
      setErrors(passwordErrors);
    } else {
      setErrors([]);
      fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.lastname,
          firstname: form.firstname,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSignupData(data)
            console.log('Signup successful', data);
            setStep(2);
            console.log(`Verification email sent to ${form.email}`);
          } else {
            throw new Error(data.message || 'Something went wrong');
          }
        })
        .catch((error) => {
          setErrors([error.message]);
        });
    }
  };


  const handleResendEmail = () => {
    if (resendAttempts >= 3) {
      setErrors(['Maximum resend attempts reached.']);
      return;
    }

    if (timer > 0) {
      setErrors([`Please wait ${timer} seconds before resending the email.`]);
      return;
    }

    fetch('/api/auth/resend-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mail_token: signupData?.mail_token }),
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        if (data.success) {
          setSignupData((prevData) => prevData ? { ...prevData, mail_token: data.mail_token } : null);
          setResendAttempts(resendAttempts + 1);
          setTimer(120); // 2 minutes timer
          const countdown = setInterval(() => {
            setTimer((prevTimer) => {
              if (prevTimer <= 1) {
                clearInterval(countdown);
                return 0;
              }
              return prevTimer - 1;
            });
          }, 1000);
        } else {
          throw new Error(data.message || 'Something went wrong');
        }
      })
      .catch((error) => {
        setErrors([error.message]);
      });
  };

  return (
    <div>
      {step === 1 ? (
      <>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" name="firstname" value={form.firstname} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastname" value={form.lastname} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
        </div>
        {errors.length > 0 && (
          <ul>
          {errors.map((error, index) => (
            <li key={index}>Your password is missing {error}</li>
          ))}
          </ul>
        )}
        <button type="submit">Signup</button>
        </form>
        <p>
        Already have an account? <a href="/login">Login</a>
        </p>
      </>
      ) : (
      <div>
        <p>A verification email has been sent to {form.email}</p>
        <p>If you don&apos;t see the email, please check your spam folder.</p>
        <button onClick={() => router.push('/login')}>Login</button>
        <button onClick={() => handleResendEmail()}>Resend Verification Email</button>
      </div>
      )}
    </div>
  );
}
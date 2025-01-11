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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [resendAttempts, setResendAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [mailError, setMailError] = useState<string | null>(null);

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

  useEffect(() => {
    setPasswordErrors(validatePassword(form.password));
  }, [form.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear the error for the field being updated
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      delete newErrors.form;
      return newErrors;
    });

    // Check if passwords match
    if (name === 'password' || name === 'confirmPassword') {
      const newPassword = name === 'password' ? value : form.password;
      const newConfirmPassword = name === 'confirmPassword' ? value : form.confirmPassword;

      if (newPassword !== newConfirmPassword && newConfirmPassword) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: 'Passwords do not match',
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!form.firstname) newErrors.firstname = 'First name is required';
    if (!form.lastname) newErrors.lastname = 'Last name is required';
    if (!form.email) newErrors.email = 'Email address is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (!form.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
            console.log('Signup successful', data);
            sendVerificationEmail(form.email);
          } else {
            throw new Error(data.message || 'Something went wrong');
          }
        })
        .catch((error) => {
          setErrors({ form: error.message });
        });
    }
  };

  const sendVerificationEmail = (email: string | undefined) => {
    fetch('/api/auth/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        if (data.success) {
          setStep(2);
          setMailError(null);
        } else {
          setStep(2);
          setMailError('Verification email could not be sent. Please try again.');
        }
      })
      .catch((error) => {
        console.log(error)
        setStep(2);
        setMailError('Verification email could not be sent. Please try again.');
      });
  };

  const handleResendEmail = () => {
    if (resendAttempts >= 3) {
      setErrors({ form: 'Maximum resend attempts reached.' });
      return;
    }

    if (timer > 0) {
      setErrors({ form: `Please wait ${timer} seconds before resending the email.` });
      return;
    }

    sendVerificationEmail(form.email);
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {step === 1 ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Create a new account</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">First name</label>
                <input
                  name="firstname"
                  placeholder="John"
                  className="w-full mt-2 p-2 border rounded"
                  value={form.firstname}
                  onChange={handleChange}
                />
                {errors.firstname && <p className="mt-2 text-red-500">{errors.firstname}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last name</label>
                <input
                  name="lastname"
                  placeholder="Doe"
                  className="w-full mt-2 p-2 border rounded"
                  value={form.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && <p className="mt-2 text-red-500">{errors.lastname}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email address</label>
                <input
                  name="email"
                  placeholder="johndoe@gmail.com"
                  className="w-full mt-2 p-2 border rounded"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="mt-2 text-red-500">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="********"
                  className="w-full mt-2 p-2 border rounded"
                  value={form.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="mt-2 text-red-500">{errors.password}</p>}
                {form.password && passwordErrors.length > 0 && (
                  <div className="mt-2 text-red-500">
                    <p>You need to have:</p>
                    <ul className="list-disc list-inside">
                      {passwordErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                  className="w-full mt-2 p-2 border rounded"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="mt-2 text-red-500">{errors.confirmPassword}</p>}
              </div>
              {errors.form && (
                <div className="mb-4 text-red-500">
                  <p>{errors.form}</p>
                </div>
              )}
              <div className="flex justify-between items-center mt-5">
                <p>
                  Already have an account? <br /> <div className="text-blue-500 underline cursor-pointer" onClick={() => router.push('/auth/login')}>Login</div>
                </p>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
            <p className="text-2xl font-bold mb-4">A verification email has been sent to {form.email}</p>
            <p className="mb-4">If you don&apos;t see the email, please check your spam folder.</p>
            {mailError ? (
              <>
              <p className="text-red-500 mb-4">{mailError}</p>
              <div className="w-24 h-24 mb-4">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-red-500 w-full h-full"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
                </svg>
              </div>
              </>
            ) : (
              <div className="w-24 h-24 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-green-500 w-full h-full"
              >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
                />
              </svg>
              </div>
            )}
            <div className="mt-4 flex space-x-4">
              <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => router.push('/auth/login')}
              >
              Login
              </button>
              <button
              className={`bg-gray-500 text-white py-2 px-4 rounded ${timer > 0 || resendAttempts >= 3 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-600'}`}
              onClick={handleResendEmail}
              disabled={timer > 0 || resendAttempts >= 3}
              >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend Verification Email'}
              </button>
            </div>
            </div>
        )}
      </div>
    </div>
  );
}
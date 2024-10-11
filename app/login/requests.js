'use server';

import axios from 'axios';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = 'https://digitalagency.top:6060/api/v1/auth';
function toBase64(str) {
  return Buffer.from(str, 'utf-8').toString('base64');
}

export async function createSession(accessToken, refreshToken) {
  const accessExpiresAt = new Date(Date.now() + 50 * 60 * 1000);
  // const accessExpiresAt = new Date(Date.now() + 2 * 60 * 1000);
  const refreshExpiresAt = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000);

  cookies().set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    expires: accessExpiresAt,
    sameSite: 'lax',
    path: '/',
  });

  cookies().set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    expires: refreshExpiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function refreshSession(refreshToken) {
  'use server';
  try {
    const data = await axios.post(
      `${API_URL}/refresh`,
      { token: refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteSesssion() {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  redirect('/login');
}

export const loginCheck = async (email, password) => {
  const authHeader = 'Basic ' + toBase64(`${email}:${password}`);
  try {
    const response = await axios.post(API_URL + '/login', null, {
      auth: {
        username: email,
        password: password,
      },
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = 'https://digitalagency.top:6060/api/v1/ads';

export const referralBuilder = async () => {
  const TOKEN = cookies().get('accessToken')?.value;
  try {
    const response = await axios.get(
      API_URL +
        '/referral-url-builder?domain=sdfjasofj.xyz&ref_adnetwork=test&ref_pubsite=test&ref_keyword=test&terms=test,test2',
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    console.log(response.data);
  } catch (err) {
    console.log(err.message);
  }
};

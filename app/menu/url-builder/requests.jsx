"use server"

import axios from "axios";
import { cookies } from "next/headers";

const API_URL = 'https://digitalagency.top:6060/api/v1/ads';

export const wrapUrl = async (url) => {
    const TOKEN = cookies().get('accessToken')?.value;
   
    try{
        const response = await axios.post(API_URL + '/save-get-ads-url', { url: url } , {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          },)
        return response.data;
    }catch{
        return false;
    }

};

export const getUrlById = async (id) => {
    const TOKEN = cookies().get('accessToken')?.value;
   
    try{
        const response = await axios.get(API_URL + '/get-ads-url-by-id?id=' + id, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          },)
          console.log(response.data)
        return response.data.url;
    }catch{
        return false;
    }

};

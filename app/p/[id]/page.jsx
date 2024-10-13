"use client"

import { getUrlById } from "@/app/menu/url-builder/requests";
import { useParams } from "next/navigation"
import { useEffect } from "react";

export default function Page(){
    const { id } = useParams();
    useEffect(()=>{
        const getUrl = async () =>{
           const response = await getUrlById(id);
           if(response){
               window.location.href = response;
           }else{
            window.location.href = "https://www.google.com";
           }

        }
        getUrl();
    }, [])

}
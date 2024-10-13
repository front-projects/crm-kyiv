"use client"

import { getUrlById } from "@/app/menu/url-builder/requests";
import { useParams } from "next/navigation"
import { useEffect } from "react";

export default function Page(){
    const { id } = useParams();
    useEffect(()=>{
        const getUrl = async () =>{
           const response = await getUrlById(id);
           window.location.href = response;
        }
        getUrl();
    }, [])

}
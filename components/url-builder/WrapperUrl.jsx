"use client"

import { Button } from "@mui/material";
import { wrapUrl } from '../../app/menu/url-builder/requests'
import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from "react-icons/fa";


export default function WrapperUrl({url}){
    const [status,setStatus] = useState('GENERATE');
    const [isCopied,setIsCopied] = useState(false);
    const [generatedUrl, setGeneratedUrl] = useState('');
    
    const CRM_URL = "https://crm-kyiv-1.vercel.app/p/"


    useEffect(()=> setStatus('GENERATE'),[url])


    const submitGenerate =  async () =>{
        setStatus('LOADING')
        const response = await wrapUrl(url);
        if(response){
            setGeneratedUrl(response);
            setStatus('COMPLETED')
        }else{
            setStatus('ERROR');
        }
        
    }

    const URL_TO_COPY = CRM_URL+generatedUrl + "?ad_id={{ad.id}}&adset_id={{adset.id}}&campaign_id={{campaign.id}}&ad_name={{ad.name}}&adset_name={{adset.name}}&campaign_name={{campaign.name}}&source={{site_source_name}}&placement={{placement}}"
    
    return <div className="w-full flex flex-col gap-4 items-center justify-center border-2 rounded-md hover:border-purple-600">
        {status == 'GENERATE' && <Button color="secondary" sx={{width:'100%', paddingY: '24px'}} onClick={()=>submitGenerate()}>Generate wrapped url</Button>}
        {status == 'LOADING' && <Rings color="purple"/>}
        {status == 'ERROR' && <div className="w-full">
                    <h4 className="text-red-600 w-full py-2 text-center">Something went wrong. Try again.</h4>
                    <Button color="secondary" sx={{width:'100%', paddingY: '24px'}} onClick={()=> submitGenerate()}>Generate wrapped url</Button>
            </div>}
            {status == 'COMPLETED' && <CopyToClipboard text={URL_TO_COPY}>
                    <div className="p-4 w-full flex items-center justify-between cursor-pointer" onClick={() => {
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 2000);
            }}>
                        <div>{URL_TO_COPY}</div>
                        {isCopied ? (
              <div>Copied</div>
            ) : (
              <div className="text-[150%] hover:text-purple-600">
                <FaCopy />
              </div>
            )}
                    </div>
                </CopyToClipboard>}
    </div>
}
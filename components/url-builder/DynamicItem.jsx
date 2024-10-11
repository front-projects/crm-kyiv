import { IoMdCloseCircle } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";


export default function DynamicItem({item, onRemove, onUpdate}){
    const [isEditing, setIsEditing] = useState();
    const [started, setStarted] = useState(item);
    const [updated,setUpdated] = useState(started);
    
    const cancelEdit = () => {
        setUpdated(started);
        setIsEditing(false);
    }
    const submitEdit = () =>{
        setStarted(updated);
        setIsEditing(false);
        onUpdate(updated);
    }
    
    return <>
    {isEditing ? 
    <div className="flex items-center gap-2">
        <input
        value={updated}
        onChange={(e) => setUpdated(e.target.value)} 
        type="text" className='p-2 bg-[#131a22] rounded-md text-white border-2' placeholder='Crative Headline*' />
        <div className="text-green-400 cursor-pointer text-[130%]" onClick={submitEdit}><FaCheckCircle/></div>
        <div className='text-red-400 text-[150%] cursor-pointer' onClick={cancelEdit}><IoMdCloseCircle /></div>
    </div>
    
    : <>
        <div className='bg-gray-600 p-2 rounded-md flex items-center gap-2'>
    <div>{item}</div>
    <div className="text-[130%] ml-2 cursor-pointer" onClick={()=> setIsEditing(true)}><FaRegEdit/></div>
    <div className='text-red-400 text-[150%] cursor-pointer' onClick={onRemove}><IoMdCloseCircle /></div>
    </div>
    </>}
    
    
    </>
    
}
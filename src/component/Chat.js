import React,{useRef} from 'react'
import {db} from '../firebase.js'
import {collection, addDoc, Timestamp, query, orderBy, onSnapshot} from '@firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'

const Chat = ({server}) => {
    
    const [message,setMessage] = useState([])
    const messageRef = useRef()
    const handleSave = async (e) => {
        e.preventDefault()

        try{
            await addDoc(collection(db,server), {
                text: messageRef.current.value,
                created: Timestamp.now()
            })
            const input = document.getElementById("msg")
            input.value = ""
            const chatarea = document.getElementById("chatarea")
            chatarea.scrollTop = chatarea.scrollHeight;
        }catch{
            alert(e)
        }
    }

    useEffect( () => {
        const q = query(collection(db,server),orderBy("created"))
        onSnapshot(q,(querySnapshot) => {
            setMessage(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
        const chatarea = document.getElementById("chatarea")
        chatarea.scrollTop = chatarea.scrollHeight;
    },[server])
    
    return(
        <div className='flex-grow flex flex-col text-slate-300 text-sm'>
            <div className='p-7 shadow-md text-xl'>
                <h2># <span className='text-white font-bold'>{server}</span></h2>
            </div>
            <div className='py-7 flex-grow flex flex-col gap-1 overflow-auto ' id='chatarea'>
                {
                    message.map((msg) => {
                        return(
                        <div className='px-7 py-1 space-y-1 my-1 hover:bg-[#1d2738] cursor-pointer'>
                            <div className='flex gap-3 align-baseline'>
                                <h2 className='text-white font-semibold'>Kaung Nay Lin Khant</h2>
                                <h3 className='text-[0.6rem]'>Today at 10:00 AM</h3>
                            </div>
                            <p id={msg.id}>{msg.data.text}</p>
                        </div>
                        )
                    })
                }
            </div>
            
            <form onSubmit={handleSave} className="m-4 ">
                <input id="msg" type="text" placeholder='Enter your message' ref={messageRef} autoComplete="off" className="w-full focus:outline-none bg-slate-600 px-5 py-3 pl-10 rounded-lg"/>
            </form>
        </div>
    )
}

export default Chat
import React from "react";


const Messages = ({message}) => {
    return(
        <div className='py-7 flex-grow flex flex-col gap-1 overflow-auto ' id='chatarea'>
                {
                    message.map((msg) => {
                        return(
                        <div className='px-7 py-1 space-y-1 my-1 hover:bg-[#1d2738] cursor-pointer' id={msg.id}>
                            <div className='flex gap-3 align-baseline'>
                                <h2 className='text-white font-semibold'>Kaung Nay Lin Khant</h2>
                                <h3 className='text-[0.6rem]'>{
                                    (() => {
                                        const today = new Date().toLocaleDateString()
                                        const yesterday = new Date(new Date().setDate(new Date().getDate()-1)).toLocaleDateString()
                                        const createdDate = new Date(msg.data.created.seconds*1000).toLocaleDateString()
                                        if (today === createdDate){
                                            return "Today " + new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(msg.data.created.seconds*1000)
                                        }else if(yesterday === createdDate ){
                                            return "Yesterday  " + new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(msg.data.created.seconds*1000)
                                        }
                                        else{
                                            return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(msg.data.created.seconds*1000)
                                        }
                                    })()
                                }
                                </h3>
                            </div>
                            <p>{msg.data.text}</p>
                        </div>
                        )
                    })
                }
            </div>
    )
}

export default Messages;
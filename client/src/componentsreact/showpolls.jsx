import { useEffect, useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil";
import pollsatom from "../atoms/polls";

export default function ShowPolls(){
    
    const [mypolls,setpolls] = useRecoilState(pollsatom)
     
    useEffect(()=>{
        fetch("http://localhost:3000/admin/polls",{
            method:"GET",
            headers:{
                "token":localStorage.getItem("token")
            }
        }).then((res)=>{
            res.json().then((out)=>{
                setpolls(out)
            })
        }).catch((err)=>console.log(err))
    },[])
     
    return <div className="bg-white h-fit min-h-[100vh]">
         {mypolls.map((poll)=>{
            return <ShowingPolls poll = {poll}></ShowingPolls>
         })}
    </div>
}
function ShowingPolls({poll}){

    return <div className="pt-[1%]">
           <div className="flex justify-around">
            <div>{poll.name}</div>
            <div>{poll.description}</div>
           </div>
    </div>
}


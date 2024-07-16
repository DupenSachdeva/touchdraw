import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/label"
import { Button } from "../components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { username } from "../atoms/username"
import { loggedin } from "../atoms/loggedin"

export default function Signup() {

  const navigate = useNavigate();
  const setusername = useSetRecoilState(username);
  const setloggedin = useSetRecoilState(loggedin);
  const[inpurusername,setInputUsername] = useState("");
  const [inputpassword,setInputPassword] = useState("");
  return (
    <div className="flex flex-col mx-auto w-[90%] items-center justify-center gap-1.5 mt-[5%] min-h-52 bg-black">
      <Label className="text-red-500" htmlFor="email">Email</Label>
      
      <Input type="email" className="w-[50%] " id="email" placeholder="Email" onChange={(e)=>{setInputUsername(e.target.value)}}/>
      <Label className="text-red-500" htmlFor="password">Password</Label>
      <Input className="w-[50%]" type="password" id="password" placeholder="password" onChange={(e)=>{setInputPassword(e.target.value)}}/>
      <Button className="bg-red-500" onClick={()=>{

        fetch("http://localhost:3000/admin/signup",{
          method:"POST",
          headers:{
               "Content-Type": "application/json"
          },
          body:JSON.stringify({
            "username":inpurusername,
            "password":inputpassword
          })
        }).then((res)=>{
             res.json().then((output)=>{
              localStorage.setItem("token",output.token);
              setusername(inpurusername);
              setloggedin(true);              
              navigate('/')
             }
).catch((err)=>console.log(err))
        })
      }}>Submit</Button>
    </div>
  )
}

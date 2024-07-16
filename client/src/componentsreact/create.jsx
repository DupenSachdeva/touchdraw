import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Input } from "@/components/ui/Input"
  import { Label } from "@/components/ui/label"
  import { Button } from "../components/ui/button"  
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  
import { useRecoilValue, useSetRecoilState } from "recoil"
import { loggedin } from "../atoms/loggedin"
import { Outlet, useNavigate } from "react-router"
import { polldescription, pollname } from "../atoms/polldetails"
import { useState } from "react"
export default function Create(){
    const navigate = useNavigate();
    const isLoggedin = useRecoilValue(loggedin);
    const setpollname = useSetRecoilState(pollname);
    const setpolldescription = useSetRecoilState(polldescription);
    const [inputPollname,setinputPollname] = useState("");
    const [inputPolldescription,setinputPolldescription] = useState("");
    return <div className=" ">
        <div className="flex justify-between">
        <Card className="w-[45vw] mt-[4%] ml-[4%]">
      <CardHeader>
        <CardTitle>Create Poll</CardTitle>
        <CardDescription>Create your new Poll in one-touch.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your poll" onChange={(e)=>setinputPollname(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Input id="name" placeholder="Description of your poll" onChange={(e)=>setinputPolldescription(e.target.value)}/>
            </div>
            
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={()=>{
            if(isLoggedin){
                setpollname(inputPollname);
                setpolldescription(inputPolldescription);
                navigate('/create');}
            else{
                
            }
        }}>Create</Button>
      </CardFooter>
    </Card>
    
       <Outlet></Outlet>
        </div>
    
    <Card className="w-[45vw] mt-[5%] ml-[4%]">
      <CardHeader>
        <CardTitle>DASHBOARD</CardTitle>
        <CardDescription>Get all your statistics in one-touch.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name"></Label>
              <Button className="w-[50%] bg-blue-400">Transactions</Button>
            </div>
            <div className="flex flex-col space-y-1.5">
              
              <Button className="w-[50%] bg-blue-400">Wallet</Button>
            </div>
            <div className="flex flex-col space-y-1.5">
              
              <Button className="w-[50%] bg-blue-400" onClick={()=>{
                navigate('/showpolls')
              }}>Polls</Button>
            </div>
            
          </div>
        </form>
      </CardContent>
      
    </Card>
     

    </div>
}
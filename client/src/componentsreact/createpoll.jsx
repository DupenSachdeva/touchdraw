import * as React from "react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { polldescription, pollname } from "../atoms/polldetails"
import wallet from "../atoms/wallet"

export default function CreatePoll() {
    const setwallet = useSetRecoilState(wallet);
    const [mypollname , setmypollname ]= useRecoilState(pollname);
    const [mypolldescription, setmypolldescription] = useRecoilState(polldescription);
    const [optionA,setOptionA] = React.useState("");
    const [optionB,setOptionB] = React.useState("");
    const [optionC,setOptionC] = React.useState("");
    const [optionD,setOptionD] = React.useState("");
    const [pollanswers,setPollanswers] = React.useState(2);
  return <div className="pt-[5%] px-[25%]">
    <Card className="w-[50vw]">
      <CardHeader>
        <CardTitle>Create Poll</CardTitle>
        <CardDescription>create your new poll in one-touch.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={mypollname} onChange={(e)=>setmypollname(e.target.value)}/>
    
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Input id="name" defaultValue={mypolldescription} onChange={(e)=>setmypolldescription(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">optionA</Label>
              <Input id="name" onChange={(e)=> setOptionA(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">optionB</Label>
              <Input id="name" onChange={(e)=> setOptionB(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">optionC</Label>
              <Input id="name" onChange={(e)=> setOptionC(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">optionD</Label>
              <Input id="name" onChange={(e)=> setOptionD(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5 mt-[3%]">
            <Label htmlFor="name">Poll Answers</Label>
            <Slider defaultValue={[pollanswers]} max={100} step={1} onChange={(e)=>(setPollanswers(e.target.value))} />
            <div className="flex justify-between">
                <h1>{pollanswers}</h1>
                <h1>Rs. {pollanswers*100}</h1>
            </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={()=>{
            fetch("http://localhost:3000/admin/poll",{
                method:"POST",
                headers:{
                    
                    "Content-Type": "application/json",
                    "cost":pollanswers*100,
                    token:localStorage.getItem("token")
                },
                body: JSON.stringify({
                    name:mypollname,
                    description:mypolldescription,
                    optionA:optionA,
                    optionB:optionB,
                    optionC:optionC,
                    optionD:optionD
                })
            }).then((res)=>{
                   res.json().then((out)=>{
                    if(out.desired==false)
                        alert(out.message);
                    else{
                       setwallet(out.user.wallet)
                       alert("poll created successfully");

                       setmypollname()
                       setmypolldescription();
                       setOptionA();
                       setOptionB();
                       setOptionC();
                       setOptionD();
                    }

                   })
            })
        }}>Create</Button>
      </CardFooter>
    </Card></div>
  
}

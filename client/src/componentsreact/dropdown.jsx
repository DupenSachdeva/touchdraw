import { useRecoilState, useRecoilValue } from "recoil"
import { username } from "../atoms/username"
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "../components/ui/button";
import wallet from "../atoms/wallet"
import { useEffect, useState } from "react";
export default function Dropdown(){
    
    const getusername = useRecoilValue(username); 
   return <DropdownMenu className="w-[]">
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline" className="h-[6vh] mr-[10%] mt-[2.5vh] content-center" >{getusername}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[20vw]">
                            <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                    
                                <DropdownMenuItem>
                                    Create
                                    <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
                                </DropdownMenuItem>
                               
                                <DropdownMenuItem>
                                    Transactions
                                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                            
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>Wallet</DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent className="-mt-[5%]">
                                            <MyWallet></MyWallet>
                                            
                                            
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>

                                <DropdownMenuItem>
                                    Polls
                                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>User Mode</DropdownMenuItem>
                    
                            <DropdownMenuSeparator />
                            
                               
                        </DropdownMenuContent>
                    </DropdownMenu>
}

function MyWallet(){
    const [mywallet,setWallet] = useRecoilState(wallet);
    const [inputmoney,setinputmoney] = useState(0);
     return <div className="pt-[1%] h-[40vh]">
     <Card className="w-[30vw]">
       <CardHeader>
         <CardTitle>Rs. {mywallet}</CardTitle>
         
       </CardHeader>
       <CardContent>
         <form>
           <div className="grid w-full items-center gap-4">
             <div className="flex flex-col space-y-1.5">
               
               <Input id="name" type="Number" onChange = {e=>setinputmoney(e.target.value)}/>
               <Button className="bg-blue-600 hover:bg-green-500" onClick={()=>{
                   
                   fetch("http://localhost:3000/admin/recharge",{
                    method:"PUT",
                    headers:{
                        "Content-Type": "application/json",
                        "money":inputmoney,
                        "token":localStorage.getItem("token")
                    }
                   }).then(()=>setWallet(inputmoney));

               }}>Recharge</Button>
     
             </div>
             <div className="flex flex-col space-y-1.5">
              
               <Input id="name" />
               <Button className="bg-red-600">Withdraw</Button>
             </div>
             
            
           </div>
         </form>
       </CardContent>
       
     </Card></div>
}
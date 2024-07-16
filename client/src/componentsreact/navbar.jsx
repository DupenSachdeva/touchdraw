import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loggedin } from "../atoms/loggedin";
import { username } from "../atoms/username";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown";
import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";
import wallet from "../atoms/wallet";

export default function Navbar() {

    useGetUser();
    const navigate = useNavigate();
    const [isLoggedin,setisLoggedin] = useRecoilState(loggedin)
    const getusername = useRecoilValue(username);
    if(isLoggedin) {
        return <div className="bg-black h-[10vh] ">
            <div className="flex flex-row  items-center w-[100%]">
                <div className=" flex flex-row justify-evenly w-[40%]">

                    <div className="text-white">
                        <Link to="/">HOME</Link>
                    </div>
                    <div className="text-white">
                        ABOUT
                    </div>
                    <div className="text-white">
                        USER
                    </div>

                </div>

                <div className="flex flex-row w-[30%]" >
                    <p className="text-blue-400 text-3xl font-bold">BETT</p>
                    <p className="text-red-600 text-3xl font-bold">MASTER</p>


                </div>

                <div className="flex flex-row items-center justify-end w-[30%]"  >
                    <Dropdown></Dropdown>
                    <Button onClick={() => {
                        console.log('hi');
                        localStorage.removeItem("token");
                        setisLoggedin(false);

                    }} variant="outline" className="h-[6vh] mr-[5%] mt-[2.5vh]" >SIGNOUT</Button>
                </div>
            </div>
        </div>
    }

    else if(!isLoggedin)return <div className="bg-black h-[10vh]">
        <div className="flex flex-row  items-center w-[100%]">
            <div className=" flex flex-row justify-evenly w-[40%]">

                <div className="text-white">
                    <Link to="/">HOME</Link>
                </div>
                <div className="text-white">
                    ABOUT
                </div>
                <div className="text-white">
                    USER
                </div>

            </div>

            <div className="flex flex-row w-[30%]" >
                <p className="text-blue-400 text-3xl font-bold">BETT</p>
                <p className="text-red-600 text-3xl font-bold">MASTER</p>


            </div>

            { <div className="flex flex-row items-center justify-end w-[30%]"  >
                <Button onClick={() => {
                    navigate('/login')
                }} variant="outline" className="h-[6vh] mr-[5%] mt-[2.5vh] content-center" >LOGIN</Button>
                <Button onClick={() => {
                    navigate('/signup')
                }} variant="outline" className="h-[6vh] mr-[5%] mt-[2.5vh]" >SIGNUP</Button>
            </div>}
        </div>
    </div>

}

function useGetUser(){
        const setmyusername = useSetRecoilState(username);
        const setisLoggedin = useSetRecoilState(loggedin);
        const setwallet = useSetRecoilState(wallet)
        const [loading,setloading] = useState(false);
        
        useEffect(()=>{
            if(window.localStorage.getItem("token")){
                setloading(true)
                fetch("http://localhost:3000/admin/me",{
                    headers:{
                        "token":window.localStorage.getItem("token")
                    }
                }).then((res)=>{res.json().then((out)=>{setmyusername(out.username)
                    setwallet(out.wallet);
                    setisLoggedin(true);
                    
                    setloading(false); 

                })}).catch(err=> {
                    
                    console.log(err)})
                
            }
        },[])

}
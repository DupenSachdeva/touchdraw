import { Button } from "./components/ui/button"
import { BrowserRouter, Route } from "react-router-dom"
import { Router,Routes } from "react-router-dom"
import Navbar from "./componentsreact/navbar"
import Signup from "./componentsreact/signup"
import Login from "./componentsreact/login"
import { RecoilRoot } from "recoil"
import Mainpage from "./componentsreact/mainpage"
import Create from "./componentsreact/create"
import CreatePoll from "./componentsreact/createpoll"
import ShowPolls from "./componentsreact/showpolls"
export default function App(){


  return <RecoilRoot>
    <div className="min-h-screen">
    <Navbar></Navbar>
    <Routes>
        <Route path='/' element={<Mainpage/>}>
           <Route index element={<Create></Create>}></Route>
           <Route path="/create" element={<CreatePoll></CreatePoll>}></Route>
           <Route path="/showpolls" element={<ShowPolls></ShowPolls>}></Route>
        </Route>
        <Route path='/signup'  element={<Signup></Signup>}></Route>
        <Route path='/login'  element={<Login></Login>}></Route>
    </Routes>
  </div>
  </RecoilRoot>
  
}
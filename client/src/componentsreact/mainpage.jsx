import { Outlet } from "react-router";

export default function Mainpage(){

    return <div className="bg-slate-950 h-max mt-0">
           <Outlet className=""></Outlet>
    </div>
}
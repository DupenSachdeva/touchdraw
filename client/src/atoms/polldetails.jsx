import { atom } from "recoil";
 const pollname = atom({
    key:'pollname',
    default:""
 })

 const polldescription = atom({
    key:"polldescription",
    default:""
 })

 export {pollname,polldescription};
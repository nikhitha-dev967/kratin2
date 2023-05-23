import {useState} from  "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {v4 as uuidv4} from "uuid"
import SignUp from "./components/SignUp";
import Login from "./components/Login"
import Home from "./components/Home";

const initialAllocations = [{allocationId : uuidv4(), resource : "Device Name 1", userId : "", time : null},
{allocationId : uuidv4(), resource : "Device Name 2", userId : "", time : null},
{allocationId : uuidv4(), resource : "Device Name 3", userId : "", time : null}]

function getAllocationsFromLocalStorate () {
  let stringfiedAllocations = localStorage.getItem("Allocations");
  let parsedAllocations = JSON.parse(stringfiedAllocations);
  if (parsedAllocations === null) {
      return initialAllocations;
  } else {
      return parsedAllocations;
  }

  
  
}

function getUsersFromLocalStorate () {
  let stringfiedUsers = localStorage.getItem("Users");
  let parsedUsers = JSON.parse(stringfiedUsers);
  if (parsedUsers === null) {
      return [];
  } else {
      return parsedUsers;
  }
}


function App() {
  const [users, setUsers] = useState(getUsersFromLocalStorate())
  const [allocations, setAllocations] = useState(getAllocationsFromLocalStorate())

  
  localStorage.setItem("Users",JSON.stringify(users))
  localStorage.setItem("Allocations",JSON.stringify(allocations))

  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login users={users} />} />
      <Route path="/signup" element={<SignUp setUsers={setUsers} users={users} />} />
      <Route path="/home/:id" element={<Home users={users} allocations={allocations} setAllocations={setAllocations} />} />
      
    </Routes>
   </BrowserRouter>
  );
  
}

export default App;

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { IoIosSettings } from "react-icons/io";
  import { RiAdminLine } from "react-icons/ri";
  import { PiPasswordDuotone } from "react-icons/pi";
  import { NavLink,Link } from "react-router-dom";
  import { useSelector } from "react-redux";
  
  export default function AccordionDemo({open}) {
    const {user} = useSelector((state) => state.auth);
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex space-x-2 items-center px-2">
             <IoIosSettings className="text-3xl"/>
             <h1  className={`${!open && 'hidden'} origin-left duration-200 text-lg`}>Setting</h1>
            </div>
          </AccordionTrigger>
          <AccordionContent className="">
            <div className="flex flex-col space-y-1 px-6">
             <NavLink className={({ isActive }) => 
              `flex items-center p-2 cursor-pointer hover:bg-light-white text-black text-lg gap-x-4 
              ${isActive ? 'bg-indigo-900 border-solid border-l-2 border-yellow-600 text-white' : 'text-lg'}`
            } to={user?.role === 'trainee' ? '/Trainee/change':'/Dashboard/change'}>{!open ? <PiPasswordDuotone/>:"Password"}</NavLink>

             {user?.role === 'super-admin' && <NavLink  className={({ isActive }) => 
              `flex items-center p-2 cursor-pointer hover:bg-light-white text-black text-lg gap-x-4 
              ${isActive ? 'bg-indigo-900 border-solid border-l-2 border-yellow-600 text-white text-3xl' : 'text-2xl'}`
            }to='/Dashboard/create-admin'>{!open ? <RiAdminLine/>:"Create Admin"}</NavLink>}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  
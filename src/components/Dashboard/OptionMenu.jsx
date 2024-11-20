import { Button } from "@/components/ui/button"
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function OptionMenu({id}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">< BsThreeDotsVertical /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
      <Link to={`/Dashboard/add/chapter/${id}`}>Add chapter</Link>
      </PopoverContent>
    </Popover>
  )
}

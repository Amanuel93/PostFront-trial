// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { TbClockCog } from "react-icons/tb";

// export default function PlannerAlert({id}) {
//     console.log(id);
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <button className='bg-black/90 text-white px-6 py-1 rounded-sm font-light flex items-center'>Plan <span className="ml-2"><TbClockCog className="text-md"/></span></button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Plan You Training</DialogTitle>
//           <DialogDescription>
//             Make a plan for the training you have chosen. Click save plan when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="">
           
//           {/* end plan a training section */}
//           <input type="date" class="border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

//         </div>
//         <DialogFooter>
//           <Button type="submit">Save plan</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TbClockCog } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {  planTrainingStart,fetchplannedTrainingsStart, clearMessages } from "../../redux/planSlice"; // Import your actions

export default function PlannerAlert({ id }) {
  console.log(id);
  const dispatch = useDispatch();
  const [plannedDate, setPlannedDate] = useState("");

  const { loading, successMessage, error } = useSelector(
    (state) => state.planning
  );

  const handleDateChange = (e) => {
    setPlannedDate(e.target.value);
  };

  const handleSubmit = () => {
    if (!plannedDate) {
      alert("Please select a date.");
      return;
    }
    // Dispatch the action to plan the training
    dispatch( planTrainingStart({ id, plannedDate }));
  };

  // Clear success/error messages when the component is unmounted or after success
  if (successMessage || error) {
    setTimeout(() => {
      dispatch(clearMessages());
    }, 3000);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-black/90 text-white px-6 py-1 rounded-sm font-light flex items-center">
          Plan <span className="ml-2"><TbClockCog className="text-md" /></span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Plan Your Training</DialogTitle>
          <DialogDescription>
            Make a plan for the training you have chosen. Click save plan when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <Label htmlFor="trainingDate">Select Planned Date</Label>
          <Input
            id="trainingDate"
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={plannedDate}
            onChange={handleDateChange}
          />
        </div>

        {loading && <div className="text-center text-gray-500">Planning your training...</div>}
        {successMessage && <div className="text-center text-green-500">{successMessage}</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={loading}>
            Save Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


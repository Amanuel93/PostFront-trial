
import * as React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  import { MdDelete } from "react-icons/md"
  import { useDispatch, useSelector } from "react-redux";
  import {
    fetchTrainingsStart,
    clearStatus,
  } from "../../redux/trainingSlice";
  
  export default function AlertDialogDemo({ onDelete,section }) {
    const dispatch = useDispatch();
    const {training, loading, success, error } = useSelector(
      (state) => state.training
    );

    React.useEffect(() => {
      if (success) {
        // Optionally, re-fetch trainings to ensure the list is up-to-date
        dispatch(fetchTrainingsStart());
        dispatch(clearStatus());
      }
    }, [success, dispatch]);

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline"><MdDelete /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {
              `This action cannot be undone. This will permanently delete the
              ${!section ? 'training' : section} and remove the data data from our servers.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
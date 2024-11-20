// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'; // Landing page
import './index.css';
import DashboardLoayout from "./components/Layouts/DashboardLayout";
import Trainings from "./components/Dashboard/Trainings";
import AddTraining from "./components/Dashboard/AddTraining";
import AddChapter from './components/Dashboard/AddChapter'
import AddQuestion from './components/Dashboard/AddQuestion'
import AddtrainingLayout from "./components/Layouts/AddtraininingLayout"
import Dashboard from "./components/Dashboard/Dashboard";
import Trainee from "./components/Dashboard/Trainee";
import Setting from "./components/Dashboard/Setting";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import store from './store'
import { Provider } from 'react-redux';
import TraineeDetail from "./components/Dashboard/TraineeDetail";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import TraineeLayout from "./components/Layouts/TraineeLayout";
import ForgotPassword from "./components/Auth/ForgotPassword";
import PersonalTrainingLayout from "./components/Layouts/PersonalTrainingLayout";
import TrainingsList from "./components/TraineePage/TrainingsList";
import TrainingsPasscode from "./components/TraineePage/TrainingsPasscode";
import TrainingsDetail from "./components/TraineePage/TrainingsDetail";
import ReadingandQuestions from "./components/TraineePage/ReadingandQuestions";
import Complete from "./components/TraineePage/Complete";
import { MdDashboardCustomize } from 'react-icons/md';
import { IoAdd, IoDocumentsOutline,IoArrowBackCircleSharp } from 'react-icons/io5';
import { GrScorecard } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { FaPeopleLine } from 'react-icons/fa6';
import MyTraining from "./components/TraineePage/MyTraining";
import MyProfile from "./components/TraineePage/MyProfile";
import TSetting from "./components/TraineePage/TSetting";
import ResetPassword from "./components/Auth/ResetPassword";
import TrainingLayout from "./components/Layouts/TrainingLayout";
import TrainingContent from "./components/Dashboard/TrainingContent";
import ChapterContent from "./components/Dashboard/ChapterContent";
import ExamLayout from "./components/Layouts/ExamLayout";

const Menus = [
  { title: 'Dashboard', icon: <MdDashboardCustomize className='text-3xl' />, link: '/Trainee' },
  { title: 'My Trainings', icon: <GrScorecard className='text-3xl' />, link: '/Trainee/Mytraining' },
  { title: 'Profile', icon: <CgProfile className='text-3xl' />, link: '/Trainee/Myprofile' },
  { title: 'Settings', icon: <IoIosSettings className='text-3xl' />, link: '/Trainee/setting' },
];

const AdminMenus = [
    { title: 'Dashboard', icon: <MdDashboardCustomize className='text-3xl' />, link: '/Dashboard' },
    { title: 'Trainees', icon: <FaPeopleLine className='text-3xl' />, link: '/Dashboard/trainee' },
    { title: 'Trainings', icon: <IoDocumentsOutline className='text-3xl' />, link: '/Dashboard/trainings' },
    { title: 'Add Training', icon: <IoAdd className='text-3xl' />, link: '/Dashboard/add' },
    { title: 'Settings', icon: <IoIosSettings className='text-3xl' />, link: '/Dashboard/setting' },
  ];

const router = createBrowserRouter([
  {
    path: "/", 
    element:<App/>
  },
  {
    path: "Signup", 
    element:<Signup/>
  },
  {
    path: "Login", 
    element:<Login/>
  },
  {
    path: "Forgot-Password", 
    element:<ForgotPassword/>
  },
  {
    path: "Reset-Password/:token", 
    element:<ResetPassword/>
  },
  {
    path:"Dashboard",
    element:React.cloneElement(<DashboardLoayout/>, { Menus: AdminMenus }),
    children:[
      {
        path:"",
        element:<Dashboard/>
      },
      {
        path:"trainings",
        element:<TrainingLayout/>,
        children:[
          {
            path:"",
            element:<Trainings/>
          },
          {
            path:":trainingId",
            element:<TrainingContent/>
          },
          {
            path:":trainingId/chapter/:chapterId",
            element:<ChapterContent/>
          },
        ]
      },
      {
        path:"add",
        element:<AddtrainingLayout/>,
        children:[
          {
            path:"",
            element:<AddTraining/>
          },
          {
            path:"chapter/:trainingId",
            element:<AddChapter/>
          },
          {
            path:"question/:chapterId",
            element:<AddQuestion/>
          },
        ]
      },
      {
        path:"trainee",
        element:<TraineeLayout/>,
        children:[
          {
            path:"",
            element:<Trainee/>
          },
          {
            path:":traineeId",
            element:<TraineeDetail/>
          }
        ]
      },
      {
        path:"setting",
        element:<Setting/>
      },
    ]
  },
  {
    path: "Trainee", 
    element:React.cloneElement(<DashboardLoayout/>, { Menus: Menus }),
    children:[
        {
         element:<PersonalTrainingLayout/>,
         children:[
          {
          path: "",
          element: <TrainingsList />
          },
         {
          path: ":trainingId/passcode",
          element: <TrainingsPasscode />
         },
         {
          path: "Complete-profile", 
          element:<Complete/>
         },
         {
          path: "Mytraining", 
          element:<MyTraining/>
         },
         {
          path: "Myprofile", 
          element:<MyProfile/>
         },
         {
          path:"setting",
          element:<TSetting/>
        },
        ]
        }
    ]
  },
  // {
  //   path: ":trainingId/details",
  //   element: <TrainingsDetail />
  //  },
  //  {
  //   path: ":trainingId/chapter/:chapterId",
  //   element: <ReadingandQuestions />
  //  },
  {
    path:"Training",
    element:<ExamLayout/>,
    children:[
     {
      path: ":trainingId/details/:chapterId",
      element: <TrainingsDetail />
     },
    {
     path: ":trainingId/chapter/:chapterId",
     element: <ReadingandQuestions />
    }
    ]
  }
]);

// Render the RouterProvider with the router inside the ThemeProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store = {store}>
     <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);


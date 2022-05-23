import ChangePassword from "./pages/changePassword/ChangePassword"
import EditProfile from "./pages/editProfile/EditProfile"
import Home from "./pages/home/Home"
import ManagerList from "./pages/manangerList/ManagerList"
import NewUser from "./pages/newUser/NewUser"
import Profile from "./pages/profile/Profile"
import Project from "./pages/project/Project"
import ProjectList from "./pages/projectList/ProjectList"
import SendEmail from "./pages/sendEmail/SendEmail"
import Timeline from "./pages/timeLine/Timeline"
import User from "./pages/user/User"
import UserList from "./pages/userList/UserList"


export const routes = [
    {
      name: 'home',
      element: <Home />,
      path: '/',
    },
    {
        name: 'projects',
        element: <ProjectList />,
        path: '/projects',
      },
      {
        name: 'users',
        element: <UserList />,
        path: '/users',
      },
      {
        name: 'project',
        element: <Project />,
        path: '/project/:id',
      },
      {
        name: 'profile',
        element: <Profile />,
        path: '/profile/:id',
      },
      {
        name: 'user',
        element: <User />,
        path: '/user/:id',
      },
      {
        name: 'timeline',
        element: <Timeline />,
        path: '/timeline',
      },
      {
        name: 'newuser',
        element: <NewUser />,
        path: '/newuser',
      },
      {
        name: 'sendemail',
        element: <SendEmail />,
        path: '/sendemail',
      },
      {
        name: 'managers',
        element: <ManagerList />,
        path: '/managers',
      },
      {
        name: 'changepassword',
        element: <ChangePassword />,
        path: '/changepassword',
      },
      {
        name: 'editprofile',
        element: <EditProfile />,
        path: '/editprofile',
      },
]


import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login'
import FoodProductCategory from './foodproducts/FoodProductCategory'
import TopNavbar from './components/TopNavbar'
import UserLoginList from './user/UserLoginList'
import UserProfile from './user/UserProfile'
import SingleUserView from './user/SingleUserView'
import EditUser from './user/EditUser'


const AllRoutes = () => {
    const storageData = JSON.parse(localStorage.getItem("userLogin"))

    const PrivateRoute = ({ children }) => {
        return storageData !== null ? <>{children}</> : (<><Navigate to="/login" /></>)
    }
    const PublicRoute = ({ children }) => {
        return storageData === null ? <>{children}</> : (<><Navigate to="/" /></>)
    }
  return (
    <>
    <PrivateRoute>
        <TopNavbar />
    </PrivateRoute>
    <Routes>
        <Route exac path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route exac path='/' element={<PrivateRoute><FoodProductCategory/></PrivateRoute>} />
        <Route exac path='/user/profile' element={<PrivateRoute><UserProfile/></PrivateRoute>} />
        <Route exac path='/userloginlist' element={<PrivateRoute><UserLoginList/></PrivateRoute>} />
        <Route exac path='/userloginlist/:uid' element={<PrivateRoute><SingleUserView/></PrivateRoute>} />
        <Route exac path='/userloginlist/edit/:eid' element={<PrivateRoute><EditUser/></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default AllRoutes
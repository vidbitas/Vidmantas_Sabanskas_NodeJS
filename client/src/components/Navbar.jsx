import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const loginUserName = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const activeStyles = {
    color: 'white',
  };

  const logoutHandler = () => {
    dispatch(logout());
    sessionStorage.removeItem(loginUserName._id);
    sessionStorage.removeItem('user');
    toast('You are logged out');
    navigate('/');
  };

  return (
    <div className='flex py-4 justify-between items-center px-4'>
      <span className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
        VidBitas
      </span>

      <ul className='flex gap-8'>
        <li>
          <NavLink
            to={'/'}
            href='/'
            className='text-xs text-gray-400 hover:text-white'
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Auction
          </NavLink>
        </li>
        {isAuth && (
          <div className='flex gap-8'>
            <li>
              <NavLink
                to={'/posts'}
                href='/'
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                My offers
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/new'}
                href='/'
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Add product
              </NavLink>
            </li>
          </div>
        )}
      </ul>

      <div>
        <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
          {isAuth ? (
            <button onClick={logoutHandler}>Sign Out</button>
          ) : (
            <Link to={'/login'}> Sign In </Link>
          )}
        </div>
        {loginUserName && (
          <div className='text-xs text-white '>
            <p>Signs: {loginUserName.username}</p>
          </div>
        )}
      </div>
    </div>
  );
};

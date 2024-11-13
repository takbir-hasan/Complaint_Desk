import React from 'react';

function Navbar() {
  const navItem = (
    <>
      <li><a href='/slogin' className='text-xl hover:shadow-lg hover:bg-blue-200'>Student</a></li>
      <li><a href='/Login' className='text-xl hover:shadow-lg hover:bg-blue-200'>Teacher</a></li>
      <li><a href='/AdminLogin' className='text-xl hover:shadow-lg hover:bg-blue-200'>Admin</a></li>
      <li><a href='/feedback' className='text-xl hover:shadow-lg hover:bg-blue-200'>Feedback</a></li>
    </>
  );

  return (
    <>
      <div className='max-w-screen-2xl container text-black mx-auto md:px-20 px-0 bg-yellow-300'>
        <div className="navbar bg-yellow-300">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {navItem}
              </ul>
            </div>
            <a href='/' className="btn btn-ghost text-xl font-bold hover:bg-transparent hover:text-inherit">Complaint Desk</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {navItem}
            </ul>
          </div>
          <div className="navbar-end">
            <a href='/donation' className="btn bg-pink-200 text-black hover:bg-blue-200 px-2">Help Us Grow</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

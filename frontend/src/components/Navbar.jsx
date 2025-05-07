import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  
  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});

  }
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-base font-semibold text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>TRANG CHỦ</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>SẢN PHẨM</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>GIỚI THIỆU</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>LIÊN HỆ</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Tìm kiếm"
        />
        
        <div className="group relative">
          <Link to='/login'>
            <img
              onClick ={()=> token ?null:navigate('/login')}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="Tài khoản"
            />
          </Link>
          { token &&
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black text-sm font-medium">Hồ sơ của tôi</p>
              <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-black text-sm font-medium">
                Bộ sưu tập của tôi
              </p>
              <p className="cursor-pointer hover:text-black text-sm font-medium">Cài đặt</p>
              <p onClick={logout} className="cursor-pointer hover:text-black text-sm font-medium">Đăng xuất</p>
            </div>
          </div>}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Giỏ hàng" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px] font-bold">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="Quay lại"
            />
            <p className="font-medium">Quay lại</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border text-base font-medium"
            to="/"
          >
            TRANG CHỦ
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border text-base font-medium"
            to="/collection"
          >
            BỘ SƯU TẬP
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border text-base font-medium"
            to="/about"
          >
            GIỚI THIỆU
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border text-base font-medium"
            to="/contact"
          >
            LIÊN HỆ
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
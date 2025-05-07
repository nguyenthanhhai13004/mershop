import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ React Router
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  const navigate = useNavigate(); // Tạo hàm điều hướng

  const handleLogout = () => {
    // Xóa token khỏi localStorage và trạng thái token
    localStorage.removeItem('token');
    setToken(''); // Cập nhật lại token trong state

    // Điều hướng về trang login
    navigate('/login');
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,10px)]' src={assets.logo} alt="Logo" />
      <button
        onClick={handleLogout} // Gọi hàm handleLogout khi người dùng nhấn Đăng xuất
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
        Đăng xuất
      </button>
    </div>
  );
};

export default Navbar;

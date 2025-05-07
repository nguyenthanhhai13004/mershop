import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign up') {
        if (password !== confirmPassword) {
          toast.error("Mật khẩu xác nhận không khớp!");
          return;
        }
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
          setCurrentState('Login');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Đăng nhập thành công!");
          window.location.reload(); //
          // navigate('/');  // Điều hướng đến trang chủ hoặc trang bạn muốn sau khi đăng nhập
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-6 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-4 mt-10'>
        <p className='text-3xl font-semibold text-black'>{currentState === 'Sign up' ? 'Đăng ký' : 'Đăng nhập'}</p>
        <hr className='border-none h-[1.5px] w-8 bg-black' />
      </div>

      {currentState === 'Sign up' && (
        <div className="w-full">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className='w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-black'
            placeholder='Họ tên'
            required
          />
        </div>
      )}

      <div className="w-full">
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className='w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-black'
          placeholder='Email/Số điện thoại/Tên đăng nhập'
          required
        />
      </div>

      <div className="w-full">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className='w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-black'
          placeholder='Mật khẩu'
          required
        />
      </div>

      {currentState === 'Sign up' && (
        <div className="w-full">
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            className='w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:border-black'
            placeholder='Xác nhận mật khẩu'
            required
          />
        </div>
      )}

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer text-black hover:underline'>Quên mật khẩu?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer text-black hover:underline'>Tạo tài khoản mới</p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-black hover:underline'>Đăng nhập tại đây</p>
        )}
      </div>

      <button
        type="submit"
        className='bg-black text-white font-semibold px-8 py-3 mt-4 rounded-md hover:bg-gray-800 active:bg-gray-900 transition-colors w-full'
      >
        {currentState === 'Login' ? 'Đăng nhập' : 'Đăng ký'}
      </button>
    </form>
  );
};

export default Login;
import axios from 'axios'
import React, { useState } from 'react'

import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
      if (response.data.success) {  
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg px-8 py-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng nhập vào Admin</h1>
        <form onSubmit={onSubmitHandler}>
          {/* Email */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Địa chỉ email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-black"
              type="email"
              placeholder="Email/Số điện thoại/Tên đăng nhập"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Mật khẩu</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-black"
              type="password"
              placeholder="Mật khẩu"
              required
            />
          </div>

          {/* Login Button */}
          <button className="w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800 active:bg-gray-900 transition-colors">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

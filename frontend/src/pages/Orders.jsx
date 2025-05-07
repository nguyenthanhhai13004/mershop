import React, { useContext } from 'react'
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const Orders = () => {
  const {products, currency} = useContext(ShopContext);
  return (
    <div className='border-t pt-8 md:pt-12'>
      <div className='mb-6'>
        <Title text2="ĐƠN HÀNG CỦA TÔI" />
      </div>
      <div className='space-y-4'>
        {
        products.slice(1,4).map((item, index) => (
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-4 md:gap-6 text-sm'>
              <img className='w-16 sm:w-20 object-cover' src={item.image[0]} alt={item.name}/>
              <div>
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700'>
                  <p className='text-lg font-medium'>{item.price}.000{currency}</p>
                  <p>quantity:1</p>
                  <p>size:m</p>
                </div>
                <p className='mt-2'>Date: <span className='text-gray-400'>25,jul,2025</span></p>
              </div>
            </div>
            <div className='md:w-1/3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-6 mt-2 md:mt-0'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 rounded-full bg-green-500'></div>
                <p className='text-sm md:text-base'>Đã giao hàng</p>  
              </div>
              <button className='border border-gray-300 px-4 py-2 text-sm font-medium rounded hover:bg-gray-50 transition-colors'>
                track Orders
              </button>
            </div>
          </div>
        ))
        }
      </div>      
    </div>
  )
}

export default Orders
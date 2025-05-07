import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div>
      <div className="w-full">
        <div className="text-2xl">
          <Title  text2={'TỔNG ĐƠN HÀNG'} />
        </div>

        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex justify-between">
            <p>Tạm tính</p>
            <p>
              {getCartAmount()}.000{currency} 
            </p>
          </div>

          <hr />

          <div className="flex justify-between">
            <p>Phí vận chuyển</p>
            <p>
              
              {delivery_fee}.000{currency}
            </p>
          </div>

          <hr />

          <div className="flex justify-between">
            <p>Thành tiền</p>
            <p>
              
              {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.000{currency}
            </p>
          </div>

          <hr />
        </div>
      </div>
    </div>
  );
};

export default CartTotal;

import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="Đổi hàng" />
        <p className="font-semibold">Đổi hàng dễ dàng</p>
        <p className="text-gray-400">Hỗ trợ đổi sản phẩm nhanh chóng</p>
      </div>

      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="Trả hàng" />
        <p className="font-semibold">Hoàn trả trong 7&nbsp;ngày</p>
        <p className="text-gray-400">Miễn phí trả hàng trong 7&nbsp;ngày</p>
      </div>

      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="Hỗ trợ" />
        <p className="font-semibold">Hỗ trợ 24/7</p>
        <p className="text-gray-400">Đội ngũ luôn sẵn sàng phục vụ bạn</p>
      </div>
    </div>
  );
};

export default OurPolicy;

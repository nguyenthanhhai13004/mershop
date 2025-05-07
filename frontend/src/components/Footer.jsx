import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer>
      {/* flex trên mobile, chuyển sang grid 3 cột (3fr-1fr-1fr) khi ≥ sm */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          {/* assets.logo là đường dẫn logo đã import sẵn */}
          <img src={assets.logo} className="mb-5 w-32" alt="Logo" />
          <p className="w-full md:w-2/3 text-gray-600">
            Chúng tôi luôn nỗ lực mang đến cho bạn trải nghiệm mua sắm tốt nhất
            với sản phẩm chất lượng và dịch vụ tận tâm.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">CÔNG TY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Vận chuyển</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">LIÊN HỆ</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+84-000-000-000</li>
            <li>lienhe@gmail.com</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

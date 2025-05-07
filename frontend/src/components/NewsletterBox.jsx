import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Đăng ký ngay & nhận ưu đãi 20%
      </p>
      <p className="text-gray-400 mt-3">
        Nhận thông tin khuyến mãi và sản phẩm mới nhất.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Nhập email của bạn"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-3 hover:bg-gray-700 transition-all duration-300"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;

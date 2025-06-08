import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Placeholder logos for Vietnamese banks
const bankLogos = {
  vietcombank: "/api/placeholder/150/50",
  vietinbank: "/api/placeholder/150/50",
  techcombank: "/api/placeholder/150/50",
  momo: "/api/placeholder/150/50"
};

// Simple Title component
const Title = ({ text }) => (
  <h2 className="font-semibold text-gray-800">{text}</h2>
);

// Simple CartTotal component
const CartTotal = () => (
  <div className="border border-gray-200 rounded-lg shadow-sm p-5 bg-white">
    <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">Chi tiết đơn hàng</h3>
    <div className="flex justify-between mb-3 text-gray-700">
      <p>Tổng tiền hàng:</p>
      <p className="font-medium">1.200.000₫</p>
    </div>
    <div className="flex justify-between mb-3 text-gray-700">
      <p>Phí vận chuyển:</p>
      <p className="font-medium">30.000₫</p>
    </div>
    <div className="flex justify-between mb-3 text-green-600">
      <p>Giảm giá:</p>
      <p className="font-medium">-50.000₫</p>
    </div>
    <div className="border-t border-dashed pt-3 mt-3 flex justify-between font-bold text-gray-900">
      <p>Tổng thanh toán:</p>
      <p className="text-lg">1.180.000₫</p>
    </div>
  </div>
);

// Address Selector Component with Vietnam API using actual API
const AddressSelector = ({ onChange, className }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/?depth=1');
        setProvinces(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching provinces:', error);
        setError('Không thể tải dữ liệu tỉnh/thành phố');
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    
    // Clear districts and wards when province changes
    setDistricts([]);
    setWards([]);
    setSelectedDistrict('');
    setSelectedWard('');
    
    if (!provinceCode) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      setDistricts(response.data.districts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching districts:', error);
      setError('Không thể tải dữ liệu quận/huyện');
      setLoading(false);
    }
  };

  const handleDistrictChange = async (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    
    // Clear wards when district changes
    setWards([]);
    setSelectedWard('');
    
    if (!districtCode) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      setWards(response.data.wards);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wards:', error);
      setError('Không thể tải dữ liệu phường/xã');
      setLoading(false);
    }
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  useEffect(() => {
    // Get province, district and ward names
    const provinceName = provinces.find(p => p.code === selectedProvince)?.name || '';
    const districtName = districts.find(d => d.code === selectedDistrict)?.name || '';
    const wardName = wards.find(w => w.code === selectedWard)?.name || '';
    
    // Call parent onChange with codes and names
    onChange({
      provinceCode: selectedProvince,
      districtCode: selectedDistrict,
      wardCode: selectedWard,
      provinceName,
      districtName,
      wardName,
      fullAddress: [wardName, districtName, provinceName].filter(Boolean).join(', ')
    });
  }, [selectedProvince, selectedDistrict, selectedWard, provinces, districts, wards, onChange]);

  if (error) {
    return <div className="text-red-500 p-3 border border-red-300 rounded-md">{error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <select
        value={selectedProvince}
        onChange={handleProvinceChange}
        className={`border border-gray-300 rounded-md py-2.5 px-4 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${className}`}
        disabled={loading}
      >
        <option value="">Chọn Tỉnh/Thành phố</option>
        {provinces.map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>

      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className={`border border-gray-300 rounded-md py-2.5 px-4 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${className}`}
          disabled={!selectedProvince}
        >
          <option value="">Chọn Quận/Huyện</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))}
        </select>
        
        <select
          value={selectedWard}
          onChange={handleWardChange}
          className={`border border-gray-300 rounded-md py-2.5 px-4 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${className}`}
          disabled={!selectedDistrict}
        >
          <option value="">Chọn Phường/Xã</option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>
              {ward.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    provinceName: '',
    districtName: '',
    wardName: '',
    provinceCode: '',
    districtCode: '',
    wardCode: '',
    addressFull: '',
    note: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [addressData, setAddressData] = useState({});

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({ ...data, [name]: value }));
  };

  const handleAddressChange = (data) => {
    setAddressData(data);
    setFormData(prev => ({
      ...prev,
      provinceCode: data.provinceCode || '',
      districtCode: data.districtCode || '',
      wardCode: data.wardCode || '',
      provinceName: data.provinceName || '',
      districtName: data.districtName || '',
      wardName: data.wardName || '',
      addressFull: data.fullAddress || ''
    }));
  };

  const handlePlaceOrder = () => {
    // Simple validation
    if (!formData.name || !formData.phone || !formData.address || !formData.provinceCode || !formData.districtCode || !formData.wardCode) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    
    // Show success state
    setOrderPlaced(true);
    
    // Display order details
    const orderDetails = {
      customerInfo: {
        name: formData.name,
        phone: formData.phone,
        address: `${formData.address}, ${formData.wardName}, ${formData.districtName}, ${formData.provinceName}`,
        note: formData.note
      },
      paymentMethod: method
    };
    
    console.log('Order Details:', orderDetails);
    
    // In a real app, we would submit the order to the server
    // For demo purposes, we'll just show a success message
    setTimeout(() => {
      alert('Đặt hàng thành công!');
    }, 100);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-8 pt-6 lg:pt-10 min-h-screen border-t border-gray-200 bg-gray-50 px-4 lg:px-8">
      {/* Thông tin vận chuyển */}
      <div className="flex flex-col gap-5 w-full lg:w-3/5">
        <div className="text-xl lg:text-2xl mb-2">
          <Title text={"Thông tin vận chuyển"} />
        </div>
        
        {/* Form container */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {/* Thông tin cá nhân */}
          <div className="mb-5">
            <h3 className="text-gray-700 font-medium mb-3">Thông tin cá nhân</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="border border-gray-300 rounded-md py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="Họ và tên"
                name="name"
                value={formData.name}
                onChange={onChangeHandler}
              />
              <input
                className="border border-gray-300 rounded-md py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="Số điện thoại"
                name="phone"
                value={formData.phone}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          {/* Thông tin địa chỉ */}
          <div className="mb-5">
            <h3 className="text-gray-700 font-medium mb-3">Địa chỉ giao hàng</h3>
            
            {/* Use AddressSelector component */}
            <AddressSelector 
              onChange={handleAddressChange}
            />
            
            <div className="mt-4">
              <input
                className="border border-gray-300 rounded-md py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                type="text"
                placeholder="Địa chỉ chi tiết (số nhà, tên đường)"
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          {/* Ghi chú */}
          <div className="mb-2">
            <h3 className="text-gray-700 font-medium mb-3">Ghi chú</h3>
            <textarea
              className="border border-gray-300 rounded-md py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
              name="note"
              value={formData.note}
              rows={3}
              onChange={onChangeHandler}
            ></textarea>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <label className="font-medium text-lg mb-4 block text-gray-800">Phương thức thanh toán</label>
          
          {/* Payment method options */}
          <div className="flex flex-col gap-3">
            {/* COD Option */}
            <div 
              onClick={() => setMethod('cod')} 
              className={`flex items-center gap-3 p-3 px-4 cursor-pointer border rounded-lg transition-all ${method === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-green-500' : 'border-gray-300'}`}>
                {method === 'cod' && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
              </div>
              <p className="text-gray-700 font-medium">THANH TOÁN KHI NHẬN HÀNG</p>
            </div>

            {/* Vietcombank Option */}
            <div 
              onClick={() => setMethod('vietcombank')} 
              className={`flex items-center gap-3 p-3 px-4 cursor-pointer border rounded-lg transition-all ${method === 'vietcombank' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'vietcombank' ? 'border-green-500' : 'border-gray-300'}`}>
                {method === 'vietcombank' && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
              </div>
              <div className="flex items-center">
                <img className="h-8 mr-3" src={bankLogos.vietcombank} alt="Vietcombank" />
                <span className="font-medium text-gray-700">Vietcombank</span>
              </div>
            </div>
            
            {/* Vietinbank Option */}
            <div 
              onClick={() => setMethod('vietinbank')} 
              className={`flex items-center gap-3 p-3 px-4 cursor-pointer border rounded-lg transition-all ${method === 'vietinbank' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'vietinbank' ? 'border-green-500' : 'border-gray-300'}`}>
                {method === 'vietinbank' && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
              </div>
              <div className="flex items-center">
                <img className="h-8 mr-3" src={bankLogos.vietinbank} alt="Vietinbank" />
                <span className="font-medium text-gray-700">Vietinbank</span>
              </div>
            </div>

            {/* Techcombank Option */}
            <div 
              onClick={() => setMethod('techcombank')} 
              className={`flex items-center gap-3 p-3 px-4 cursor-pointer border rounded-lg transition-all ${method === 'techcombank' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'techcombank' ? 'border-green-500' : 'border-gray-300'}`}>
                {method === 'techcombank' && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
              </div>
              <div className="flex items-center">
                <img className="h-8 mr-3" src={bankLogos.techcombank} alt="Techcombank" />
                <span className="font-medium text-gray-700">Techcombank</span>
              </div>
            </div>
            
            {/* MoMo Option */}
            <div 
              onClick={() => setMethod('momo')} 
              className={`flex items-center gap-3 p-3 px-4 cursor-pointer border rounded-lg transition-all ${method === 'momo' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'momo' ? 'border-green-500' : 'border-gray-300'}`}>
                {method === 'momo' && <div className="w-3 h-3 bg-green-500 rounded-full"></div>}
              </div>
              <div className="flex items-center">
                <img className="h-8 mr-3" src={bankLogos.momo} alt="MoMo" />
                <span className="font-medium text-gray-700">Ví MoMo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tổng tiền và nút đặt hàng */}
      <div className="w-full lg:w-2/5">
        <div className="sticky top-6">
          <CartTotal />
          <div className="w-full mt-6">
            <button 
              onClick={handlePlaceOrder} 
              disabled={orderPlaced}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md py-3.5 text-lg uppercase tracking-wide transition-colors ${orderPlaced ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {orderPlaced ? 'Đang xử lý...' : 'Đặt hàng'}
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Bằng cách đặt hàng, bạn đồng ý với các Điều khoản dịch vụ và Chính sách bảo mật của chúng tôi
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
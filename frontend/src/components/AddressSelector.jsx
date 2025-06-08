import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressSelector = ({ onChange }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/?depth=2');
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    try {
      const response = await axios.get(`https://provinces.open-api.vn/api/district/${provinceCode}`);
      setDistricts(response.data);
      setWards([]);
      setSelectedDistrict('');
      setSelectedWard('');
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  };

  const handleDistrictChange = async (e) => {
    const districtCode = e.target.value;
    setSelectedDistrict(districtCode);
    try {
      const response = await axios.get(`https://provinces.open-api.vn/api/ward/${districtCode}`);
      setWards(response.data);
      setSelectedWard('');
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  const handleWardChange = (e) => {
    setSelectedWard(e.target.value);
  };

  useEffect(() => {
    onChange({
      province: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
    });
  }, [selectedProvince, selectedDistrict, selectedWard, onChange]);

  return (
    <div>
      <select value={selectedProvince} onChange={handleProvinceChange}>
        <option value="">Chọn tỉnh/thành phố</option>
        {provinces.map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>

      <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedProvince}>
        <option value="">Chọn quận/huyện</option>
        {districts.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
      </select>

      <select value={selectedWard} onChange={handleWardChange} disabled={!selectedDistrict}>
        <option value="">Chọn phường/xã</option>
        {wards.map((ward) => (
          <option key={ward.code} value={ward.code}>
            {ward.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressSelector;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size,setSize] =useState('')

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        // console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product data */}
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          {/* Product images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt=""
                className="w-[24%] cursor-pointer sm:w-full sm:mb-3 flex-shrink-0"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/* info product */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{productData.name}</h1>
          <div className="flex gap-1 mt-4 items-center">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_dull_icon} alt="" className="w-3" />
            <p className="pl-2">(86)</p>
          </div>
          <p className="font-medium text-3xl mt-5">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-[80%]">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-orange-500' : ''}`} key={index}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>Free shipping on all orders</p>
              <p>30 days easy returns</p>
              <p>Order before 2pm for same day dispatch</p>
            </div>
        </div>
      </div>
      {/*description & review section*/}
      <div className='mt-20'>
        <div className='flex'>
        <b className='border px-5 py-3 text-sm'>Description</b>
        <p className =' border px-5 py-3 text-sm'>review (86)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 text-sm text-gray-500'>
          <p >adasdadasdasdasdadada</p>
          <p>dafffffffffffffffffff</p>
        </div>
        {/* display related products */}
        <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>


         
        
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;

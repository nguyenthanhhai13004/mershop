/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Đảm bảo rằng bạn quét file HTML chính
    './src/**/*.{js,ts,jsx,tsx}', // Quét tất cả các file JS, TS, JSX, và TSX trong thư mục src
    './pages/**/*.{js,ts,jsx,tsx}', // Quét các file trong thư mục pages
    './components/**/*.{js,ts,jsx,tsx}', // Quét các file trong thư mục components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

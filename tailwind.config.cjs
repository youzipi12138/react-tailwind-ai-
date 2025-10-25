/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,ts,tsx}'], // 扫描 src 下所有文件
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      screens: {
        xs: '480px', //小手机
        ss: '620px', //大手机
        sm: '768px', //平板
        md: '1060px', //小屏电脑
        lg: '1200px', //大屏电脑
        xl: '1400px', //超大屏
      },
    },
  },
  plugins: [],
};

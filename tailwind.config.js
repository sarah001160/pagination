/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"], //這行的意思是 Tailwind CSS 會在 src 資料夾中的所有 HTML 和 JavaScript 檔案中，搜尋所有用到的 CSS 類名，並將這些類名保留在最終生成的 CSS 檔案中。
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
}

/* DaisyUI: https://daisyui.com/docs/install/ */
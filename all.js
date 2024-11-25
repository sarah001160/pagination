tailwind.config = {
  theme: {
    extend: {
      colors: {
        clifford: '#da373d',
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const { createApp } = Vue;
  const config = {
    data() {
      return {
        text: 'hello',
        array: [
          { name: '資料1' },
          { name: '資料2' },
          { name: '資料3' },
          { name: '資料4' },
          { name: '資料5' },
          { name: '資料6' },
          { name: '資料7' },
          { name: '資料8' }
        ],
        currentPage: 1, // 當前頁碼
        totalItems: 10, // 總共幾筆
        pageSize: 2, // 一頁幾筆
      }
    },
    methods: {
      next() {
        // 下一頁
        // 檢查 目前頁面<最後一頁
        // 才可+1
      },
      prev() {
        // 前一頁
        // 檢查目前頁面>0
        // 才可-1
      },
      getCurrentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        //是用來從當前頁面的 URL 查詢字串（query string）中獲取 page 參數的值。這通常用於在 URL 中傳遞某些信息（例如當前頁面號），並將其應用於 JavaScript 中。
        console.log(urlParams);
        return parseInt(urlParams.get('page') || 1, 10)
      },
      updatePage(pageNum) {
        const totalPages = Math.ceil(this.array.length) / this.pageSize;
        const smaller = Math.max(1, Math.min(pageNum, totalPages)); //確保頁碼是有效的(不得負數或小數點)
        console.log(smaller);
      }
    },
    mounted() {
      console.log(this.text);
      this.getCurrentPage();
      this.updatePage(2);
    }
  }

  createApp(config).mount('#vueApp')
})
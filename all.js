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
        currentPage: 1, // 
        totalItems: 0, // Total number of items (length of the array)
        sizePerPage: 2, // 一頁幾筆
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.totalItems / this.sizePerPage); // 總共頁數 = 全部項目 / 每頁筆數
      },
      paginatedItems() {
        // 始頁項目 index、終頁項目 index 確認目前位置
        const startIndex = (this.currentPage - 1) * this.sizePerPage;
        const endIndex = startIndex + this.sizePerPage;
        return this.array.slice(startIndex, endIndex);
      }
    },
    methods: {
      // 下一頁
      next() {
        // Move to the next page if it's not the last page
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.updatePageInUrl();
        }
      },
      // 上一頁
      prev() {
        // Move to the previous page if it's not the first page
        if (this.currentPage > 1) {
          this.currentPage--;
          this.updatePageInUrl();
        }
      },
      // 取得現在頁碼
      getCurrentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('page') || 1, 10); // Default to page 1 if not present
      },
      // 更新頁面
      updatePage(pageNum) {
        const totalPages = this.totalPages;
        this.currentPage = Math.max(1, Math.min(pageNum, totalPages)); // 確保頁數數字在範圍內(最小只能是 1)
        this.updatePageInUrl();
      },
      // 更新頁面 Url
      updatePageInUrl() {
        // Update the URL to reflect the current page number
        const urlParams = new URLSearchParams(window.location.search); // 將參數存在 url 用以判斷當前頁碼
        urlParams.set('page', this.currentPage);// 設定參數到 url (例如: page=1)
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);
        //pushState JS 用來更新瀏覽器歷史紀錄，在不重新加載頁面的情況下，改變瀏覽器的網址 url
        // {} 可加到歷史紀錄的狀態物件
        // '' title :頁面標題(這裡是空字串)，通常可用來修改頁面的<title>標籤，但是這邊他沒有變化，所以保持空字串
        //window.location.pathname 擷取當下的路徑 url 中域名之後的路徑
        //urlParams 是一個變數，他通常包刮一些查詢參數(例如 ?page=1&search=hello)      }
      },
      mounted() {
        this.totalItems = this.array.length;
        this.currentPage = this.getCurrentPage(); // Get the page from the URL on page load
        console.log(this.text);
        this.updatePage(this.currentPage); // Set the page correctly when the app is mounted
      }
    }
  }

  createApp(config).mount('#vueApp');
});

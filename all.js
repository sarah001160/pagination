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
        currentPage: 1, // Initial current page
        totalItems: this.array.length, // Total number of items (length of the array)
        pageSize: 2, // Number of items per page
      };
    },
    computed: {
      totalPages() {
        // Calculate total pages based on array length and pageSize
        return Math.ceil(this.totalItems / this.pageSize);
      },
      paginatedItems() {
        // Get the correct items for the current page
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.array.slice(startIndex, endIndex);
      }
    },
    methods: {
      next() {
        // Move to the next page if it's not the last page
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.updatePageInUrl();
        }
      },
      prev() {
        // Move to the previous page if it's not the first page
        if (this.currentPage > 1) {
          this.currentPage--;
          this.updatePageInUrl();
        }
      },
      getCurrentPage() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('page') || 1, 10); // Default to page 1 if not present
      },
      updatePage(pageNum) {
        const totalPages = this.totalPages;
        this.currentPage = Math.max(1, Math.min(pageNum, totalPages)); // Ensure page number is within bounds
        this.updatePageInUrl();
      },
      updatePageInUrl() {
        // Update the URL to reflect the current page number
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', this.currentPage);
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);
      }
    },
    mounted() {
      this.currentPage = this.getCurrentPage(); // Get the page from the URL on page load
      console.log(this.text);
      this.updatePage(this.currentPage); // Set the page correctly when the app is mounted
    }
  };

  createApp(config).mount('#vueApp');
});

## 筆記

```
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>分頁示範</title>
  <style>
    .page-content {
      display: none;
    }
    .active {
      display: block;
    }
    .pagination {
      margin-top: 20px;
    }
    .pagination button {
      padding: 10px;
      margin: 0 5px;
    }
  </style>
</head>
<body>
  <div id="content">
    <div class="page-content active" id="page-1">
      <h1>頁面 1</h1>
      <p>這是分頁 1 的內容。</p>
    </div>
    <div class="page-content" id="page-2">
      <h1>頁面 2</h1>
      <p>這是分頁 2 的內容。</p>
    </div>
    <div class="page-content" id="page-3">
      <h1>頁面 3</h1>
      <p>這是分頁 3 的內容。</p>
    </div>
  </div>

  <div class="pagination">
    <button id="prev-btn">上一頁</button>
    <button id="next-btn">下一頁</button>
  </div>

  <script>
    // 獲取當前分頁編號
    function getCurrentPage() {
      const urlParams = new URLSearchParams(window.location.search);
      return parseInt(urlParams.get('page') || '1', 10); // 預設為頁面 1
    }

    // 更新頁面顯示
    function updatePage(pageNumber) {
      const totalPages = 3;
      // 保證頁碼在合法範圍內
      pageNumber = Math.max(1, Math.min(pageNumber, totalPages));

      // 隱藏所有頁面
      const pages = document.querySelectorAll('.page-content');
      pages.forEach(page => page.classList.remove('active'));

      // 顯示當前頁面
      const currentPage = document.getElementById('page-' + pageNumber);
      currentPage.classList.add('active');

      // 更新瀏覽器的 URL，使用 history API
      history.pushState({ page: pageNumber }, '', '?page=' + pageNumber);
    }

    // 設定事件監聽
    document.getElementById('prev-btn').addEventListener('click', function() {
      const currentPage = getCurrentPage();
      updatePage(currentPage - 1);
    });

    document.getElementById('next-btn').addEventListener('click', function() {
      const currentPage = getCurrentPage();
      updatePage(currentPage + 1);
    });

    // 監聽瀏覽器的返回或前進操作
    window.addEventListener('popstate', function(event) {
      const page = event.state ? event.state.page : 1;
      updatePage(page);
    });

    // 頁面載入時根據 URL 初始化
    document.addEventListener('DOMContentLoaded', function() {
      const page = getCurrentPage();
      updatePage(page);
    });
  </script>
</body>
</html>
```

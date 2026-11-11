/* 台灣生存包 共用腳本：主題切換、核實日期過久標示。無依賴、不收集任何資料。
   主題初始化在每頁 <head> 的小段 script（避免閃白）；這裡只管點擊。
   試算頁（calc/）自帶同樣的切換處理，所以不載入本檔。 */
(function () {
  var b = document.getElementById('theme');
  if (b) b.addEventListener('click', function () {
    var d = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('theme', d ? 'dark' : 'light'); } catch (e) {}
  });
  var a = document.querySelector('[data-verified]');
  if (a) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(a.getAttribute('data-verified'));
    var lim = parseInt(a.getAttribute('data-reverify'), 10) || 180;
    var box = document.querySelector('.signals');
    if (m && box) {
      var n = Math.floor((Date.now() - Date.UTC(+m[1], +m[2] - 1, +m[3])) / 864e5);
      if (n > lim) {
        var s = document.createElement('span');
        s.className = 'badge warn';
        s.textContent = '核實已 ' + n + ' 天';
        s.title = '核實日期距今已久，法規與金額可能變動，請對照來源';
        box.appendChild(s);
      }
    }
  }
})();

document.addEventListener("DOMContentLoaded", function() {
  const exploreBtn = document.getElementById("exploreBtn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function() {
      window.location.href = "product page/Hoodies.html";
    });
  }

  const BtnShopSale = document.getElementById("BtnShopSale");
  if (BtnShopSale) {
    BtnShopSale.addEventListener("click", function() {
      window.location.href = "product page/GraphicTees.html";
    });
  }

  const BtnShopNow = document.getElementById("BtnShopNow");
  if(BtnShopNow) {
    BtnShopNow.addEventListener("click", function() {
        window.location.href = "product page/New.html";
    });
  }

  const BtnShop = document.getElementById("BtnShop");
  if(BtnShop) {
    BtnShop.addEventListener("click", function(){
        window.location.href = "product page/Sale.html";
    });
  }
});

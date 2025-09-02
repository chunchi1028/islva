import { Link } from "react-router-dom";

export default function ShopNavbar() {
  return (
    <header className="shop-header">
      <nav className="shop-nav">
        <Link to="/shop"> 首頁</Link>
        <Link to="/shop/new">最新商品</Link>
        <Link to="/shop/sale">促銷商品</Link>
        <Link to="/shop/collections">系列商品</Link>
      </nav>
    </header>
  );
}
import { Link } from "react-router-dom";

export default function ShopNavbar() {
  return (
    <header className="shop-header">
      <nav className="shop-nav">
        <Link to="/" className="logo" aria-label="Home">
          ISLVA
        </Link>
        <Link to="/shop">Home</Link>
        <Link to="/shop/new">New</Link>
        <Link to="/shop/sale">Sale</Link>
        <Link to="/shop/collections">Collections</Link>
      </nav>
    </header>
  );
}

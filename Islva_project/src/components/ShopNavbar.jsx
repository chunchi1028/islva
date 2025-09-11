import { Link } from "react-router-dom";

export default function ShopNavbar() {
  return (
    <header className="shop-header">
<div className="shop-bar">

        <Link to="/" className="logo" aria-label="Home">
          ISLVA
        </Link>
      <nav className="shop-nav">
        <ul>
          <li><Link to="/shop">Home</Link></li>
          <li><Link to="/shop/new">New</Link></li>
          <li><Link to="/shop/sale">Sale</Link></li>
          <li> <Link to="/shop/collections">Collections</Link></li>
        </ul>
      </nav>
      </div>
    </header>
  );
}

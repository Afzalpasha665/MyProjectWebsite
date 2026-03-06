# E-commerce Frontend

React + Vite frontend for the Spring Boot E-commerce backend.

## Run

1. **Backend**: Ensure Spring Boot is running at `http://localhost:9090`.
2. **Frontend**:
   ```bash
   npm install
   npm run dev
   ```
   App runs at **http://localhost:5175**.

## Backend contract (aligned with your APIs)

- **Register** `POST /api/user/register`: body `{ username, email, password, role: "CUSTOMER" }`. On success, redirects to login.
- **Login** `POST /api/auth/login`: body `{ username, password }`. Response can include `token`/`jwt`; frontend stores `username`, `role`, and token if present.
- **Products** `GET /api/products` or `GET /api/products?category=T-Shirts`: response `{ user?, products: [{ productid, name, price, description, images[], stock }] }`. Categories: T-Shirts, Shirts, Pants, Shoes, Accessories.
- **Add to cart** `POST /api/cart/add`: body `{ username, productid }`.
- **Cart** APIs use cart item `id`, `productid`, `quantity`; frontend supports product details when returned with each item. Product detail page uses product from listing (router state); add `GET /api/products/:id` if you want direct URL loads.

## Features

- **Auth**: Register, Login (JWT stored in `localStorage`), redirect to products after login.
- **Products**: List from `/api/products`, category filter, responsive grid, product cards with image, name, price, rating, Add to Cart.
- **Product detail**: Large image, title, description, price, size dropdown, quantity, Add to Cart, Buy Now.
- **Cart**: List from `/api/cart/items`, quantity update, remove, subtotal; cart count in navbar.
- **Navbar**: Logo, category links, cart icon with count, Login/Logout.

## Backend API usage

| Feature        | Method | Endpoint                    |
|----------------|--------|-----------------------------|
| Register       | POST   | `/api/user/register`        |
| Login          | POST   | `/api/auth/login`           |
| All products   | GET    | `/api/products`             |
| By category    | GET    | `/api/products?category=…`  |
| Product by ID  | GET    | `/api/products/:id`         |
| Add to cart    | POST   | `/api/cart/add`             |
| Cart items     | GET    | `/api/cart/items`           |
| Update item    | PUT    | `/api/cart/update`          |
| Delete item    | DELETE | `/api/cart/delete`          |
| Cart count     | GET    | `/api/cart/count`           |

If your backend does not have `GET /api/products/:id`, add it or pass product data via navigation state from the listing.

## Tech

- React 18, Vite, React Router, Axios.
- Responsive layout, CSS variables, modern UI (cards, shadows, hover).

# URL Shortener

A full-stack URL shortening web application built using **Node.js,
Express, MongoDB, and EJS**. Users can register, log in, generate short
URLs, and manage their links securely.

------------------------------------------------------------------------

## 🚀 Features

-   User Authentication (JWT + Cookies)
-   Secure login and signup system
-   Create short URLs from long URLs
-   User-specific URL dashboard
-   Instant redirection using short links
-   Server-Side Rendering using EJS

------------------------------------------------------------------------

## 🛠 Tech Stack

### Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT Authentication
-   Cookie-Parser
-   dotenv

### Frontend

-   EJS
-   HTML
-   CSS

------------------------------------------------------------------------

## 📁 Project Structure

    URL-Shortener/
    │
    ├── controller/
    ├── middleware/
    ├── model/
    ├── routes/
    ├── views/
    ├── public/
    ├── server.js
    ├── package.json
    └── .env

------------------------------------------------------------------------

## ⚙️ Installation & Setup

### 1. Clone the Repository

``` bash
git clone https://github.com/ysuovnii/URL-Shortener.git
cd URL-Shortener
```

### 2. Install Dependencies

``` bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the root directory:

    PORT=3000
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

### 4. Start the Server

``` bash
npm start
```

Server will run at:

    http://localhost:3000

------------------------------------------------------------------------

## 🔐 Authentication Routes

-   `GET /user/login`
-   `POST /user/login`
-   `GET /user/signup`
-   `POST /user/signup`
-   `GET /logout`

------------------------------------------------------------------------

## 🔗 URL Routes

-   `GET /` → Dashboard (Protected)
-   `POST /url/...` → Create and manage URLs
-   `GET /:id` → Redirect to original URL

------------------------------------------------------------------------

## 🧠 How It Works

1.  User registers or logs in.
2.  Authenticated user submits a long URL.
3.  Server generates a unique short ID.
4.  Short ID is stored in MongoDB.
5.  Visiting `/:id` redirects to the original URL.

------------------------------------------------------------------------

## 🛡 Security

-   JWT stored in HTTP-Only cookies
-   Route protection using middleware
-   Environment variables for sensitive data

------------------------------------------------------------------------

## 📌 Future Improvements

-   Click analytics
-   QR code generation
-   Custom short aliases
-   Expiration time for links
-   Rate limiting

------------------------------------------------------------------------

## 📄 License

MIT License

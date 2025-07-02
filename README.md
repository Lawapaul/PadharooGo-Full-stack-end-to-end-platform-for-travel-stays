## PadharooGo - Full Stack End to End Platform for Travel Stays
- A full-stack, end-to-end travel stays platform inspired by Airbnb. Padharoo Go lets users discover, list, and book unique accommodations around the world, with features like user authentication, reviews, cloud image uploads, and interactive maps.

---

## 🌟 Features
- **User Authentication** (Sign up, Login, Demo User)
- **List and Discover Stays** by category, location, or search
- **Leave and View Reviews** for listings
- **Cloud Image Uploads** (Cloudinary)
- **Interactive Maps** (Mapbox)
- **Responsive UI** with EJS and Bootstrap
- **Flash Messages** for user feedback
- **Session Management** and persistent login
- **Data Validation** (Joi)
- **RESTful Routing**

---

## 🛠️ Tech Stack & Packages Used

| Package                        | Role/Description                                   |
|-------------------------------|----------------------------------------------------|
| ![Express](https://img.shields.io/badge/Express.js-000?logo=express&logoColor=white) | Web server, routing, middleware                   |
| ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white) | MongoDB ODM, schema validation                    |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white) | Database for listings, users, reviews             |
| ![EJS](https://img.shields.io/badge/EJS-8C8C8C?logo=ejs&logoColor=white)             | Templating engine for dynamic HTML                |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?logo=bootstrap&logoColor=white) | Responsive UI                                    |
| ![Passport](https://img.shields.io/badge/Passport-34E27A?logo=passport&logoColor=white) | Authentication middleware                        |
| ![Joi](https://img.shields.io/badge/Joi-00A86B?logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMDBBOEZCIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDgtMy41OSA4LTggOHoiLz48L3N2Zz4=) | Data validation for forms                         |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=white) | Image hosting and transformation                 |
| ![Multer](https://img.shields.io/badge/Multer-FF6F00?logo=multer&logoColor=white)     | File upload middleware                            |
| ![Mapbox](https://img.shields.io/badge/Mapbox-4264FB?logo=mapbox&logoColor=white)     | Interactive maps for listings                     |
| ![dotenv](https://img.shields.io/badge/dotenv-8DD6F9?logo=dotenv&logoColor=white)     | Environment variable management                   |
| ![connect-mongo](https://img.shields.io/badge/connect--mongo-47A248?logo=mongodb&logoColor=white) | Session store in MongoDB                         |
| ![express-session](https://img.shields.io/badge/express--session-000?logo=express&logoColor=white) | Session management                               |
| ![connect-flash](https://img.shields.io/badge/connect--flash-FFCC00?logo=javascript&logoColor=white) | Flash messages                                   |
| ![method-override](https://img.shields.io/badge/method--override-000?logo=javascript&logoColor=white) | HTTP verb override for forms                     |
| ![nodemon](https://img.shields.io/badge/nodemon-76D04B?logo=nodemon&logoColor=white)  | Dev server auto-reload                           |
| ![ejs-mate](https://img.shields.io/badge/ejs--mate-8C8C8C?logo=ejs&logoColor=white)   | EJS layouts/partials support                     |
| ![passport-local](https://img.shields.io/badge/passport--local-34E27A?logo=passport&logoColor=white) | Local strategy for Passport                      |
| ![passport-local-mongoose](https://img.shields.io/badge/passport--local--mongoose-880000?logo=mongoose&logoColor=white) | User auth helpers                                |

---

## 🏗️ How Padharoo Go Works

### 1. **User Authentication**
- **Passport.js** and **passport-local-mongoose** handle user registration, login, and session management.
- **connect-flash** provides instant feedback (success/error messages).

### 2. **Listing Management**
- Users can create, edit, and delete listings.
- Listings include images (uploaded via **Multer** and stored on **Cloudinary**), location, price, category, and more.
- **Joi** validates all form data to ensure data integrity.

### 3. **Search & Filter**
- Users can search listings by location or filter by category.
- **Mapbox** displays interactive maps for each listing using geocoded coordinates.

### 4. **Reviews**
- Authenticated users can leave reviews (rating + comment) on listings.
- Reviews are stored in MongoDB and displayed on the listing page.

### 5. **Session & Security**
- **express-session** and **connect-mongo** store sessions securely in MongoDB.
- **dotenv** manages sensitive config (API keys, DB URIs).

### 6. **Templating & UI**
- **EJS** and **ejs-mate** render dynamic pages with layouts and partials.
- **Bootstrap** and **FontAwesome** provide a modern, responsive UI.

---

## 📦 Project Structure
- `/models` — Mongoose schemas for User, Listing, Review
- `/Controllers` — Route logic for listings, users, reviews
- `/routes` — Express route definitions
- `/views` — EJS templates for all pages
- `/public` — Static assets (CSS, JS)
- `/init` — Seed data for development

---

## 🧩 MVC Architecture Explained

Padharoo Go follows the **MVC (Model-View-Controller)** pattern, which organizes the codebase into three main components:

### 1. Model
- **Represents the data and business logic** of the app.
- Defines data structure, validation, and relationships (using Mongoose).
- Handles all database operations (CRUD) with MongoDB.
- **Example:** `models/listing.js` defines what a listing is and how it relates to reviews and users.

### 2. View
- **The user interface**—what users see and interact with.
- Renders data as HTML using EJS templates.
- **Example:** `views/listings/index.ejs` shows all listings, `views/listings/Individual.ejs` shows a single listing with reviews.

### 3. Controller
- **The middleman** between Model and View.
- Handles user requests, fetches/updates data via Models, and renders Views.
- **Example:** `Controllers/listing.js` processes form submissions, fetches listings, and renders the appropriate page.

### MongoDB
- **NoSQL database** that stores all persistent data (users, listings, reviews, etc.).
- Accessed via Mongoose models in the Model layer.

**How it works together:**
1. User interacts with the View (e.g., submits a form).
2. Controller receives the request, uses the Model to interact with MongoDB.
3. Controller sends data to the View to render the updated page.

| Layer      | Role/Responsibility                        | Example in Padharoo Go                |
|------------|--------------------------------------------|---------------------------------------|
| Model      | Data, business logic, DB interaction       | `models/listing.js`, `models/user.js` |
| View       | User interface, display data               | `views/listings/index.ejs`            |
| Controller | Handle requests, connect Model & View      | `Controllers/listing.js`              |
| Database   | Store all persistent data                  | MongoDB (via Mongoose)                |

---

## 🚀 Getting Started
1. Clone the repo
2. Install dependencies: `npm install`
3. Set up your `.env` file (see below)
4. Run the app: `npm start`

**.env example:**
```
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret
MAP_TOKEN=your_mapbox_token
DB_URL=your_mongodb_atlas_url
SESSION_SECRET=your_secret
```

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

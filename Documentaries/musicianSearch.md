/**
 * ================================
 * 🎯 SEARCH API GUIDE (Musician Search)
 * ================================
 *
 * ✅ This API allows searching musicians by:
 *    - 🎵 Genre
 *    - 🎸 Instrument
 *    - 🆔 Username
 *    - 🏙️ City
 *    - 🌟 Influence
 *
 * ================================
 * 📌 IMPLEMENTATION STEPS
 * ================================
 * 
 * 1️⃣ Ensure the `searchProfiles` function exists in `profileController.js`
 * 2️⃣ Register the `/api/profile/search` route in `profileRoutes.js`
 * 3️⃣ Restart the server after changes
 * 4️⃣ Test in Postman using the URIs below
 *
 * ================================
 * 🌐 API ENDPOINT (GET REQUEST)
 * ================================
 * 
 * Base URL:
 * http://localhost:5000/api/profile/search
 *
 * ================================
 * 🔎 SEARCH FILTERS & URIs
 * ================================
 *
 * 1️⃣ Search by Genre
 *    - URL: http://localhost:5000/api/profile/search?genre=rock
 *
 * 2️⃣ Search by Instrument
 *    - URL: http://localhost:5000/api/profile/search?instrument=guitar
 *
 * 3️⃣ Search by Username
 *    - URL: http://localhost:5000/api/profile/search?username=music_lover88
 *
 * 4️⃣ Search by City (Fix Applied)
 *    - URL: http://localhost:5000/api/profile/search?city=Toronto
 *
 * 5️⃣ Search by Influence (Fix Applied)
 *    - URL: http://localhost:5000/api/profile/search?influence=Blink-182
 *
 * ================================
 * 🔄 COMBINED SEARCH EXAMPLES
 * ================================
 * 
 * 1️⃣ Search by Instrument & City:
 *    - URL: http://localhost:5000/api/profile/search?instrument=guitar&city=Toronto
 *
 * 2️⃣ Search by City & Influence:
 *    - URL: http://localhost:5000/api/profile/search?city=Toronto&influence=Blink-182
 *
 * 3️⃣ Search by Multiple Filters:
 *    - URL: http://localhost:5000/api/profile/search?instrument=guitar&city=Toronto&influence=Blink-182
 *
 * ================================
 * 🛠 TROUBLESHOOTING
 * ================================
 * 
 * ❌ "404 Not Found" Error?
 *    - Check if `profileRoutes.js` has `/search` route:
 *        router.get("/search", authMiddleware, searchProfiles);
 *    - Ensure `profileRoutes.js` is registered in `server.js`:
 *        const profileRoutes = require("./routes/profileRoutes");
 *        app.use("/api/profile", profileRoutes);
 *    - Restart the server.
 *
 * ❌ "No Profiles Found" Message?
 *    - Ensure there are profiles in the database that match your query.
 *    - Try adding test profiles manually in MongoDB.
 *
 * ✅ Restart server after making changes:
 *    ctrl + c  (Stop the server)
 *    node server.js  (Restart the server)
 *    or use `nodemon server.js` if using nodemon.
 *
 * 🚀 API is now fully functional!
 */

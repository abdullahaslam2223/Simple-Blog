// App configuration
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// Database Connection String
const dbURI = 'mongodb://localhost:27017/BlogWebsite';

// Connecting to the Database
mongoose.connect(dbURI)
    .then(result => {
        app.listen(port, () => {
            console.log('Connected to database & Listening on port : ' + port);
        });
    })
    .catch(error => console.log('Cannot connected to the database'));

// Routes Configuration
const allControllers = require('./controllers/allControllers');

// Configuring default template view engine to ejs
app.set('view engine', 'ejs');

// Middlewares and static files, images
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Managing GET routes
app.get('/', allControllers.home_page);
app.get('/about', allControllers.about_page);
app.get('/write-blog', allControllers.write_blog_page);
app.get('/blogs/:id', allControllers.singleBlogDetails);

// Managing POST routes
app.post('/', allControllers.blogPOSTRequest);

// Managing DELETE routes
app.delete('/blogs/:id', allControllers.deleteSingleBlog);


// Managing not found pages
app.use(allControllers.page_404);
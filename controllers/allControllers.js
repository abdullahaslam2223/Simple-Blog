const express = require('express');
const Blog = require('../models/blog');

// Pages Routes
const home_page = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(blogs => {
            res.render('index', { blogs });
        })
        .catch(error => console.log(error));
}

const about_page = (req, res) => {
    res.render('about');
}

const write_blog_page = (req, res) => {
    res.render('write-blog');
}

const page_404 = (req, res) => {
    res.render('404');
}

const blogPOSTRequest = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect('/'))
        .catch(error => console.log(error));
}

const singleBlogDetails = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(blog => {
            res.render('details', { blog });
        })
        .catch(error => console.log(error));
}

const deleteSingleBlog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(resuslt => {
            res.json({ redirect: '/' });
        })
        .catch(error => console.log(error));
}

// Exporting functions
module.exports = {
    home_page,
    about_page,
    write_blog_page,
    page_404,
    blogPOSTRequest,
    singleBlogDetails,
    deleteSingleBlog
}
// Create web server
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { Comment } = require('../models/comment');

// Get all comments
router.get('/', async (req, res) => {
    const comments = await Comment.find()
        .populate('author', 'firstName lastName')
        .populate('post', 'title');
    res.send(comments);
});

// Get comment by id
router.get('/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id)
        .populate('author', 'firstName lastName')
        .populate('post', 'title');
    if (!comment) return res.status(404).send('Comment not found.');
    res.send(comment);
});

// Create new comment
router.post('/', [
    check('author', 'Author is required').not().isEmpty()])
const express = require('express');
const { body, validationResult } = require('express-validator');
const { Post, User, Like } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create post (requires authentication)
router.post('/', [
  body('content').notEmpty().withMessage('Content is required')
], authenticateToken, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { content } = req.body;
    const userId = req.user.id;

    const newPost = await Post.create({
      user_id: userId,
      content
    });

    res.status(201).json({
      message: 'Post created successfully',
      post_id: newPost.id
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get public feed (no authentication required)
router.get('/public', async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['created_at', 'DESC']],
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username']
      }]
    });

    const postsData = posts.map(post => ({
      id: post.id,
      user_id: post.user_id,
      content: post.content,
      created_at: post.created_at.toISOString(),
      user: post.user ? {
        id: post.user.id,
        name: post.user.name,
        username: post.user.username
      } : null
    }));

    res.json(postsData);
  } catch (error) {
    console.error('Get public feed error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get authenticated user's feed (includes like status)
router.get('/feed', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const posts = await Post.findAll({
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'username']
        },
        {
          model: Like,
          as: 'likes',
          attributes: ['user_id']
        }
      ]
    });

    const postsData = posts.map(post => {
      const isLiked = post.likes.some(like => like.user_id === userId);
      const likeCount = post.likes.length;
      
      return {
        id: post.id,
        user_id: post.user_id,
        content: post.content,
        created_at: post.created_at.toISOString(),
        like_count: likeCount,
        is_liked: isLiked,
        user: post.user ? {
          id: post.user.id,
          name: post.user.name,
          username: post.user.username
        } : null
      };
    });

    res.json(postsData);
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get posts by username (public)
router.get('/user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const posts = await Post.findAll({
      where: { user_id: user.id },
      order: [['created_at', 'DESC']],
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username']
      }]
    });

    const postsData = posts.map(post => ({
      id: post.id,
      user_id: post.user_id,
      content: post.content,
      created_at: post.created_at.toISOString(),
      user: post.user ? {
        id: post.user.id,
        name: post.user.name,
        username: post.user.username
      } : null
    }));

    res.json(postsData);
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single post (public)
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    
    const post = await Post.findByPk(postId, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'username']
      }]
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      id: post.id,
      user_id: post.user_id,
      content: post.content,
      created_at: post.created_at.toISOString(),
      user: post.user ? {
        id: post.user.id,
        name: post.user.name,
        username: post.user.username
      } : null
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Like/Unlike post (requires authentication)
router.post('/:postId/like', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const existingLike = await Like.findOne({
      where: { user_id: userId, post_id: postId }
    });

    if (existingLike) {
      // Unlike
      await existingLike.destroy();
      res.json({ message: 'Post unliked', liked: false });
    } else {
      // Like
      await Like.create({
        user_id: userId,
        post_id: postId
      });
      res.json({ message: 'Post liked', liked: true });
    }
  } catch (error) {
    console.error('Like/Unlike post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update post (only by post owner)
router.put('/:postId', [
  body('content').notEmpty().withMessage('Content is required')
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const post = await Post.findByPk(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    await post.update({ content });

    res.json({
      message: 'Post updated successfully',
      post_id: post.id
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete post (only by post owner)
router.delete('/:postId', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findByPk(postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.destroy();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router; 
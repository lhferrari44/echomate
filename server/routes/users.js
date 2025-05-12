
const express = require('express');
const router = express.Router();
// const UserController = require('../controllers/userController');
// const { auth } = require('../middleware/auth');

// Get user profile by username
router.get('/:username', (req, res) => {
  // This would call UserController.getUserProfile
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: 'user-id',
        username: req.params.username,
        avatar: 'https://i.pravatar.cc/150?img=1',
        bio: 'Digital nomad traversing the neon grid.',
        theme: 'neon',
        following: ['2', '3'],
        followers: ['2', '4', '5']
      }
    }
  });
});

// Get user echoes
router.get('/:username/echoes', (req, res) => {
  // This would call UserController.getUserEchoes
  res.status(200).json({
    success: true,
    data: {
      echoes: [
        {
          id: '1',
          content: 'Just discovered a hidden digital oasis in the metaverse!',
          creator: {
            id: 'user-id',
            username: req.params.username,
            avatar: 'https://i.pravatar.cc/150?img=1'
          },
          createdAt: new Date().toISOString(),
          reactions: { love: [], wow: [], laugh: [] },
          reEchoes: 0,
          replies: []
        }
      ]
    }
  });
});

// Update user profile
router.put('/profile', (req, res) => {
  // This would call UserController.updateProfile with auth middleware
  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: {
        id: 'user-id',
        username: req.body.username,
        bio: req.body.bio,
        theme: req.body.theme
      }
    }
  });
});

// Update user avatar
router.put('/avatar', (req, res) => {
  // This would call UserController.updateAvatar with auth middleware
  res.status(200).json({
    success: true,
    message: 'Avatar updated successfully',
    data: {
      avatar: 'https://i.pravatar.cc/150?img=1'
    }
  });
});

// Follow a user
router.post('/follow/:userId', (req, res) => {
  // This would call UserController.followUser with auth middleware
  res.status(200).json({
    success: true,
    message: 'User followed successfully'
  });
});

// Unfollow a user
router.post('/unfollow/:userId', (req, res) => {
  // This would call UserController.unfollowUser with auth middleware
  res.status(200).json({
    success: true,
    message: 'User unfollowed successfully'
  });
});

// Get user followers
router.get('/:username/followers', (req, res) => {
  // This would call UserController.getUserFollowers
  res.status(200).json({
    success: true,
    data: {
      followers: [
        {
          id: '2',
          username: 'cyber_punk',
          avatar: 'https://i.pravatar.cc/150?img=2'
        },
        {
          id: '4',
          username: 'digital_nomad',
          avatar: 'https://i.pravatar.cc/150?img=4'
        }
      ]
    }
  });
});

// Get users that a user is following
router.get('/:username/following', (req, res) => {
  // This would call UserController.getUserFollowing
  res.status(200).json({
    success: true,
    data: {
      following: [
        {
          id: '2',
          username: 'cyber_punk',
          avatar: 'https://i.pravatar.cc/150?img=2'
        },
        {
          id: '3',
          username: 'synth_wave',
          avatar: 'https://i.pravatar.cc/150?img=3'
        }
      ]
    }
  });
});

module.exports = router;

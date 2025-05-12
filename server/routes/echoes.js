
const express = require('express');
const router = express.Router();
// const EchoController = require('../controllers/echoController');
// const { auth } = require('../middleware/auth');

// Get all echoes (public feed)
router.get('/', (req, res) => {
  // This would call EchoController.getAllEchoes
  res.status(200).json({
    success: true,
    data: {
      echoes: [
        {
          id: '1',
          content: 'Just discovered a hidden digital oasis in the metaverse!',
          creator: {
            id: '1',
            username: 'neon_rider',
            avatar: 'https://i.pravatar.cc/150?img=1'
          },
          createdAt: new Date().toISOString(),
          reactions: {
            love: ['2', '3'],
            wow: ['4'],
            laugh: []
          },
          reEchoes: 5,
          replies: []
        },
        {
          id: '2',
          content: 'Hacked my smart home system to respond to synthwave beats.',
          creator: {
            id: '2',
            username: 'cyber_punk',
            avatar: 'https://i.pravatar.cc/150?img=2'
          },
          createdAt: new Date().toISOString(),
          reactions: {
            love: ['1'],
            wow: ['3', '5'],
            laugh: ['4']
          },
          reEchoes: 8,
          replies: []
        }
      ]
    }
  });
});

// Create a new echo
router.post('/', (req, res) => {
  // This would call EchoController.createEcho with auth middleware
  res.status(201).json({
    success: true,
    message: 'Echo created successfully',
    data: {
      echo: {
        id: 'new-echo-id',
        content: req.body.content,
        background: req.body.background,
        creator: {
          id: 'user-id',
          username: 'username',
          avatar: 'https://i.pravatar.cc/150?img=3'
        },
        createdAt: new Date().toISOString(),
        reactions: { love: [], wow: [], laugh: [] },
        reEchoes: 0,
        replies: []
      }
    }
  });
});

// Get a specific echo
router.get('/:id', (req, res) => {
  // This would call EchoController.getEcho
  res.status(200).json({
    success: true,
    data: {
      echo: {
        id: req.params.id,
        content: 'This is the echo content',
        creator: {
          id: '1',
          username: 'username',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        createdAt: new Date().toISOString(),
        reactions: { love: [], wow: [], laugh: [] },
        reEchoes: 0,
        replies: []
      }
    }
  });
});

// Update an echo
router.put('/:id', (req, res) => {
  // This would call EchoController.updateEcho with auth middleware
  res.status(200).json({
    success: true,
    message: 'Echo updated successfully',
    data: {
      echo: {
        id: req.params.id,
        content: req.body.content,
        background: req.body.background,
        updatedAt: new Date().toISOString()
      }
    }
  });
});

// Delete an echo
router.delete('/:id', (req, res) => {
  // This would call EchoController.deleteEcho with auth middleware
  res.status(200).json({
    success: true,
    message: 'Echo deleted successfully'
  });
});

// React to an echo
router.post('/:id/react', (req, res) => {
  // This would call EchoController.reactToEcho with auth middleware
  res.status(200).json({
    success: true,
    message: 'Reaction updated',
    data: {
      reaction: {
        echoId: req.params.id,
        type: req.body.type, // "love", "wow", "laugh"
        userId: 'user-id',
        added: true // or false if removed
      }
    }
  });
});

// Reply to an echo
router.post('/:id/reply', (req, res) => {
  // This would call EchoController.replyToEcho with auth middleware
  res.status(201).json({
    success: true,
    message: 'Reply added',
    data: {
      reply: {
        id: 'new-reply-id',
        content: req.body.content,
        creator: {
          id: 'user-id',
          username: 'username',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        createdAt: new Date().toISOString()
      }
    }
  });
});

module.exports = router;

const express = require('express');
const cors = require('cors');

const app = express();

// Allow all origins (for development)
app.use(cors());
app.use(express.json());

// Game state storage
let players = [];
let activeGames = [];

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Aztec HONK-PLONK Arena Online!', 
        players: players.length,
        games: activeGames.length
    });
});

// Player joins the game
app.post('/api/join', (req, res) => {
    const { name, wallet } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: 'Name required' });
    }
    
    const player = {
        id: Date.now(),
        name: name,
        wallet: wallet || 'anonymous',
        joinedAt: new Date(),
        score: 0
    };
    
    players.push(player);
    console.log(`Player joined: ${name}`);
    
    res.json({ success: true, player });
});

// Get all players
app.get('/api/players', (req, res) => {
    res.json({ players });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`HONK-PLONK game backend running on port ${PORT}`);
});

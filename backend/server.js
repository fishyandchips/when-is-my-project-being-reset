const { AccessError, InputError } = require('./error');

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://when-is-my-project-being-reset.vercel.app',
}));
app.use(express.json());

const catchErrors = fn => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message, });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message, });
    } else {
      console.log(err);
      res.status(500).send({ error: 'A system error ocurred', });
    }
  }
};

const fs = require('fs');
const path = require('path');
const dbPath = './database.json';

function loadDatabase() {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

function save(db) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Error saving database:', err);
  }
}

function getImageUrls(gymName, sectorIndex, filenames) {
  const frontendUrl = 'https://when-is-my-project-being-reset.vercel.app';
  return filenames.map(file => `${frontendUrl}/assets/${gymName}/sector${sectorIndex + 1}/${file}`);
}

app.get('/sectors/:gymName', catchErrors((req, res) => {
  const { gymName } = req.params;
  const db = loadDatabase();
  const gym = db.gyms[gymName];

  if (!gym) {
    throw new InputError(`Gym '${gymName}' not found.`);
  }

  const now = new Date();

  gym.sectors.forEach((sector, index) => {
    sector.images = getImageUrls(gymName, index, sector.imageFilenames || []);

    const lastReset = new Date(sector.lastReset);
    const daysSinceReset = (now - lastReset) / (1000 * 60 * 60 * 24);

    if (daysSinceReset >= 42) {
      lastReset.setUTCDate(lastReset.getUTCDate() + 42);
      sector.lastReset = lastReset.toISOString();
    }
  });

  save(db);

  return res.json({ sectors: gym.sectors });
}));

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

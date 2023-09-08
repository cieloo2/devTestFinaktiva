const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// MongoDB connection URL and database name
const mongoURI = process.env.MONGO_URI; // Set this to your MongoDB URI
const dbName = process.env.MONGO_DB; // Set this to your database name

// Function to connect to MongoDB
async function connectToMongo() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Middleware to log and save every event
    app.use(async (req, res, next) => {
      try {
        const collection = db.collection('logs'); // Set this to your desired collection name

        // Log the event
        const log = {
          timestamp: new Date().toISOString(),
          endpoint: req.originalUrl,
          method: req.method,
          request: req.body,
          response: null, // Initialize as null; we'll update it later
        };

        // Log the request
        console.log(JSON.stringify(log, null, 2));

        // Pass the request through to the next middleware/route
        res.on('finish', async () => {
          // Log the response
          log.response = {
            status: res.statusCode,
            body: res.locals.responseBody, // This should be set by your route handling logic
          };

          // Save the log in the MongoDB collection
          await collection.insertOne(log);
        });

        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Define your API endpoints here

    app.get('/query', async (req, res)=> {
        try {
            const collection = db.collection('logs'); // Set this to your collection name
    
            // Retrieve all documents from the collection
            const results = await collection.find({}).toArray();
    
            // Logging request/response with timestamp
            const log = {
              timestamp: new Date().toISOString(),
              endpoint: req.originalUrl,
              method: req.method,
              response: results,
            };
            console.log("1", JSON.stringify(log, null, 2));
    
            res.json(results);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    })
    app.get('/query/methods', async (req, res)=> {
        try {
            const collection = db.collection('logs'); // Set this to your collection name
    
            // Retrieve all documents from the collection
            console.log(req.body);
            const results = await collection.find(req.body).toArray();
    
            console.log("2",results);
    
            res.json(results);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    })
    app.get('/query/dates', async (req, res)=> {
        try {
            const collection = db.collection('logs'); // Set this to your collection name
    
            // Retrieve all documents from the collection
            const results = await collection.find(req.body).toArray();
    
            // Logging request/response with timestamp
            const log = {
              timestamp: new Date().toISOString(),
              endpoint: req.originalUrl,
              method: req.method,
              response: results,
            };
            console.log(JSON.stringify(log, null, 2));
    
            res.json(results);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
    })
  } finally {
    // Close the MongoDB connection when the app exits
    // client.close();
  }
}

// Start the server
connectToMongo()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

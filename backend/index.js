require('dotenv').config();
const cors = require('cors');
const express = require('express');
const dbConnection = require('./dbConnection');
const Reminders = require('./models/Reminders');

const app = express();
const PORT = process.env.PORT || 7000;

dbConnection();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CHECK IF APP IS RUNNING
app.get('/', (req, res) => {
	res.json('Express App is running again!');
});

/* CUSTOM API ENDPOINTS */

// CREATE - post method
app.post('/api/reminders/', async (req, res) => {
	try {
		const { title, details } = req.body;

		const data = await Reminders.create({ title, details });

		if (!data) {
			throw new Error('An error occured while creating this reminder.');
		}

		res.status(200).json(data);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'An error occured while creating this reminder.' });
	}
});

// GET ALL - get method
app.get('/api/reminders/', async (req, res) => {
	try {
		const data = await Reminders.find({});

		if (!data) {
			throw new Error('An error occured while fetching notes.');
		}

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: 'An error occured while fetching notes.' });
	}
});

// GET SINGLE BY ID - get method
app.get('/api/reminders/:id', async (req, res) => {
	try {
		const reminderId = req.params.id;

        const data = await Reminders.findById( reminderId );

        if (!data) {
			throw new Error('An error occured while fetching this single reminder.');
		}
        
        res.status(200).json(data);

    } catch ( error )
    {
        res
			.status(500)
			.json({ error: 'An error occured while fetching this single reminder.' });
    }
});

// UPDATE BY ID - put method

app.put('/api/reminders/:id', async (req, res) => {
	try {
        const reminderId = req.params.id;

        const { title, details } = req.body;

        const data = await Reminders.findByIdAndUpdate(reminderId, { title, details } )

        if (!data) {
			throw new Error('An error occured while updating this single reminder.');
        }
        
        res.status(200).json(data);

    } catch (error) {
        res
			.status(500)
			.json({ error: 'An error occured while updating this single reminder.' });
    }
});

// DELETE BY ID - delete method
app.delete('/api/reminders/:id', async (req, res) => {
	try {
        const reminderId = req.params.id;

        const data = await Reminders.findByIdAndDelete(reminderId )

        if (!data) {
			throw new Error('An error occured while deleting this single reminder.');
        }
        
        res.status(200).json(data);

    } catch (error) {
        res
			.status(500)
			.json({ error: 'An error occured while deleting this single reminder.'});
    }
});



/* LEAVE THESE 2 AT THE BOTTOM */

app.get('/*', (req, res) => {
	res.json('Ups! Page NOT found. 404 Error.');
});

app.listen(PORT, () => {
	console.log(`Server is running on Port: ${PORT}`);
});

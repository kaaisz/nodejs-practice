// read express library
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//set middleware to add function on node.js
//to read files as static file on "public" directory
app.use(express.static(__dirname + '/public'));
//to use JSON data by HTTP request
app.use(bodyParser.json());

//mongoose is library which uses mongoDB from Node.js
mongoose.connect('mongodb://localhost/mydb');

//define collection of mongoDB as model(to keep data type properly)
const Todo = mongoose.model('Todo',{
	text : String
});

//set each routing
app.get('/api/todos', (req, res) => {
	Todo.find()
		.then((todos) => {
			res.json(todos);
		})
		.catch((err) => {
			res.send(err);
		})
});

app.post('/api/todos', (req, res) => {
	const todo = req.body;
	Todo.create({
		text : todo.text,
	})
	.then((todo) => {
		res.json(todo);
	})
	.catch((err) => {
		res.send(err);
	});
});

app.delete('/api/todos/:todo_id', (req, res) => {
	Todo.remove({
		_id : req.params.todo_id
	})
	.then((todo) => {
		res.send(todo);
	})
	.catch((err) => {
		res.send(err);
	});
});
//each data error will return by JSON type


app.get('/', (req, res) => {
	res.sendfile('./public/index.html');
});

app.listen(3000, () => {
	console.log("Listening on port 3000.");
});

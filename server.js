const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
let nextId = 7;

function getNewId() {
  return nextId++;
}

let friends = [
  {
    id: 1,
    name: "Ben",
    age: 30,
    email: "ben@lambdaschool.com",
    src: "https://ca.slack-edge.com/T4JUEB3ME-UFF5LGHU4-g7bee85d2a28-512"
  },
  {
    id: 2,
    name: "Austen",
    age: 32,
    email: "austen@lambdaschool.com",
    src: "https://ca.slack-edge.com/T4JUEB3ME-U4KHSNE3D-fd940398bb80-512"
  },
  {
    id: 3,
    name: "Ryan",
    age: 35,
    email: "ryan@lambdaschool.com",
    src: "https://ca.slack-edge.com/T4JUEB3ME-U9GUU32CX-cc095cdcf0ed-512"
  },
  {
    id: 4,
    name: "Sean",
    age: 35,
    email: "sean@lambdaschool.com",
    src: "https://ca.slack-edge.com/T4JUEB3ME-UFF5LGHU4-g7bee85d2a28-512"
  },
  {
    id: 5,
    name: "Michelle",
    age: 67,
    email: "michelle@gmail.com",
    src: "https://ca.slack-edge.com/T4JUEB3ME-UFF5LGHU4-g7bee85d2a28-512"
  },
  {
    id: 6,
    name: "Luis",
    age: 47,
    email: "luis@lambdaschool.com",
    src: "https://ca.slack-edge.com/T4JUEB3ME-UFF5LGHU4-g7bee85d2a28-512"
  }
];

app.use(cors());
app.use(bodyParser.json());

app.get("/friends", (req, res) => {
  res.status(200).json(friends);
});

app.post("/friends", (req, res) => {
  const friend = {
    id: getNewId(),
    src: "https://ca.slack-edge.com/T4JUEB3ME-UFF5LGHU4-g7bee85d2a28-512",
    ...req.body
  };
  friends = [...friends, friend];
  res.status(201).json(friends);
});

app.get("/friends/:id", (req, res) => {
  const friend = friends.filter(
    friend => friend.id.toString() === req.params.id
  )[0];
  res.status(200).json(friend);
});

app.put("/friends/:id", (req, res) => {
  const { id } = req.params;
  let friendIndex = friends.findIndex(friend => friend.id == id);
  if (friendIndex >= 0) {
    friends[friendIndex] = { ...friends[friendIndex], ...req.body };
    res.status(200).json(friends);
  } else {
    res.status(404).json({ message: `The friend with id id does not exist.` });
  }
});

app.delete("/friends/:id", (req, res) => {
  friends = friends.filter(friend => friend.id != req.params.id);
  res.status(200).json(friends);
});

app.listen(5000, () => {
  console.log("server listening on port 5000");
});

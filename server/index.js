
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03515dfd03abcf1abbf9575a36c2e4b810df6638a794874817bdfd306bf8f40371": 100, //Alex
  "02aaf758b8e659f03baacca82823539fc5e246a7484b63a46775324fe1a13d0b7f": 50,  //Ben
  "03dd40a82547e807a8288e850b6ccde64a0873e931b1f9e59a92a989225a6e187d": 75,   //Mercy
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

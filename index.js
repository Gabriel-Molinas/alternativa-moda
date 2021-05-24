const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

const mercadopago = require('mercadopago');
mercadopago.configurations.setAccessToken("TEST-5943716770134767-051823-e503ad766685a6cfbfe9bd123f583e4b-761435917");

//mercadopago



// settings
app.set("port", process.env.PORT);

//  view
app.set("view engine", "ejs");

// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/checkout", function (req, res) {
  res.render("pages/checkout");
});

app.post("/process_payment", (req, res) => {

  var payment_data = {
    transaction_amount: Number(req.body.transactionAmount),
    token: req.body.token,
    description: req.body.description,
    installments: Number(req.body.installments),
    payment_method_id: req.body.paymentMethodId,
    issuer_id: req.body.issuerId,
    payer: {
      email: req.body.payer.email,
      identification: {
        type: req.body.payer.identification.docType,
        number: req.body.payer.identification.docNumber
      }
    }
  };

  mercadopago.payment.save(payment_data)
    .then(function(response) {
      res.status(response.status).json({
        status: response.body.status,
        message: response.body.status_detail,
        id: response.body.id
      });
    })
    .catch(function(error) {
      res.status(error.status).send(error);
    });
});
// Public
app.use(express.static(__dirname + "/public"));



// listening the app
app.listen(app.get("port"), () => {
  console.log("app on port", app.get("port"));
  console.log(process.env.GABRIEL);
});

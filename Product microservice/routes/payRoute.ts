import { Express, Request, Response } from 'express';
import coinbase, { CreateCharge } from 'coinbase-commerce-node';
import logger from '../utils/logger';
const fetch = require('node-fetch');

export default function PayRoute(app: Express) {
  const Charge = coinbase.resources.Charge;
  app.post('/charge', (req, res) => {
    let chargeData: CreateCharge = {
      name: req.body.name,
      description: req.body.decription,
      local_price: { amount: req.body.amount, currency: 'USD' },
      pricing_type: 'fixed_price',
    };
    Charge.create(chargeData, (err, response) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ message: err.message });
      } else {
        logger.info(response);
        res.status(200).send(response);
      }
    });
  });
  app.post('/status', (req, res) => {
    // logger.info('status');
    let id = req.body.id;
    Charge.retrieve(id, (err, charge) => {
      if (charge['timeline'][0]['status'] == 'NEW') {
        try {
          if (
            charge['timeline'][1]['status'] == 'PENDING' &&
            charge['timeline'].length == 2
          ) {
            return res
              .status(200)
              .send({ message: 'Payment pending, awaiting confirmations.' });
          } else if (charge['timeline'][1]['status'] == 'EXPIRED') {
            return res.status(400).send({ message: 'Payment expired' });
          } else if (charge['timeline'][2]['status'] == 'COMPLETED') {
            return res.status(200).send({ message: 'Payment completed.' });
          }
        } catch (err) {
          return res.status(200).send({ message: 'No payment detected' });
        }
      } else {
        return res.status(400).send({ message: 'Charge not found.' });
      }
    });
  });
  app.get('/charges/:id', (req, res) => {
    const id = req.params.id;
    fetch('https://api.commerce.coinbase.com/charges/' + id)
      .then((resp: any) => resp.json())
      .then((json: any) => {
        logger.info(json);
        res.status(200).send(json);
      })
      .catch((err: any) => res.status(400).send(err));
  });
  app.post('/resolve/:id', (req, res) => {
    const id = req.params.id;

    const url = 'https://api.commerce.coinbase.com/charges/' + id + '/resolve';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'X-CC-Version': '2018-03-22',
        'X-CC-Api-Key': process.env.API_KEY,
      },
    };

    fetch(url, options)
      .then((resp: any) => resp.json())
      .then((json: any) => {
        logger.info(json);
        res.status(200).send(json);
      })
      .catch((err: any) => res.status(400).send(err)); //unauthorized
  });
}

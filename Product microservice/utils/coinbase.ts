import coinbase from 'coinbase-commerce-node';
require('dotenv').config();

const api_key: string = process.env.API_KEY || '';
let Client = coinbase.Client;

export function init() {
  Client.init(api_key);
  const Charge = coinbase.resources.Charge;
}

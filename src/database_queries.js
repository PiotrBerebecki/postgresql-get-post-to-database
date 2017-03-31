const dbConnection = require('./database_connection');
const pipe = require('./helpers');


const query = {};


const getSqlQuery = (url) => {
  const sqlQueries = {
    bestsellers:      `SELECT products.name, COUNT(basket.product_id) AS times_ordered FROM products
                       INNER JOIN basket ON products.id = basket.product_id
                       GROUP BY products.name
                       ORDER BY times_ordered DESC;`,

    customersbyspend: `SELECT customers.firstname || ' ' || customers.surname AS name, SUM(products.price) AS total_spend FROM customers
                       INNER JOIN orders ON customers.id = orders.customer_id
                       INNER JOIN basket ON basket.order_id = orders.id
                       INNER JOIN products  ON products.id = basket.product_id
                       GROUP BY customers.firstname, customers.surname;`,

    salesthisyear:    `SELECT SUM(products.price) as revenue_this_year FROM customers
                       INNER JOIN orders ON customers.id = orders.customer_id
                       INNER JOIN basket ON basket.order_id = orders.id
                       INNER JOIN products ON products.id = basket.product_id
                       WHERE orders.date >= '01-01-${new Date().getFullYear()}';`,

    salestodate:      `SELECT SUM(price) AS revenue_overall FROM products
                       INNER JOIN basket ON products.id = basket.product_id;`
  };

  return sqlQueries[url];
};


const getQueryFromUrl = (url) => url.split('/')[2];


query.getData = (url, handlerCallback) => {

  const sqlQuery = pipe(getQueryFromUrl, getSqlQuery)(url);

  if (!sqlQuery) {
    handlerCallback('Query not found');
    return;
  }

  dbConnection.query(sqlQuery, (err, res) => {
    if (err) {
      handlerCallback(err);
    } else {
      handlerCallback(null, res);
    }
  });
};


module.exports = query;

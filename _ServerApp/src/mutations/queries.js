const {CUSTOMERS_FIELDS, ORDERS_FIELDS, PRODUCTS_FIELDS, INVENTORY_ITEMS_FIELDS} = require('./constants');


/**
 *
 * @param {*} modelQuery
 * @return {*}
 */
const mutationOfModel = (modelQuery) => {
	return JSON.stringify({
		query: `mutation {
    bulkOperationRunQuery(
     query: """
        ${modelQuery}
     """
     ) {
       bulkOperation {
         id
         status
       }
       userErrors {
         field
         message
       }
     }
   }`,
	});
};

/**
 *
 * @param {*} filterQuery
 * @return {*}
 */
const customerQuery = (filterQuery = null) => `{ customer (id: "${filterQuery}") ${CUSTOMERS_FIELDS} }`;
/**
 *
 * @param {*} filterQuery
 * @return {*}
 */
const orderQuery = (filterQuery = null) => `{ order (id: "${filterQuery}") ${ORDERS_FIELDS} }`;

/**
 *
 * @param {*} filterQuery
 * @param {*} key
 * @param {*} rootName
 * @return {*}
 */
const productQuery = (filterQuery = null) => `{ product (id: "${filterQuery}") ${PRODUCTS_FIELDS}  }`;

/**
 *
 * @param {*} filterQuery
 * @param {*} key
 * @param {*} rootName
 * @return {*}
 */
const inventoryItemsQuery = (filterQuery = null) =>
	`{ inventoryItems (id: "${filterQuery}") ${INVENTORY_ITEMS_FIELDS}  }`;


/**
 *
 * @param {String} filterQuery
 * @return {Object}
 */
const inventoryItemsMutation = (filterQuery = null) => {
	return mutationOfModel(
		`{
      inventoryItems ${filterQuery ? ` (query: "${filterQuery}")` : ''}{
        edges {
          node  ${INVENTORY_ITEMS_FIELDS}
        }
      }
    }`
	);
};

/**
 *
 * @param {String} filterQuery
 * @return {Object}
 */
const ordersMutation = (filterQuery = null) => {
	return mutationOfModel(
		`{
      orders ${filterQuery ? ` (query: "${filterQuery}")` : ''}{
        edges {
          node  ${ORDERS_FIELDS}
        }
      }
    }`
	);
};

/**
 *
 * @param {String} filterQuery
 * @return {Object}
 */
const customersMutation = (filterQuery = null) => {
	return mutationOfModel(
		`{
      customers ${filterQuery ? ` (query: "${filterQuery}")` : ''}{
        edges {
          node ${CUSTOMERS_FIELDS}
        }
      }
    }`
	);
};

/**
 *
 * @param {Strig} filterQuery
 * @return {Object}
 */
const productsMutation = (filterQuery = null) => {
	return mutationOfModel(
		`{
      products ${filterQuery ? ` (query: "${filterQuery}")` : ''}{
       edges {
        node ${PRODUCTS_FIELDS}
      }
    }
  }`
	);
};

export {
	productsMutation,
	customersMutation,
	ordersMutation,
	productQuery,
	orderQuery,
	customerQuery,
	inventoryItemsQuery,
	inventoryItemsMutation,
};

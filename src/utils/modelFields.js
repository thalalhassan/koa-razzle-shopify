// import { getModelFields } from 'helper';

const getLabel = (stringValue) => {
  const seperatedString = stringValue
    .replace(/\./g, ' ')
    .replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, ' $1');
  // .replace(/^./, (str) => str.toUpperCase());
  return seperatedString.toUpperCase();
};

const getModelFields = (fields) => {
  const dataArray = [];
  fields.forEach((fieldData) => {
    const { key, type, parentTable, label } = fieldData;
    const fieldObject = {
      key,
      type: type || 'text',
      name: key,
      label: label || getLabel(key),
      isChecked: false,
      parentTable,
    };
    if (key === 'image') {
      fieldObject.type = 'image';
      fieldObject.width = '150px';
    }
    dataArray.push(fieldObject);
  });
  return dataArray;
};

export const columnFields = {
  salesByProducts: [
    {
      label: 'LineItems',
      name: 'lineItems',
      fields: getModelFields([
        { key: 'title' },
        { key: 'variantTitle' },
        { key: 'name' },
        { key: 'quantity', type: 'number' },
        { key: 'sku' },
        { key: 'vendor' },
        { key: 'shopifyId' },
        {
          type: 'set',
          key: 'discountedTotalSet',
        },
      ]),
    },
    // {
    //   label: 'Products',
    //   name: 'products',
    //   fields: getModelFields([
    //     { key: 'image' },
    //     { key: 'title' },
    //     { key: 'vendor' },
    //     { key: 'publishedAt' },
    //   ]),
    // },
    // {
    //   label: 'Variants',
    //   name: 'variants',
    //   fields: getModelFields([{ key: 'inventoryQuantity' }, { key: 'price' }]),
    // },
    {
      label: 'Orders',
      name: 'orders',
      fields: getModelFields([
        { key: 'totalDiscountsSet', type: 'set' },
        { key: 'totalRefundedSet', type: 'set' },
        { key: 'totalReceivedSet', type: 'set' },
        { key: 'displayFinancialStatus', label: 'FINANCIAL STATUS' },
      ]),
    },
  ],
};

export const defaultSelectedFields = {
  salesByProducts: getModelFields([
    {
      key: 'title',
      parentTable: 'lineItems',
    },
    {
      key: 'variantTitle',
      parentTable: 'lineItems',
    },
    {
      type: 'number',
      key: 'quantity',
      parentTable: 'lineItems',
    },

    {
      key: 'vendor',
      parentTable: 'lineItems',
    },
    {
      parentTable: 'orders',
      key: 'displayFinancialStatus',
      label: 'FINANCIAL STATUS',
    },
    {
      parentTable: 'orders',
      type: 'set',
      key: 'totalReceivedSet',
    },
    {
      type: 'set',
      parentTable: 'orders',
      key: 'totalRefundedSet',
    },
    {
      type: 'set',
      key: 'discountedTotalSet',
      parentTable: 'lineItems',
    },
    {
      key: 'sku',
      parentTable: 'lineItems',
    },
  ]),
};

export const BASETABLES = [{ value: 'product', label: 'Product' }];

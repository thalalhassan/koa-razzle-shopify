const MAILING_ADDRESS = `{
  address1
  address2
  city
  company
  country
  countryCodeV2
  firstName
  formatted
  formattedArea
  id
  lastName
  latitude
  longitude
  name
  phone
  province
  provinceCode
  zip              
}`;

const ATTRIBUTES = `{
  key
  value
}`;

const MONEYBAG = `{
     shopMoney {
       amount,
       currencyCode 
     },
     presentmentMoney {
       amount,
       currencyCode 
     }
}`;

const MONEYV2 = `{
  amount
  currencyCode
}`;

const TAXLINE = `{
priceSet ${MONEYBAG}
rate
ratePercentage
title
}`;

const FULFILMENTSERVICE = `{
  callbackUrl
  fulfillmentOrdersOptIn
  handle
  id
  inventoryManagement
  location {
   id
  }
  productBased
  serviceName
  shippingMethods {
    code
    label
  }
  type
  }`;

const LOCATION_ADDRESS = `{
address1
address2
city
country
countryCode
formatted
latitude
longitude
provinceCode
zip	
}`;

const LOCATION = `{
activatable
address ${LOCATION_ADDRESS}
addressVerified
deactivatable
deactivatedAt
deletable
fulfillmentService ${FULFILMENTSERVICE}
fulfillsOnlineOrders
hasActiveInventory
hasUnfulfilledOrders
id
isActive
legacyResourceId
name
shipsInventory
suggestedAddresses {
  address1
  address2
  city
  country
  countryCode
  formatted
  provinceCode
  zip	
  }
}`;
// inventoryLevel ${INVENTORYLEVEL}

const INVENTORYLEVEL = `{
  edges {
    node {
      available
      canDeactivate
      createdAt
      deactivationAlert
      deactivationAlertHtml
      id
      location ${LOCATION}
      updatedAt
    }
  }
}`;

const FULFILLMENTS = `{
  createdAt
  deliveredAt
  displayStatus
  estimatedDeliveryAt
  inTransitAt
  legacyResourceId
  location ${LOCATION}
  name
  order {
    id
  }
  service {
    callbackUrl 
    fulfillmentOrdersOptIn
    handle
    id
    inventoryManagement
    location ${LOCATION}
    productBased
    serviceName
    shippingMethods {
      code,
      label
    }
    type
  }
  status
  totalQuantity
  updatedAt
  id
}`;

const LINEITEMS = `{
  edges {
    node {
      customAttributes {
        key
        value
      }
      discountedTotalSet ${MONEYBAG}
      discountedUnitPriceSet ${MONEYBAG}
      fulfillmentStatus
      name
      nonFulfillableQuantity
      originalTotalSet ${MONEYBAG}
      originalUnitPriceSet ${MONEYBAG}
      quantity
      refundableQuantity
      restockable
      sku
      taxable
      title
      totalDiscountSet ${MONEYBAG}
      unfulfilledDiscountedTotalSet ${MONEYBAG}
      unfulfilledOriginalTotalSet ${MONEYBAG}
      unfulfilledQuantity
      variantTitle
      vendor
      id
      product {
        id
      }
      variant {
        id
      }
    }
  }
}`;

const SHIPPINGLINE = `{
  carrierIdentifier
  code
  custom
  deliveryCategory
  discountAllocations {
    allocatedAmountSet ${MONEYBAG}
  }
  discountedPriceSet ${MONEYBAG}
  originalPriceSet ${MONEYBAG}
  phone
  requestedFulfillmentService {
    id
  }
  shippingRateHandle
  source
  taxLines ${TAXLINE}
  title
  id
}`;

const TRANSACTIONS = `{
  id
  authorizationCode
  createdAt
  errorCode
  formattedGateway
  gateway
  kind
  manuallyCapturable
  maximumRefundableV2 {
    amount
    currencyCode
  }
  processedAt
  status
  totalUnsettledSet ${MONEYBAG}
}`;

const REFUNDS = `{
  id
  createdAt
  duties {
    amountSet ${MONEYBAG},
    originalDuty {
      id
    }
  }
  legacyResourceId
  note
  totalRefundedSet ${MONEYBAG}
  updatedAt
  }`;

const CUSTOMERS_FIELDS = `{
addresses ${MAILING_ADDRESS}
averageOrderAmountV2 ${MONEYV2}
canDelete
createdAt
defaultAddress ${MAILING_ADDRESS}
displayName
email
firstName
hasNote
hasTimelineComment
image {
  id
  originalSrc 
}
lastName
lastOrder {
  id
}
legacyResourceId
lifetimeDuration
locale
note
ordersCount
phone
state
tags
taxExempt
taxExemptions
totalSpent
totalSpentV2 ${MONEYV2}
updatedAt
validEmailAddress
verifiedEmail
id
}`;

const CUSTOMER_JOURNEY_SUMMARY = `{
customerOrderIndex	
daysToConversion	
firstVisit {
    id
    landingPage 
    occurredAt 
    referralCode 
    referrerUrl 
    source 
}
lastVisit {
    id
    landingPage 
    occurredAt 
    referralCode 
    referrerUrl 
    source 
}
momentsCount	
ready
}`;

const INVENTORY_ITEMS_FIELDS = `{
countryCodeOfOrigin
createdAt
duplicateSkuCount
harmonizedSystemCode
id
inventoryHistoryUrl
legacyResourceId
locationsCount
provinceCodeOfOrigin
requiresShipping
tracked
sku
updatedAt 
unitCost ${MONEYV2}
variant {
  inventoryQuantity 
  price 
  id
}
inventoryLevels ${INVENTORYLEVEL}
}`;

const ORDERS_FIELDS = `{
billingAddressMatchesShippingAddress
canMarkAsPaid
canNotifyCustomer
cancelReason
cancelledAt
capturable
cartDiscountAmountSet ${MONEYBAG}
customerJourneySummary ${CUSTOMER_JOURNEY_SUMMARY}
clientIp
closed
closedAt
confirmed
createdAt
currencyCode
currentTotalDutiesSet ${MONEYBAG}
customAttributes ${ATTRIBUTES}
customer {
  id
}
customerAcceptsMarketing
customerLocale
discountCode
displayAddress ${MAILING_ADDRESS}
displayFinancialStatus
displayFulfillmentStatus
disputes {
  id
  initiatedAs 
  status
}
edited
email
fulfillable
fullyPaid
hasTimelineComment
legacyResourceId
merchantEditable
name
netPaymentSet ${MONEYBAG}
note
originalTotalDutiesSet ${MONEYBAG}
originalTotalPriceSet ${MONEYBAG}
paymentCollectionDetails {
  additionalPaymentCollectionUrl 
}
paymentGatewayNames
phone
presentmentCurrencyCode
processedAt
publication{
  id,
  name,
}
refundDiscrepancySet ${MONEYBAG}
refundable
requiresShipping
restockable
riskLevel
risks {
  display
  level
  message
}
shippingAddress ${MAILING_ADDRESS}
subtotalLineItemsQuantity
subtotalPriceSet ${MONEYBAG}
tags
taxLines ${TAXLINE}
taxesIncluded
test
totalCapturableSet ${MONEYBAG}
totalDiscountsSet ${MONEYBAG}
totalOutstandingSet ${MONEYBAG}
totalPriceSet ${MONEYBAG}
totalReceivedSet ${MONEYBAG}
totalRefundedSet ${MONEYBAG}
totalRefundedShippingSet ${MONEYBAG}
totalShippingPriceSet ${MONEYBAG}
totalTaxSet ${MONEYBAG}
totalTipReceived ${MONEYV2}
totalWeight
unpaid
updatedAt
lineItems (first:100)${LINEITEMS}
refunds (first:100)${REFUNDS}
transactions (first:100)${TRANSACTIONS}
fulfillments (first:100)${FULFILLMENTS}
billingAddress ${MAILING_ADDRESS}
shippingLine ${SHIPPINGLINE}
physicalLocation ${LOCATION}
id
}`;

const PRODUCTS_FIELDS = `
{
id,
title,
images(first:50) {
    edges {
        node {
            id,
            originalSrc 
        }
    }
},
variants(first:50) {
    edges {
        node {
            compareAtPrice,
            inventoryQuantity,
            position,
            availableForSale,
            barcode,
            sku,
            title,
            id,
            price,
            createdAt,
            updatedAt,
              image {
                originalSrc,
                transformedSrc 
            },
            inventoryItem {
                id,
                unitCost ${MONEYV2},
                variant {
                  id
                },
            },
        }
    }
},
vendor,
productType,
handle,
tags,
createdAt,
updatedAt,
publishedAt,
}
`;

export {CUSTOMERS_FIELDS, ORDERS_FIELDS, PRODUCTS_FIELDS, INVENTORY_ITEMS_FIELDS};

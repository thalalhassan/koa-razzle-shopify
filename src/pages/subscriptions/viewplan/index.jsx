import React from 'react';
import Styles from './viewplan.module.scss';
import Button from '../../../components/button';
import Normaltable from '../../../components/normaltable';

export default function Viewplan() {
  return (
    <div className={Styles.container}>
      <h3>Subscription</h3>
      <div className={Styles.sectone}>
        <div className={Styles.row}>
          <div className={Styles.leftsect}>
            <h4>Current Subscription</h4>
            <h5>Professional</h5>
            <h6>Unlimited stores & users, Great for individuals & teams</h6>
            <p>Next Payment: $ 45.56 on Jan 1,2021</p>
          </div>
          <div className={Styles.rightsect}>
            <div className={Styles.btn}>
              <Button color="greyish">Cancel Subscription</Button>
            </div>
            <div className={Styles.btn}>
              <Button link to="/subscriptions/viewplan">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </div>
        <div className={Styles.row}>
          <div className={Styles.leftsect}>
            <div className={Styles.carddetails}>
              <h4>Payment method</h4>
              <div className={Styles.carddsect}>
                <img src="/public/images/cardimg.svg" alt="card" />
                <span className={Styles.cardnumbers}>*** 8256</span>
              </div>
            </div>
          </div>
          <div className={Styles.rightsect}>
            <div className={Styles.btn}>
              <Button color="secondary">Remove</Button>
            </div>
            <div className={Styles.btn}>
              <Button color="greyish" link to="/subscriptions/viewplan">
                Change Card
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.secttwo}>
        <h3>Billing History</h3>
        <Normaltable
          data={[
            {
              date: '2019.06.10  11:06 UTC',
              type: 'Pro subscription (1 year)',
              transactionid: '8fgds61a54643',
              price: '$ 45.56',
            },
            {
              date: '2019.06.10  11:06 UTC',
              type: 'Pro subscription (1 year)',
              transactionid: '8fgds61a54643',
              price: '$ 45.56',
            },
            {
              date: '2019.06.10  11:06 UTC',
              type: 'Pro subscription (1 year)',
              transactionid: '8fgds61a54643',
              price: '$ 45.56',
            },
          ]}
          headers={[
            {
              key: 'date',
              type: 'date',
              label: 'Date',
            },
            {
              key: 'type',
              type: 'text',
              label: 'Type',
            },
            {
              key: 'transactionid',
              type: 'text',
              label: 'Transaction id',
            },

            {
              key: 'price',
              type: 'text',
              label: 'Price',
            },
          ]}
        />
      </div>
    </div>
  );
}

import React from 'react';
import Styles from './support.module.scss';
import Supportbox from './components/supportbox';
import Supportaccordian from './components/supportaccodian';

function Support() {
  const supportdata = [
    {
      img: '/public/images/supporticon4.svg',
      title: 'Get Started',
      subtitle: 'Find troubleshooting articles',
      btntext: 'View Knowledge base',
      btnurl: 'https://support.acowebs.com/portal/en/home',
    },
    {
      img: '/public/images/supporticon3.svg',
      title: 'Documentation',
      subtitle: 'Get help using and administering products',
      btntext: 'View Documents',
      btnurl: 'https://support.acowebs.com/portal/en/home',
    },
    {
      img: '/public/images/supporticon2.svg',
      title: 'Customer Support',
      subtitle: 'Find troubleshooting articles',
      btntext: 'Contact us',
      btnurl: 'https://support.acowebs.com/portal/en/newticket',
    },
  ];

  const accordiandata = [
    {
      title: 'How can we reach support?',
      content:
        '<ul>'
        + '<li>You can always reach us using the chat option provided in this application, Our agents will answer your queries in live.</li>'
        + '<li>You can raise a new ticket through <a href="https://support.acowebs.com/portal/en/newticket">https://support.acowebs.com/portal/en/newticket</a> during our inactive hours.</li>'
        + '<li>Also you can reach us on email <a href="mailto:info@acowebs.com" >info@acowebs.com</a></li>'
        + '</ul > ',
    },
    {
      title: 'How frequently reports will be synced?',
      content:
        'We sync your data with our application in real time, Incase we missed any updates we always resync in every 24 hr span.',
    },
    {
      title: 'How much does Schedule Export Custom Reports cost?',
      content:
        'You can always start with a trial period of ?? ok days and renew the plan at a cost of ?? per month.',
    },
    {
      title: 'How can i build a custom report?',
      content:
        '<ul>'
        + '<li>Create Custom Report > Complete your form with fields you need and filters needed > Save the Report.</li>'
        + '<li>Please refer to the link mentioned below</li>'
        + '<a href="https://www.youtube.com/channel/UCXoOjbKiXjDocNMe8qd3WHw">https://www.youtube.com/channel/UCXoOjbKiXjDocNMe8qd3WHw</a>'
        + '</ul > ',
    },
    {
      title: 'How often are analytics updated?',
      content:
        'In order to improve your experience we sync it in a 24 hr span but you can always sync it whenever you need from your side.',
    },
    {
      title: 'How can I export reports?',
      content:
        '<ul>'
        + '<li>You can export any reports in various formats such as csv,html,pdf.</li>'
        + '<li>You can also use a schedule to export your reports in csv format to your google sheets without connecting your google account.</li></ul>',
    },
  ];

  return (
    <div>
      <div className={Styles.sectionone}>
        <h2>Support </h2>
        <div className={Styles.row}>
          {supportdata.map(({ img, title, subtitle, btntext, btnurl }) => (
            <div key={title} className={Styles.col}>
              <Supportbox
                key={title}
                img={img}
                title={title}
                subtitle={subtitle}
                btntext={btntext}
                btnurl={btnurl}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={Styles.sectiontwo}>
        <h3>Frequently asked questions</h3>
        <div className={Styles.sectacodian}>
          <Supportaccordian data={accordiandata} />
        </div>
      </div>
    </div>
  );
}

export default Support;

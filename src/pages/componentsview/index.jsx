import React from 'react';
import Normaltable from '../../components/normaltable';

export default function Componentsview() {
  const data = [
    {
      reportname: 'Inventory on hand',
      when: 'Every Monday at 12:00 AM',
      to: 'errichoffman@gmail.com CSV(.csv)',
      nextrun: '05-19-2020 15:36',
      status: 'Enabled',
    },
    {
      reportname: 'ADIDAS | CLASSIC BACKPACK',
      when: 'Every Monday at 12:00 AM',
      to: 'bencline@gmail.com CSV(.csv)',
      nextrun: '05-19-2020 15:36',
      status: 'Enabled',
    },
    {
      reportname: 'ADIDAS | CLASSIC BACKPACK',
      when: 'Every Monday at 12:00 AM',
      to: 'bencline@gmail.com CSV(.csv)',
      nextrun: '05-19-2020 15:36',
      status: 'Enabled',
    },
    {
      reportname: 'ADIDAS | CLASSIC BACKPACK',
      when: 'Every Monday at 12:00 AM',
      to: 'bencline@gmail.com CSV(.csv)',
      nextrun: '05-19-2020 15:36',
      status: 'Disabled',
    },
    {
      reportname: 'ADIDAS | CLASSIC BACKPACK',
      when: 'Every Monday at 12:00 AM',
      to: 'bencline@gmail.com CSV(.csv)',
      nextrun: '05-19-2020 15:36',
      status: 'Disabled',
    },
  ];

  const headers = [
    {
      key: 'reportname',
      type: 'text',
      label: 'Report Name',
    },
    {
      key: 'when',
      type: 'text',
      label: 'WHEN',
    },
    {
      key: 'to',
      type: 'text',
      label: 'TO',
    },

    {
      key: 'nextrun',
      type: 'date',
      label: 'NEXT RUN',
    },
    {
      key: 'status',
      type: 'status',
      label: 'STATUS',
    },
  ];

  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //     key: 'age',
  //   },
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     key: 'address',
  //   },
  //   {
  //     title: 'Operations',
  //     dataIndex: '',
  //     key: 'operations',
  //   },
  // ];

  // const data2 = [
  //   { name: 'Jack', age: 28, address: 'some where', key: '1' },
  //   { name: 'Rose', age: 36, address: 'some where', key: '2' },
  // ];

  return (
    <div>
      <Normaltable data={data} headers={headers} tabletype="styletwo" />
    </div>
  );
}

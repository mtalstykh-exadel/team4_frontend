const rows = [
  {
    level: 'A1',
    assigned: '19 Jun 2021, 10:52',
    deadline: '24 Jul 2021, 10:53',
    dateVerified: '24 Jul 2021, 10:54',
    status: 'assigned',
    result: 'not passed',
    action: 'Take test',
    id: 1
  },
  {
    level: 'A2',
    assigned: '19 Jun 2021, 10:52',
    deadline: '24 Jul 2021, 10:53',
    dateVerified: '24 Jul 2021, 10:54',
    status: 'assigned',
    result: 'not passed',
    action: 'Take test',
    id: 2
  },
  {
    level: 'B1',
    assigned: '19 Jun 2021, 10:52',
    deadline: '24 Jul 2021, 10:53',
    dateVerified: '24 Jul 2021, 10:54',
    status: 'assigned',
    result: 'not passed',
    action: 'Take test',
    id: 3
  },
  {
    level: 'B2',
    assigned: '19 Jun 2021, 10:52',
    deadline: '24 Jul 2021, 10:53',
    dateVerified: '24 Jul 2021, 10:54',
    status: 'assigned',
    result: 'not passed',
    action: 'Take test',
    id: 4
  },
  {
    level: 'C1',
    assigned: '19 Jun 2021, 10:52',
    deadline: '24 Jul 2021, 10:53',
    dateVerified: '24 Jul 2021, 10:54',
    status: 'assigned',
    result: 'not passed',
    action: 'Take test',
    id: 5
  },
  {
    level: 'C2',
    assigned: '19 Jun 2021, 10:52',
    deadline: '24 Jul 2021, 10:53',
    dateVerified: '24 Jul 2021, 10:54',
    status: 'assigned',
    result: 'not passed',
    action: 'Take test',
    id: 6
  },
];

for (let i = 7; i < 37; i++) {
  rows.push({ ...rows[0], id: i });
  rows.push({ ...rows[1], id: i + 30 });
  rows.push({ ...rows[2], id: i + 60 });
  rows.push({ ...rows[3], id: i + 120 });
  rows.push({ ...rows[4], id: i + 150 });
  rows.push({ ...rows[5], id: i + 180 });
}
export { rows };

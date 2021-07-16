const rows = [
  {
    level: 'A1', 
    assigned: '19 Jun 2021, 10:52', 
    deadline: '24 Jul 2021, 10:53', 
    dateVerified: '24 Jul 2021, 10:54', 
    status: 'assigned', 
    result: 'not passed', 
    action: 'Take test', 
    id: 1},
];

for (let i = 2; i < 203; i++) {
  rows.push({...rows[0], id: i});
}

export {rows};

/* owner_types:
 *  user
 *  group
 *  facility
 */

/* type_id:
 *  user_event
 *  event
 *  training
 */

const data = [
  {
    accessibility_id: 2,
    type_id: 1,
    owner_id: 1,
    owner_type: 'user',
    name: 'Ma foci?',
    description: 'Ma fociznank a BG palyajan',
    adress: 'Aleea Tineretului 1, Odorheiu Secuiesc 535600',
    min_participant: 6,
    max_participant: 10,
    repeat: false,
    start_date: '2021.08.09 19:00:00',
    end_date: '2021.08.09 21:00:00'
  },
  {
    accessibility_id: 1,
    type_id: 2,
    owner_id: 4,
    owner_type: 'facility',
    name: 'Udvarhely vs Steaua mérkőzés',
    description: 'Egy igazi harc a hacai és a Steaua csapata között',
    adress: 'Strada Mihail Kogălniceanu 10, Odorheiu Secuiesc 535600',
    min_participant: null,
    max_participant: 750,
    repeat: false,
    start_date: '2021.08.13 20:00:00',
    end_date: '2021.08.13 23:00:00'
  },
  {
    accessibility_id: 1,
    type_id: 3,
    owner_id: 8,
    owner_type: 'facility',
    name: 'Kézilabda edzés',
    description: 'Kezilabda edzes 10 es 16 ev kozotti fiataloknak',
    adress: 'Constructorilor, Odorheiu Secuiesc 535600',
    min_participant: null,
    max_participant: null,
    repeat: true,
    start_date: '2021.08.13 16:00:00',
    end_date: '2021.08.13 17:30:00'
  }
];

export { data };
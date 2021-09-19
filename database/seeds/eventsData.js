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

const eventsData = [
  {
    accessibility_id: 2,
    type_id: 1,
    user_id: 1,
    owner_type: 'user',
    name: 'Egy kis foci? 👌',
    description: 'Mint minden héten, most is jó lenne összehozni egy baráti meccset :) a BG pályája, hívhattok barátokat is de 10-nél ne legyünk többen ha lehet. Kérlek legkésőbb 7.-ig jelezzétek az eljöveteli szándékotokat.',
    address: 'Aleea Tineretului 1, Odorheiu Secuiesc 535600',
    min_participant: 6,
    max_participant: 10,
    repeat: false,
    start_date: '2021.08.09 19:00',
    end_date: '2021.08.09 21:00'
  },
  {
    accessibility_id: 1,
    type_id: 2,
    user_id: 4,
    owner_type: 'facility',
    name: 'Udvarhely vs Steaua mérkőzés',
    description: 'Egy igazi harc a hacai és a Steaua csapata között. Várunk mindenkit! Legalábbis amíg van hely 😜 Az infókat itt láthatjátok, a jegyet meg tudjátok vásárolni a helyszínen.',
    address: 'Strada Mihail Kogălniceanu 10, Odorheiu Secuiesc 535600',
    min_participant: 0,
    max_participant: 750,
    repeat: false,
    start_date: '2021.08.13 20:00:00',
    end_date: '2021.08.13 23:00:00'
  },
  {
    accessibility_id: 1,
    type_id: 3,
    user_id: 8,
    owner_type: 'facility',
    name: 'Kézilabda edzés',
    description: 'Kézilabda edzés 10 és 16 év közötti fiataloknak. Leginkább kezdőket várunk de nem probléma ha már egy kicsit kipróbáltuk magunkat a sportban.',
    address: 'Constructorilor, Odorheiu Secuiesc 535600',
    min_participant: 0,
    max_participant: 30,
    repeat: true,
    start_date: '2021.08.13 16:00:00',
    end_date: '2021.08.13 17:30:00'
  }
];

export { eventsData };

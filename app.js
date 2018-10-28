document.querySelector('#form').addEventListener('submit', getData);

async function getData(event) {
  event.preventDefault();
  document.querySelector('.output').classList.add('visible');

  let createdDate;
  let data = [];
  const user = document.getElementById('username').value;

  await fetch(`https://api.github.com/users/${user}`)
    .then(response => response.json())
    .then(response => (createdDate = response.created_at));

  const createdDay = new Date(createdDate).getMonth();
  const createdMonth = new Date(createdDate).getDate();

  await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${createdDay}/${createdMonth}`)
    .then(response => response.json())
    .then(response => (data = response.events));

  const random = Math.floor(Math.random() * data.length) + 1;
  const incident = data[random];
  console.log(incident);
  const incidentText = incident.text;
  const incidentYear = incident.year;
  const age = moment(new Date()).diff(moment(new Date(createdDate)), 'days');

  document.querySelector('#created').innerText = new Date(createdDate).toLocaleDateString('en-US');
  document.querySelector('#daysOld').innerText = age;
  document.querySelector('#wikiYear').innerText = incidentYear;
  document.querySelector('#news').innerText = incidentText;
}

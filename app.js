let date;
let year;
let month;
let day;
let age;

document.getElementById('username').addEventListener('click', function () {
  document.querySelector('.output').classList.remove('visible');
})

document.getElementById('button').addEventListener('click', function () {
  getData();
  setTimeout(() => {
    document.querySelector('.output').classList.add('visible');
  }, 2000);
});

document.getElementById('username').addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    getData();
    setTimeout(() => {
      document.querySelector('.output').classList.add('visible');
    }, 2000);
  }
});


function getData() {

  let user = document.getElementById('username').value;

  const xhr2 = new XMLHttpRequest();
  xhr2.open('GET', `https://api.github.com/users/${user}`, true);

  xhr2.onload = function () {
    if (xhr2.status === 200) {
      let data = JSON.parse(xhr2.responseText).created_at
      year = data.toString().slice(0, 4);
      month = data.toString().slice(5, 7);
      day = data.toString().slice(8, 10);
      date = `${month}/${day}`;
      data = new Date(data);
      let oneDay = 24 * 60 * 60 * 1000;
      let today = Date.now();
      let creationDate = data.getTime();
      age = Math.round(Math.abs((today - creationDate) / (oneDay)));
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${date}`, true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText).events;
        document.getElementById('created').textContent = `${year}.${month}.${day}.`
        document.getElementById('daysOld').textContent = `${age}`
        document.getElementById('wikiYear').textContent = `${data[5].year}:`;
        document.getElementById('news').textContent = data[5].text;
      }
    }
    xhr.onerror = function () {
      console.log('Error!');
    }

    xhr.send();

  }

  xhr2.onerror = function () {
    console.log('Error!');
  }

  xhr2.send();

}



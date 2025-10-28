async function bookSchedule(event) {
  event.preventDefault();
  let form = event.currentTarget;
  let fd = new FormData(form);
  let data = Object.fromEntries(fd.entries());
  let json = JSON.stringify(data);

  let res = await fetch(form.action, {
    method: form.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  });

  switch (res.status) {
    case 204:
      alert('Booked');
      form.reset();
      break;
    case 404: {
      const message = await res.text();
      alert(message);
      let bookingSeq = message.match(/\b[\d]+\b/gi) || [];
      bookingSeq = bookingSeq[0];
      if (bookingSeq) {
        renderNewStudentForm(form.student_email.value, bookingSeq);
      }
      break;
    }
  }
}

async function addStudent(event) {
  event.preventDefault();
  let form = event.currentTarget;
  let scheduleForm = document.querySelector('#book-schedule');

  let fd = new FormData(form);
  let json = JSON.stringify({
    booking_sequence: fd.get('booking_sequence'),
    name: fd.get('name'),
    email: fd.get('email'),
  });

  let res = await fetch(form.action, {
    method: form.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  });

  switch (res.status) {
    case 201:
      alert(await res.text());
      scheduleForm.dispatchEvent(new Event('submit', { cancelable: true }));
      form.reset();
      break;
    case 400:
      alert(await res.text());
      break;
    case 403:
      alert(await res.text());
      break;
  }
}

async function getUnbookedSchedules() {
  let res = await fetch('/api/unbooked_schedules');
  return res.json();
}

function createScheduleOptions(data) {
  return data.reduce((html, {id, name, date, time}) => {
    html += `<option value=${id}>${name} | ${date} | ${time}</option>`;
    return html;
  }, '');
}

async function renderScheduleOptions() {
  let schedules = await getUnbookedSchedules();
  let optionsHtml = createScheduleOptions(schedules);
  const dropDown = document.querySelector('#options');
  dropDown.innerHTML = optionsHtml;
}

function renderNewStudentForm(email, bookingSeq) {
  let html = `<div class="add-student">
      <h1>Please Provide new student details</h1>
      <form id="add-student" action="/api/students" method="POST">
          <div>
              <label for="email">Email:</label>
              <input value="${email}" type="email" id="email" name="email">
          </div>
          <div>
              <label for="name">Name:</label>
              <input type="text" id="name" name="name">
          </div>
          <div>
              <label for="booking_sequence">Booking Sequence:</label>
              <input value="${bookingSeq}" type="text" id="booking_sequence" name="booking_sequence">
          </div>
          <input type="submit">
      </form>
    </div>`;

  let mainForm = document.querySelector('#book-schedule');
  mainForm.insertAdjacentHTML('afterend', html);
  document.querySelector('#add-student').addEventListener('submit', addStudent);
}

document.addEventListener('DOMContentLoaded', event => {
  document.querySelector('select#schedule_id').addEventListener('click', (event) => {
    renderScheduleOptions();
  });

  document.querySelector('#book-schedule').addEventListener('submit', bookSchedule);

});

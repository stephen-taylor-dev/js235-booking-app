async function getStaff() {
  let res = await fetch('/api/staff_members');

  if (res.status === 200) {
    const staffData = await res.json();
    return formatStaffData(staffData);
  } else {
    throw new Error('Could not retrieve staff');
  }
}

function formatStaffData(allStaff) {
  return allStaff.reduce((html, {id, name}) => {
    html += `<option value=${id}>${name}</option>`;
    return html;
  }, '');
}

async function fieldSetTemplate(idx) {
  return `<fieldset id="schedule_${idx}">
      <legend>Schedule ${idx}</legend>
      <div>
        <label for="staff_${idx}">Staff Name:</label>
        <select id="staff_${idx}" name="staff_${idx}">${await getStaff()}</select>
      </div>
      <div>
        <label for="date_${idx}">Date:</label>
        <input type="text" id="date_${idx}" name="date_${idx}" placeholder="mm-dd-yy">
      </div>
      <div>
        <label for="time_${idx}">Time:</label>
        <input type="text" id="time_${idx}" name="time_${idx}" placeholder="hh:mm">
      </div>
    </fieldset>`;
}

async function addFieldSet() {
  const schedules = document.querySelector('#schedules');
  let idx = schedules.children.length + 1;
  let newFieldSet = await fieldSetTemplate(idx);

  schedules.insertAdjacentHTML('beforeend', newFieldSet);
}

function formInputsToJson(fd) {
  let numSchedules = document.querySelector('#schedules').children.length;
  const schedules = [];
  for (let i = 1; i <= numSchedules; i += 1) {
    schedules.push({
      staff_id: fd.get(`staff_${i}`),
      date: fd.get(`date_${i}`),
      time: fd.get(`time_${i}`),
    });
  }

  return {schedules: schedules};
}


async function addSchedules(event) {
  event.preventDefault();
  let data = formInputsToJson(new FormData(event.currentTarget));
  let json = JSON.stringify(data);

  let res = await fetch('/api/schedules', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: json,
  });

  switch (res.status) {
    case 201:
      console.log(await res.text());
      break;
    case 400:
      console.log(await res.text());
      break;
  }

}

document.addEventListener('DOMContentLoaded', event => {
  addFieldSet();

  document.querySelector('#btnAdd').addEventListener('click', addFieldSet);
  document.querySelector('form').addEventListener('submit', addSchedules);
});
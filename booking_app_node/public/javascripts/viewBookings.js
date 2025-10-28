async function getBookedDates() {
  let res = await fetch('/api/bookings');
  return await res.json();
}

async function renderDates() {
  let dates = await getBookedDates();
  let datesContainer = document.querySelector('#dates');

  dates.forEach(date => {
    const dateHtml = `<li class="date">${date}</li>`;
    datesContainer.insertAdjacentHTML('beforeend', dateHtml);
  });
}

async function handleDateClick(event) {
  if (event.target.className !== "date" || event.target.childElementCount !== 0) return;

  const dateElement = event.target;
  const date = dateElement.innerText;

  const res = await fetch(`/api/bookings/${date}`);
  const bookings = await res.json();

  const ulElement = document.createElement('ul');
  dateElement.appendChild(ulElement);

  bookings.forEach(booking => {
    const bookingHtml = `<li class="booking">${booking.join(' | ')}</li>`;
    ulElement.insertAdjacentHTML('beforeend', bookingHtml);
  });

}

document.addEventListener('DOMContentLoaded', event => {
  renderDates();
  document.querySelector('#dates').addEventListener('click', handleDateClick);
});
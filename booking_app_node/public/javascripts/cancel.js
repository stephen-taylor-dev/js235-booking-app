async function cancelBooking(event) {
  event.preventDefault();
  let form = event.currentTarget;
  let bookingId = form.booking_id.value;
  let res = await fetch(`/api/bookings/${bookingId}`, {
    method: 'PUT',
  });

  if (res.status === 204) {
    alert('Success. Booking Deleted');
    form.reset();
  } else if (res.status === 404) {
    alert(await res.text());
  }
}


async function cancelSchedule(event) {
  event.preventDefault();
  let form = event.currentTarget;
  let scheduleId = form.schedule_id.value;

  let res = await fetch(`/api/schedules/${scheduleId}`, {
    method: 'DELETE',
  });

  if (res.status === 204) {
    alert('Success. Deleted Schedule');
    form.reset();
  } else if (res.status === 403 || res.status === 404) {
    alert(await res.text());
  }
}

document.addEventListener('DOMContentLoaded', event => {
  document.querySelector('#cancel-booking').addEventListener('submit', cancelBooking);
  document.querySelector('#cancel-schedule').addEventListener('submit', cancelSchedule);
});
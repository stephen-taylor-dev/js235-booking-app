function formDatatoJson(formData) {
  return Object.fromEntries(formData.entries());
}

async function addStaff(event) {
  event.preventDefault();

  const data = new FormData(event.currentTarget);
  const json = JSON.stringify(formDatatoJson(data));

  let res = await fetch('/api/staff_members', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: json,
  });

  if (res.status === 201) {
    const confirmation = await res.json();
    alert(`New Staff created with id: ${confirmation.id}`);
    event.currentTarget.reset();
  } else {
    let message = await res.text();
    alert(message);
  }

}


document.addEventListener("DOMContentLoaded", event => {
  document.querySelector('form').addEventListener('submit', addStaff);
});
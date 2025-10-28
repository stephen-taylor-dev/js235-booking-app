class TimeoutError extends Error {
  constructor(message = 'Operation Timed Out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

function tallySchedules(data) {
  return data.reduce((acc, schedule) => {
    const id = schedule.staff_id;
    const key = `staff ${id}`;
    if (acc[key]) {
      acc[key] += 1;
    } else {
      acc[key] = 1;
    }
    return acc;
  }, {});
}

function parseTally(data) {
  return Object.entries(data).map(([key, val]) => `${key}: ${val}`).join('\n');
}

function withTimeout(promise, delay) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new TimeoutError());
    }, delay);
  });

  return Promise.race([promise, timeoutPromise]);
}

async function retrieveSchedules() {
  try {
    let res = await withTimeout(fetch('/api/schedules'), 5000);
    let schedules = await res.json();
    if (schedules.length > 0) {
      const talliedSchedules = tallySchedules(schedules);
      alert(parseTally(talliedSchedules));
    } else {
      alert('No Schedule avaialable for booking');
    }
  } catch (error) {
    if (error instanceof TimeoutError) {
      alert('The request is taking longer than usual, please try again later')
    } else {
      alert(error.message);
    }
  } finally {
    alert('The request has completed');
  }
};

const App = {
  test() {
    console.log('wowo');
  },
};


document.addEventListener('DOMContentLoaded', event => {
  App.test();
  retrieveSchedules();
});
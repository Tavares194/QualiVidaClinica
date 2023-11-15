document.querySelector('#logout').addEventListener('click', logout);

function logout() {
  fetch('/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'logout' }),
  })
    .then(response => {
      if (response.ok) {
        window.location.re;
      } else {
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });
}
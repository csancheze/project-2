
const participateButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const event_id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/userEvents`, {
      method: 'POST',
      body: JSON.stringify({event_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('You are suscribed')
          window.location.reload();
    } else {
      alert('Failed to delete event');
    }
  }
};

const deleteParticipationButtonHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/userEvents/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Your participation was deleted')
        window.location.reload();
    } else {
      alert('Failed to delete participation event');
    }
  }
};


  
  document.querySelector('#participate-button').addEventListener('click',participateButtonHandler);
  document.querySelector('#dont-button').addEventListener('click',deleteParticipationButtonHandler);
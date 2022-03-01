const userEventFormHandler = async (event) => {
    event.preventDefault();
  
    const event_id = document.querySelector("#event").getAttribute('data-id')  
  
    if (event_id) {
      const response = await fetch('/api/userEvents', {
        method: 'POST',
        body: JSON.stringify({event_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`${event_id}`);
      } else {
        alert('Failed to create participation');
      }
    } else {
      alert('Write something!')
    }
  };
  
  
  document.querySelector('#userEvent-form').addEventListener('submit', userEventFormHandler);
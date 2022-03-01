const messageFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#event-message').value.trim();
    const date_created = new Date();
    const event_id = document.querySelector("#event").getAttribute('data-id')  
  
    if (content && date_created && event_id) {
      const response = await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify({content, date_created, event_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`${event_id}`);
      } else {
        alert('Failed to create comment');
      }
    } else {
      alert('Write something!')
    }
  };
  
  
  document.querySelector('#message-form').addEventListener('submit', messageFormHandler);
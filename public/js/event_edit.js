const myEventFormHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')

    const title = document.querySelector('#event-title').value.trim();
    const content = document.querySelector('#update-event').value.trim();
        if (title == ""){
          alert('Write an updated title')
        }
  
        if (title && content) {
        const response = await fetch(`/api/events/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content}),
            headers: {
            'Content-Type': 'application/json',
            },
        });

    
        if (response.ok) {
          alert('Your event was updated')
          window.location = document.referrer
        } else {
            alert('Failed to update event');
        }
        } 
    }
}
  
  
  const delEventButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Your event was deleted')
            window.location = document.referrer
      } else {
        alert('Failed to delete event');
      }
    }
  };
  
  document
    .querySelector('#event-update-form')
    .addEventListener('submit', myEventFormHandler);
  
  document
    .querySelector('#event-delete-form')
    .addEventListener('click', delEventButtonHandler);
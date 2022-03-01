//Edit an existing message
const messageFormHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')

    const content = document.querySelector('#update-message').value.trim();
  
        if (content) {
        const response = await fetch(`/api/messages/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content}),
            headers: {
            'Content-Type': 'application/json',
            },
        });

    
        if (response.ok) {
          alert('Your message was updated')
          window.location = document.referrer
        } else {
            alert('Failed to update message');
        }
        } 
    }
}
  
//Delete an existing message  
  const delMessageButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Your message was deleted')
            window.location = document.referrer
      } else {
        alert('Failed to delete message');
      }
    }
  };
  
  document
    .querySelector('#message-update-form')
    .addEventListener('submit', messageFormHandler);
  
  document
    .querySelector('#message-delete-form')
    .addEventListener('click', delMessageButtonHandler);
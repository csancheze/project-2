const messageFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#add-message').value.trim();
    const date_created = new Date();
    const event_id = document.querySelector(".message-form").getAttribute('data-id')  
  
    if (content && date_created && event_id) {
      const response = await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify({content, date_created, event_id}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload()
      } else {
        alert('Failed to create comment');
      }
    } else {
      alert('Write something!')
    } 
  };
  
  
  document.querySelector('.message-form').addEventListener('submit', messageFormHandler);

  var elmnt = document.querySelector(".comment-list");
    elmnt.scrollTop = 99999;
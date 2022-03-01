var categoryId = document.getElementsByName('categoryId');
var category_id = ""

const myEventFormHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id')

    const title = document.querySelector('#event-title').value.trim();
    const content = document.querySelector('#update-content').value.trim();
    const date_celebration = document.querySelector('#event-date').value;
    for (i = 0; i < categoryId.length; i++) {
      if (categoryId[i].checked) {
          category_id = categoryId[i].value
      }
   }

  
        if (title && content && date_celebration && category_id) {
        const response = await fetch(`/api/events/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content, date_celebration, category_id}),
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
        } else {
      alert('Did you left something empty?')
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
    .querySelector('.update-event-form')
    .addEventListener('submit', myEventFormHandler);
  
  document
    .querySelector('#delete-button')
    .addEventListener('click', delEventButtonHandler);
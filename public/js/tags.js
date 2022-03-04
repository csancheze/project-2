const addTagToEvent = async (event) => {
  event.preventDefault();
  const tag_name = document.querySelector("#tag").value.trim();
  console.log(tag_name)
  const eventId =  event.target.getAttribute('data-id')

  const response = await fetch('/api/tags', {
    method: 'POST',
    body: JSON.stringify({ tag_name, eventId}),
    headers: { 'Content-Type': 'application/json' },
});

if (response.ok) {
    alert('Tag added to Event')
    document.location.reload();
} else {
    alert('Failed to create tag.');
}
}

const delEventButtonHandler = async (event) => {
event.preventDefault();
if (event.target.hasAttribute('data-id') && event.target.matches("button") == true) {
  const id = event.target.getAttribute('data-id');
  const eventId = document.querySelector('.event-title').getAttribute('data-id')
  console.log(id)
  console.log(eventId)

  const response = await fetch(`/api/event_tags/${id}+${eventId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    alert('The tag was deleted')
        window.location.reload()
  } else {
    alert('Failed to delete tag');
  }
}
};


document.querySelector('#new-tag').addEventListener('submit',addTagToEvent);
document.querySelector('.list-tags').addEventListener('click', delEventButtonHandler);
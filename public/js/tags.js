


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
    

    document.querySelector('#new-tag').addEventListener('submit',addTagToEvent);

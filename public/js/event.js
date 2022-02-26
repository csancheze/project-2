const eventFormHandler = async (event) => {
    event.preventDefault();

    const eventTitle = document.querySelector('#event-title').value;
    const eventContent = document.querySelector('#event-content').value;
    const date_created = new Date();



    if (eventContent && eventTitle) {
        const response = await fetch('/api/event', {
            method: 'POST',
            body: JSON.stringify({ eventTitle, eventContent, date_created }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create the event.');
        }
    }
};

document
    .querySelector('.event-form')
    .addEventListener('submit', eventFormHandler);

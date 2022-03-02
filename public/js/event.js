var categoryId = document.getElementsByName('categoryId');
var category_id = ""

const eventFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#event-title').value;
    const content = document.querySelector('#event-content').value;
    const date_celebration = document.querySelector('#event-date').value;
    
    for (i = 0; i < categoryId.length; i++) {
        if (categoryId[i].checked) {
            category_id = categoryId[i].value
        }
    }
    
    const date_created = new Date();



    if (title && content && date_celebration && category_id) {
        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({ title, content, date_celebration, date_created, category_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Event created')
            document.location.replace('/profile');
        } else {
            alert('Failed to create the event.');
        }
    }else {
        alert('Please enter your event information. Event not created')
    }
};

function showForm() {
    var x = document.getElementById("myForm");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    var y = document.getElementById("close");
    if (y.style.display === "none") {
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }
   }


document.querySelector('.event-form').addEventListener('submit', eventFormHandler);

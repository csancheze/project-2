setTimeout(function() {
    location.reload();
  }, 60000 * 30);

window.addEventListener('DOMContentLoaded', function () {
    const eventCards = document.getElementsByClassName("event-card")

for (i = 0; i < eventCards.length; i++) {
    const date = new Date(eventCards[i].getAttribute('data-id'))

    const now = new Date()
    console.log(now)
    if ( date < now.setHours(now.getHours()-1)) {
        const text =document.createElement("p")
        text.setAttribute("style","color:white; font-size: 2vh; text-align: center; box-shadow: 0 0 10px red; display: inline-block; padding: 3px; border-radius: 5px;")
        text.textContent = "Started a while ago!"
        eventCards[i].append(text);

    } else if ( date <= now.setHours(now.getHours()+1)) {
        const text =document.createElement("p")
        text.setAttribute("style","color:white; font-size: 2vh; text-align: center; box-shadow: 0 0 10px green; display: inline-block; padding: 3px; border-radius: 5px;")
        text.textContent = "It is Active!"
        eventCards[i].append(text)
    } else {
        const text =document.createElement("p")
        text.setAttribute("style","color:white; font-size: 2vh; text-align: center; box-shadow: 0 0 10px blue; display: inline-block; padding: 3px; border-radius: 5px;")
        text.textContent = "Soon!"
        eventCards[i].append(text)
    }

}

})

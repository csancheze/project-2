setTimeout(function() {
    location.reload();
  }, 60000 * 30);

window.addEventListener('DOMContentLoaded', function () {
    const eventCards = document.getElementsByClassName("event-card")

for (i = 0; i < eventCards.length; i++) {
    const date = new Date(eventCards[i].getAttribute('data-id'))

    const now = new Date()
    if ( date < now.setHours(now.getHours()-1)) {
        eventCards[i].setAttribute("style","box-shadow: 0 0 10px red")
        const text =document.createElement("p")
        text.setAttribute("style","color:white; font-size: 2vh; text-align: center")
        text.textContent = "Started a while ago!"
        eventCards[i].append(text)

    } else if ( date <= now.setHours(now.getHours()+1)) {
        eventCards[i].setAttribute("style","box-shadow: 0 0 10px green")
        const text =document.createElement("p")
        text.setAttribute("style","color:white; font-size: 2vh; text-align: center")
        text.textContent = "It is Active!"
        eventCards[i].append(text)
    } else {
        eventCards[i].setAttribute("style","box-shadow: 0 0 10px blue")
        const text =document.createElement("p")
        text.setAttribute("style","color:white; font-size: 2vh; text-align: center")
        text.textContent = "Soon!"
        eventCards[i].append(text)
    }

}

})
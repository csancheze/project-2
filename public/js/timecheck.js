

window.addEventListener('DOMContentLoaded', function () {
    const eventCards = document.getElementsByClassName("event-card")



for (i = 0; i < eventCards.length; i++) {
    const date = new Date(eventCards[i].getAttribute('data-id'))

    const now = new Date()
    if ( date < now.setHours(now.getHours()-1)) {
        eventCards[i].setAttribute("style","box-shadow: 0 0 10px red")
    } else if ( date <= now.setHours(now.getHours()+1)) {
        eventCards[i].setAttribute("style","box-shadow: 0 0 10px green")
    } else {
        eventCards[i].setAttribute("style","box-shadow: 0 0 10px blue")
    }

}

})
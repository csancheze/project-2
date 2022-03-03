const scrollLeft = async (event) => {
    const elmnt = document.querySelector(".comment-list");
  elmnt.scrollLeft -=60;
}

const scrollRight = async (event) => {
    const elmnt = document.querySelector(".comment-list");
  elmnt.scrollLeft +=60;
}


document.querySelector('#left').addEventListener('click', scrollLeft);
document.querySelector('#right').addEventListener('click', scrollRight);

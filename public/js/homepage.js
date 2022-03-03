var counter = (localStorage.getItem("firstvisit")) || 0
if(counter == 0) {
  counter = 1
  localStorage.setItem("firstvisit",JSON.stringify(counter))
  showForm();
}


const scrollLeft = async (event) => {
    const elmnt = document.querySelector(".comment-list");
  elmnt.scrollLeft -=60;
}

const scrollRight = async (event) => {
    const elmnt = document.querySelector(".comment-list");
  elmnt.scrollLeft +=60;
}


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

document.querySelector('#left').addEventListener('click', scrollLeft);
document.querySelector('#right').addEventListener('click', scrollRight);

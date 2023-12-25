const imageContainer = document.querySelectorAll('.image-container');
const nextButton = document.getElementById('butNext');
const prevButton = document.getElementById('butPrev');
const inputPhone = document.getElementById('telefone');
const form = document.getElementsByTagName('form')[0];
var widthImage = imageContainer[0].clientWidth;

let state = {
  index: 0
};

window.addEventListener('resize', () => {
  location.reload();
})

function next_slider() {
  state.index++

  if (state.index > 6) { 

    state.index = 0
    moveImageHidden(state.index)
    setTimeout(next_slider)
  } else {

    moveNextImage(state.index)
  }
};

function moveNextImage(index) {

  for (let i = 0; i < imageContainer.length; i++) {
    imageContainer[i].style.transition = '0.5s ease-in-out';
    imageContainer[index].classList.remove('active')
    imageContainer[index + 1].classList.add('active')
    imageContainer[index + 2].classList.remove('active')
    imageContainer[i].style.transform = `translateX(${-index * (widthImage+1)}px)`;
  }
};

function moveImageHidden(index) {

  for (let i = 0; i < imageContainer.length; i++) {
    imageContainer[index].classList.remove('active')
    imageContainer[index + 1].classList.add('active')
    imageContainer[index + 2].classList.remove('active')
    imageContainer[i].style.transition = 'none';
    imageContainer[i].style.transform = `translateX(${-index * widthImage}px)`;
  }
};

function prev_slider() {
  state.index--

  if (state.index == -1) { 
    state.index = 6

    imageContainer[1].classList.remove('active')
    moveImageHidden(state.index)
    setTimeout(prev_slider)
  } else {
    movePrevImage(state.index)
  }
};

function movePrevImage(index) {

  for (let i = 0; i < imageContainer.length; i++) {
    imageContainer[i].classList.remove('active')
    imageContainer[i].style.transition = '0.5s ease-in-out';
    imageContainer[index].classList.remove('active')
    imageContainer[index + 1].classList.add('active')
    imageContainer[index + 2].classList.remove('active')
    imageContainer[i].style.transform = `translateX(${-index * widthImage}px)`;
  }
};

nextButton.addEventListener('click', next_slider);
prevButton.addEventListener('click', prev_slider);

inputPhone.addEventListener('keypress', (event) => {
  const keyPressed = event.key

  if (keyPressed === 'Backspace') {
    event.preventDefault()
  } else {
    addNumber()
  }
});

function addNumber(){  
  if(telefone.value.length == 0) {
    telefone.value += '(' + telefone.value
  } else if (telefone.value.length == 3) {
    telefone.value += ') '
  } else if (telefone.value.length == 10) {
    telefone.value += '-'
  }};

form.addEventListener('submit',() => {
  form.reset()
});

function openWindowCandidate() {
  window.open('candidatar','_self')
};

function openWindowPlayers() {
  window.open('player', "_self")
};

function openWindowLogin() {
  window.open('login', '_self')
};
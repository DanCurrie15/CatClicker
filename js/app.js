// array to store each cat
const Cats = [
  {name: 'Poplinre', image: 'images/cat.jpg', clicks: 0},
  {name: 'Chewie', image: 'images/cat2.jpg', clicks: 0},
  {name: 'Frank', image: 'images/cat3.jpg', clicks: 0},
  {name: 'Lily', image: 'images/cat4.jpg', clicks: 0},
  {name: 'Steve', image: 'images/cat5.jpg', clicks: 0}
];
// array to hole selected cat
let selectedCat = 0;

const sideBar = document.querySelector('.side_bar');

// add cats to side bar
for(let i = 0; i < Cats.length; i++) {

  let catElem = document.createElement('div');
  sideBar.appendChild(catElem);
  catElem.classList.add('sideCat');
  let imageElem = document.createElement('IMG');
  let nameElem = document.createElement('span');
  imageElem.src = Cats[i].image;
  nameElem.textContent = Cats[i].name;
  catElem.appendChild(imageElem);
  imageElem.classList.add('sideImage');
  catElem.appendChild(nameElem);
  nameElem.classList.add('sideName');

  catElem.addEventListener('click', (function(iCopy) {
        return function() {
            selectedCat = iCopy;
            document.querySelector('.cat_name').innerHTML = Cats[i].name;
            document.querySelector('.cat_image').src = Cats[i].image;
            document.querySelector('.cat_clicks').innerHTML = Cats[i].clicks;
        };
    })(i));
}

// add event lister to 1st cat image for clicks
document.querySelector('.cat_image').addEventListener('click', function(){
  document.querySelector('.cat_clicks').innerHTML = ++Cats[selectedCat].clicks;
}, false);


  var model = {
    // array to store each cat
    catsModel: [
      {name: 'Poplinre', image: 'images/cat.jpg', clicks: 0},
      {name: 'Chewie', image: 'images/cat2.jpg', clicks: 0},
      {name: 'Frank', image: 'images/cat3.jpg', clicks: 0},
      {name: 'Lily', image: 'images/cat4.jpg', clicks: 0},
      {name: 'Steve', image: 'images/cat5.jpg', clicks: 0}
    ],
    // variable to hole selected cat
    selectedCat: 0
  };

  var octopus = {
    init: function() {
      view.init();
      viewAdmin.init();
    },
    getAllCats: function(){
      return model.catsModel;
    },
    setSelectedCat: function(cat){
      model.selectedCat = cat;
    },
    getSelectedCat: function(){
      return model.selectedCat;
    },
    incrementClick: function(){
      return ++model.catsModel[this.getSelectedCat()].clicks;
    },
    setCatProps: function(newName, newImage, newClicks) {
      model.catsModel[this.getSelectedCat()].name = newName;
      model.catsModel[this.getSelectedCat()].image = newImage;
      model.catsModel[this.getSelectedCat()].clicks = newClicks;
    }
  };

  var view = {
    init: function(){
      this.render();
      // add event lister to 1st cat image for clicks
      var cats = octopus.getAllCats();
      document.querySelector('.cat_image').addEventListener('click', function(){
        document.querySelector('.cat_clicks').innerHTML = octopus.incrementClick();
      }, false);
    },
    render: function(){
      const sideBar = document.querySelector('.side_bar');
      // add cats to side bar
      var cats = octopus.getAllCats();
      for(let i = 0; i < cats.length; i++) {

        let catElem = document.createElement('div');
        sideBar.appendChild(catElem);
        catElem.classList.add('sideCat');
        let imageElem = document.createElement('IMG');
        let nameElem = document.createElement('span');
        imageElem.src = cats[i].image;
        nameElem.textContent = cats[i].name;
        catElem.appendChild(imageElem);
        imageElem.classList.add('sideImage');
        catElem.appendChild(nameElem);
        nameElem.classList.add('sideName');

        catElem.addEventListener('click', (function(iCopy) {
              return function() {
                  octopus.setSelectedCat(iCopy);
                  document.querySelector('.cat_name').innerHTML = cats[i].name;
                  document.querySelector('.cat_image').src = cats[i].image;
                  document.querySelector('.cat_clicks').innerHTML = cats[i].clicks;
                  viewAdmin.render();
              };
          })(i));
      }
      // initial selected cat
      document.querySelector('.cat_name').innerHTML = cats[octopus.getSelectedCat()].name;
      document.querySelector('.cat_image').src = cats[octopus.getSelectedCat()].image;
      document.querySelector('.cat_clicks').innerHTML = cats[octopus.getSelectedCat()].clicks;
    }
  };

  viewAdmin = {
    init: function(){
      // clicking the admin button shows the admin panel and populates fields with the selected cat
      document.querySelector('.admin_button').addEventListener('click', function(){
        document.querySelector('.admin').classList.toggle('hidden');
        viewAdmin.render();
      });
      // clicking the cancel button discards changes to fields
      document.querySelector('.cancel_button').addEventListener('click', function(){
        document.querySelector('.admin').classList.toggle('hidden');
      }, false);
      // clicking the submit button saves changes to fields
      document.querySelector('.submit_button').addEventListener('click', function(){
        // save changes to the model
        octopus.setCatProps(document.querySelector('.name_field').value,
                            document.querySelector('.image_field').value,
                            document.querySelector('.clicks_field').value);
        // hide the admin panel
        document.querySelector('.admin').classList.toggle('hidden');
        // empty the divs containing the cat info and re-render with updated data
        document.querySelector('.side_bar').innerHTML = '';
        document.querySelector('.cat_name').innerHTML = '';
        document.querySelector('.cat_image').src = '';
        document.querySelector('.cat_clicks').innerHTML = '';
        view.render();
      }, false);

    },
    render: function(){
      cat = octopus.getAllCats()[octopus.getSelectedCat()];
      document.querySelector('.name_field').value = cat.name;
      document.querySelector('.image_field').value = cat.image;
      document.querySelector('.clicks_field').value = cat.clicks;
    }
  };

  octopus.init();

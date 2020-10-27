
//Step 2 get input from user
function engageDoggoNum() {
  $('form[name="doggo-return"]').submit(event => {
    event.preventDefault();
    $('.results-img').html('')
    let dogNum = ($('input[name="cuantos-doggos"]').val());
    console.log(dogNum);
    getDoggoImages(dogNum);
  })
}

function engageDoggoBreed() {
  $('form[name="doggo-breed-return"]').submit(event => {
    event.preventDefault();
    $('.results-img').html('');
    $('.error').html('');
    let dogBreed = ($('input[name="doggo-breed"]').val());
    console.log(dogBreed);
    getDoggoBreeds(dogBreed);
  })
}
//Step 3 get images from Dog API
function getDoggoImages(dogNum) {
  let url = `https://dog.ceo/api/breeds/image/random/${dogNum}`
  console.log(url)
  //connect to API server URL
  fetch(url)
  //Convert binary response to JSON response
    .then(response => response.json())
    //Use JSON response to send to display function
    .then(responseJson => displayDoggos(responseJson))
    //If there are errors, display them
    .catch(error => alert('Something went wrong, try for more doggos one more time.'))
}

function getDoggoBreeds(dogBreed) {
  let url = `https://dog.ceo/api/breed/${dogBreed}/images/random`
  console.log(url)
  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayBreeds(responseJson))
    .catch(error => alert('Did you pick a breed? Try again please'))
}

//Step 4 display dog images
function displayDoggos(responseJson) {
  console.log(responseJson);
  console.log(responseJson.message[0]);
  for (i = 0; i < responseJson.message.length; i++) {
    console.log(responseJson.message[i])
    $('.results-img').append(`<img src="${responseJson.message[i]}" class="img">`)
  }
  $('.results').removeClass('hidden');
}

function displayBreeds(responseJson) {
  if (responseJson.code === 404) {
    $('.error').append(`<h2>Sorry, no doggos match that breed</h2>`)
    $('.error').removeClass("hidden");
  } else {
  console.log(responseJson)
  console.log(responseJson.message);
  $('.results-img').append(`<img src="${responseJson.message}" class="img">`);
  $('.results').removeClass('hidden');
  }
}

//Step 1 callback function
$(function() {
  console.log('We bout to get some doggos...');
  engageDoggoNum();
  engageDoggoBreed();
});

// console.log("first project");

let artistData, userInput;

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?keyword=';
const apikey = '48P0yZ4Lssx5vR5CCsSJTCnXeIkFTNnU';

// Selecting DOM elements and assigning them to variables
const $date = $('#Date');
const $venue = $('#Venue');
const $price = $('#Price');
const $time = $('#Time'); 
const $input = $('input[type="text"]');
const $form = $('form');
const $image = $('#artistImage');
const $info = $('#Info');

//Event listeners, search button
$form.on('submit', searchForEvents);

//Function, goes through the ticketmaster api to pull data
function searchForEvents(event) {
  event.preventDefault();
  userInput = $input.val();
  $.ajax({
    url: BASE_URL + userInput,
    data: {
      apikey: apikey
    }
    
  }).then(
    (data) => {
      artistData = data;
      render();
    },
    (error) => {
      console.log('Error: ', error);
    }
  );
}

//render function is used to get specific properties of the artistData
function render() {
  $date.text(artistData._embedded.events[0].dates.start.localDate); 
  $time.text(artistData._embedded.events[0].dates.start.localTime);
  $venue.text(artistData._embedded.events[0]._embedded.venues[0].name); 
  $price.text( '$' + artistData._embedded.events[0].priceRanges[0].min); 
  $image.attr('src', artistData._embedded.events[0].images[0].url);
  $info.text(artistData._embedded.events[0].name);


  //website link, <a> element is used, wraps with button, appends with id #website
 //purchase tickets
  const websiteLink = artistData._embedded.events[0].url;
  if (websiteLink) {
    const $websiteElement = $('<a>').attr('href', websiteLink).text('Purchase Tickets');
    const $websiteButton = $('<button>').addClass('website-button').append($websiteElement);
    $('#website').empty().append($websiteButton);
  }


}







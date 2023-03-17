const quotableUrl = "https://api.quotable.io/";

const welcomeEl = $("#welcome")
const randomQuoteEl = $("#random-quote")
const searchQuoteEl = $("#search-quote")
const contactEl = $("#contact")

// Using math.floor to generate a random page number for the background image
let pageNo = Math.floor(Math.random() * 20);
let searchQuery = "";

// Sending a GET request to retrieve a random quote for the homescreen
function randomQuote() {
    $.ajax({
        url: quotableUrl + "random",
        method: "GET",
    }).then(function (randomQuoteData) {
        console.log(randomQuoteData)
        console.log(randomQuoteData.tags[0])

        if (randomQuoteData.tags[0] === "famous-quotes") {
            searchQuery = "nature"
        } else {
            searchQuery = randomQuoteData.tags[0]
        }

        let quoteContent = randomQuoteData.content
        let quoteAuthor = randomQuoteData.author

        const quoteEl = $("#quote-content");
        quoteEl.text(quoteContent)

        const authorEl = $("#author");
        authorEl.text(quoteAuthor)

        // Get random background image
        const unsplashUrl = "https://api.unsplash.com/";
        const apiKey = "uNOwDznJR7H5oeC9LQPuU_EfeLY4DPlkGjR3NrpXOP0";
        const apiCall = unsplashUrl + "/search/photos?query=" + searchQuery + "&page=" + pageNo + "&client_id=" + apiKey;

        // $.ajax({
        //     url: apiCall,
        //     method: "GET",
        // }).then(function (pictureData) {
        //     console.log(apiCall)
        //     console.log(pictureData)

        //     var randomImg = Math.floor(Math.random() * 10);

        //     var backgroundImgEl = $("#random-quote");
        //     backgroundImgEl.css('background-image', 'linear-gradient(0deg, var(--background-color), var(--background-color)), url(' + pictureData.results[randomImg].urls.regular + ')');;
        // });
    });
};

function getTags() {
    $.ajax({
        url: quotableUrl + "tags",
        method: "GET",
    }).then(function (tagData) {
        console.log(tagData)

        $(function () {
            let tagNames = tagData.map(function (i) {
                return i.name;
            });

            for (let i = 0; i < tagNames.length; i++) {
                $("#category-btns").append(`<a href="#" class="btn category-btn">${tagNames[i]}</a>`);
            };
        });
    });
};

function getAuthors() {
    $.ajax({
        url: quotableUrl + "authors?sortBy=quoteCount&order=desc",
        method: "GET",
    }).then(function (authorData) {
        let authorResults = authorData.results
        console.log(authorResults)

        for (let i = 0; i < authorResults.length; i++) {
            $("#author-btns").append(`<div class="card">
              <a href="#">
                <div class="card-body author-card">
                  <img src="${popularAuthors[i].img}" alt="${authorResults[i].name}" class="author-img">
                  <h5 class="card-title">${authorResults[i].name}</h5>
                  <p class="card-text">${authorResults[i].description}</p>
                </div>
              </a>
            </div>`);
        };
    });
};

// function tagSearch() {
//     let tagSelection = $("#tags").val()

//     $.ajax({
//         url: quotableUrl + "quotes/random?tags=" + tagSelection,
//         method: "GET",
//     }).then(function (tagData) {
//         console.log(tagData)

//         $(function () {
//             let tagNames = tagData.map(function (i) {
//                 return i.name;
//             });
//             $("#tags").autocomplete({
//                 source: tagNames
//             });
//         });
//     });
// };

// tagSearch()

$(document).ready(function () {
    randomQuote()
    getTags()
    getAuthors()
});

$("#home").on('click', function () {
    welcomeEl.removeClass("hide")
    randomQuoteEl.addClass("hide")
    searchQuoteEl.addClass("hide")
    contactEl.addClass("hide")
});

$(".get-random").on('click', function () {
    welcomeEl.addClass("hide")
    randomQuoteEl.removeClass("hide")
    searchQuoteEl.addClass("hide")
    contactEl.addClass("hide")
});

$("#refresh").on("click", function () {
    randomQuote()
})

$(".get-search").on('click', function () {
    welcomeEl.addClass("hide")
    randomQuoteEl.addClass("hide")
    searchQuoteEl.removeClass("hide")
    contactEl.addClass("hide")
});

$(".get-contact").on('click', function () {
    welcomeEl.addClass("hide")
    randomQuoteEl.addClass("hide")
    searchQuoteEl.addClass("hide")
    contactEl.removeClass("hide")
});
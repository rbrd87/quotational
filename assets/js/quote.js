// Getting the quote data from local storage and storing into a new variable
let quoteDataObject = JSON.parse(localStorage.getItem("quoteData"));
let randomQuoteDataObject = JSON.parse(localStorage.getItem("randomQuoteData"));
let searchTermQuery = localStorage.getItem("searchTerm");

// Using math.floor to generate a random page number for the background image
let pageNo = Math.floor(Math.random() * 20);

function populateQuotes() {
    console.log(quoteDataObject)
    console.log(searchTermQuery)

    var quoteEl = $("#quote")
    var quoteSnippetsEl = $("#quote-snippets")
    var searchTermTitleEl = $("#search-term-title");
    searchTermTitleEl.text(searchTermQuery);

    if (quoteDataObject !== null) {
        for (let i = 0; i < 10; i++) {
            searchTermTitleEl.removeClass("hide");
            quoteSnippetsEl.append(`<div class="card">
              <div class="card-body">
              <p class="quote-text">${quoteDataObject.results[i].content}</p>
              <p class="author-text">${quoteDataObject.results[i].author}</p>
              </div>
            </div>`);
        };
    } else if (randomQuoteDataObject !== null) {
        quoteEl.removeClass("quote-jumbo")
        quoteEl.addClass("random-quote")
        quoteEl.append(`<p class="quote-content text-center fade-in" id="quote-content">${randomQuoteDataObject.content}</p>
        <p class="author fade-in" id="author">${randomQuoteDataObject.author}</p>
        <section class="button-area fade-in">
            <a class="btn refresh-btn" id="refresh" href="#" onclick="randomQuote()"><i class="fa fa-refresh" aria-hidden="true" title="Refresh Quote"></i></a>
        </section>`)
    }

    // // Get random background image
    // const unsplashUrl = "https://api.unsplash.com/";
    // const apiKey = "uNOwDznJR7H5oeC9LQPuU_EfeLY4DPlkGjR3NrpXOP0";
    // const apiCall = unsplashUrl + "search/photos?query=nature" + "&page=" + pageNo + "&client_id=" + apiKey;

    // $.ajax({
    //     url: apiCall,
    //     method: "GET",
    // }).then(function (pictureData) {
    //     console.log(apiCall)
    //     console.log(pictureData)

    //     if (pictureData.results.length === 0) {
    //         console.log("No background images to match the search query")
    //     } else {

    //     var randomImg = Math.floor(Math.random() * 10);

    //     var backgroundImgEl = $(".quote-bg-img");
    //     backgroundImgEl.css('background-image', 'linear-gradient(0deg, var(--background-color), var(--background-color)), url(' + pictureData.results[randomImg].urls.regular + ')');
    // }});
}

$(document).ready(function () {
    populateQuotes();
});

var pictureObject = {
    "total": 80,
    "total_pages": 8,
    "results": []
}
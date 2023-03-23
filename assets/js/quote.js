// Getting the quote data from local storage and storing into a new variable
let quoteDataObject = JSON.parse(localStorage.getItem("quoteData"));
let randomQuoteDataObject = JSON.parse(localStorage.getItem("randomQuoteData"));
let authorInfoObject = JSON.parse(localStorage.getItem("authorInfo"));
let searchTermQuery = localStorage.getItem("searchTerm");
let authorNameQuery = localStorage.getItem("authorName");

// Using math.floor to generate a random page number for the background image
let pageNo = Math.floor(Math.random() * 20);

function populateQuotes() {
    const quoteEl = $("#quote");
    const quoteSnippetsEl = $("#quote-snippets");
    const searchTermTitleEl = $("#search-term-title");
    searchTermTitleEl.text(searchTermQuery);

    if (quoteDataObject !== null) {
        for (let i = 0; i < quoteDataObject.count; i++) {
            searchTermTitleEl.removeClass("hide");
            quoteSnippetsEl.append(`<div class="card fade-in">
              <div class="card-body">
              <p class="quote-text">${quoteDataObject.results[i].content}</p>
              <button class="btn btn-link author-text" id="author-search">${quoteDataObject.results[i].author}</button>
              </div>
            </div>`);
        };

        $(".author-text").on('click', function (event) {
            event.preventDefault();

            const authorName = $(this).text();

            localStorage.setItem("authorName", authorName);
            localStorage.setItem("searchTerm", authorName);

            searchAuthor(authorName);
            wikiAuthorInfo(authorName);
        });
    } else if (randomQuoteDataObject !== null) {
        quoteEl.removeClass("quote-jumbo");
        quoteEl.addClass("random-quote");
        quoteEl.append(`<p class="quote-content text-center fade-in" id="quote-content">${randomQuoteDataObject.content}</p>
        <button class="btn btn-link author-text" id="author-search">${randomQuoteDataObject.author}</button>
        <!--<p class="author fade-in" id="author">${randomQuoteDataObject.author}</p>-->
        <section class="button-area fade-in">
            <a class="btn refresh-btn" id="refresh" href="#" onclick="randomQuote()"><i class="fa fa-refresh" aria-hidden="true" title="Refresh Quote"></i></a>
        </section>`);

        $(".author-text").on('click', function (event) {
            event.preventDefault();

            const authorName = $(this).text();

            localStorage.setItem("authorName", authorName);
            localStorage.setItem("searchTerm", authorName);

            searchAuthor(authorName);
            wikiAuthorInfo(authorName);
        });
    };

    if (authorInfoObject !== null) {
        searchTermTitleEl.after(`<p id="author-excerpt">${authorInfoObject}<span id="see-more"><a href="https://en.wikipedia.org/wiki/${authorNameQuery}" target=”_blank”>- View on Wikipedia</a></span></p>`)
    };

    getRandomBackground();
};

function getRandomBackground() {
    // Get random background image
    const unsplashUrl = "https://api.unsplash.com/";
    const apiKey = "uNOwDznJR7H5oeC9LQPuU_EfeLY4DPlkGjR3NrpXOP0";
    const apiCall = unsplashUrl + "search/photos?query=nature&page=" + pageNo + "&client_id=" + apiKey;

    $.ajax({
        url: apiCall,
        method: "GET",
    }).then(function (pictureData) {
        console.log(apiCall);
        console.log(pictureData);

        if (pictureData.results.length === 0) {
            console.log("No background images to match the search query");
        } else {

        let randomImg = Math.floor(Math.random() * 10);

        const backgroundImgEl = $(".quote-bg-img");
        backgroundImgEl.css('background-image', 'linear-gradient(0deg, var(--background-color), var(--background-color)), url(' + pictureData.results[randomImg].urls.regular + ')');
    }});
};

function searchAuthor(authorName) {
    console.log(authorName)

    $.ajax({
        method: 'GET',
        url: quotableUrl + "search/quotes?query=" + authorName + "&fields=author",
        success: function (authorQuoteData) {
            // If the call is succesful the following will be executed
            console.log(authorQuoteData);

            localStorage.setItem("quoteData", JSON.stringify(authorQuoteData));
        },
        error: function ajaxError(errorData) {
            // If the call errors the following will be executed
            console.error('Error: ', errorData.responseText);
        }
    })
};

function wikiAuthorInfo(authorName) {
    console.log("Wiki Call")
    // Get Author Info from Wikipedia
    const wikiUrl = "https://en.wikipedia.org/w/rest.php/v1/search/page?q=";

    $.ajax({
        method: 'GET',
        url: wikiUrl + authorName + "&limit=1",
        success: function (authorInfo) {
            // If the call is succesful the following will be executed
            console.log(authorInfo);

            localStorage.setItem("authorInfo", JSON.stringify(authorInfo.pages[0].excerpt));
            window.location = './quote.html';
        },
        error: function ajaxError(errorData) {
            // If the call errors the following will be executed
            console.error('Error: ', errorData.responseText);
        }
    });
};

function searchTags(tagName) {
    console.log(tagName)

    $.ajax({
        method: 'GET',
        url: quotableUrl + "search/quotes?query=" + tagName + "&fields=tags",
        success: function (tagQuoteData) {
            // If the call is succesful the following will be executed
            console.log(tagQuoteData);

            localStorage.setItem("quoteData", JSON.stringify(tagQuoteData));
            window.location = './quote.html';
        },
        error: function ajaxError(errorData) {
            // If the call errors the following will be executed
            console.error('Error: ', errorData.responseText);
        }
    })
};

$(document).ready(function () {
    getTags()
    populateQuotes();
});
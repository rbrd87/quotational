// Getting the cocktail data from local storage and storing into a new variable
var quoteDataObject = JSON.parse(localStorage.getItem("quoteData"));
var randomQuoteDataObject = JSON.parse(localStorage.getItem("randomQuoteData"));
var searchTermQuery = localStorage.getItem("searchTerm");

function populateQuotes() {
    console.log(quoteDataObject)
    console.log(searchTermQuery)

    var quoteEl = $("#quote")
    var quoteSnippetsEl = $("#quote-snippets")
    var searchTermTitleEl = $("#search-term-title");
    searchTermTitleEl.text(searchTermQuery);

    if (searchTermQuery !== null) {
        for (let i = 0; i < 10; i++) {
            searchTermTitleEl.removeClass("hide");
            quoteSnippetsEl.append(`<div class="card">
              <div class="card-body">
              <p class="quote-text">${quoteDataObject.results[i].content}</p>
              <p class="author-text">${quoteDataObject.results[i].author}</p>
              </div>
            </div>`);
        };
    } else {
        quoteEl.removeClass("quote-jumbo")
        quoteEl.addClass("random-quote")
        quoteEl.append(`<p class="quote-content text-center fade-in" id="quote-content">${randomQuoteDataObject.content}</p>
        <p class="author fade-in" id="author">${randomQuoteDataObject.author}</p>
        <section class="button-area fade-in">
            <a class="btn refresh-btn" id="refresh" href="#" onclick="randomQuote()"><i class="fa fa-refresh" aria-hidden="true" title="Refresh Quote"></i></a>
        </section>`)
    }

}

$(document).ready(function () {
    populateQuotes();
});
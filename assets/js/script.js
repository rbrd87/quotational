const quotableUrl = "https://api.quotable.io/";

function searchQuote(searchTerm) {
    var noResultsEl = $(".no-results-message")

        $.ajax({
            method: 'GET',
            url: quotableUrl + "search/quotes?query=" + searchTerm
        }).then(function (quoteData) {
            console.log(quoteData)

            // Stored the quoteData object into local storage
            localStorage.setItem("quoteData", JSON.stringify(quoteData));
            // Validation incase no quotes are returned
            if (quoteData.count === 0) {
                console.log("Invalid search")
                noResultsEl.removeClass("hide")
            } else {
                window.location = './quote.html';
            }
        })
};

function randomQuote() {
    // Ajax call to search for a quote from the random endpoint
    $.ajax({
        method: 'GET',
        url: quotableUrl + "random"
    }).then(function (randomQuoteData) {
        console.log(randomQuoteData)

        // Stored the randomQuoteData object into local storage
        localStorage.setItem("randomQuoteData", JSON.stringify(randomQuoteData));

        // Takes the user to the quote page
        window.location = './quote.html';
    })
};

// Event listener for when the user clicks on the search button
$("#search-btn").on('click', function (event) {
    event.preventDefault();
    // Gets the users input
    var searchTerm = $("#search-input").val().trim();

    // Clears the users input box after search is performed
    $("#search-input").val("");

    // Stores the users in put to populate the quote page title 
    localStorage.setItem("searchTerm", searchTerm);

    // Calls the above function using the users input
    searchQuote(searchTerm);
});

// Event listener for when the user clicks on either of the 'Random Quote' buttons
$(".get-random").on('click', function (event) {
    event.preventDefault();

    // Removes any search terms held in local storage in order for the quote page to show the random quote 
    localStorage.removeItem("searchTerm");

    // Calls the above function
    randomQuote();
});

// Clears storage when clicking on home button
$(".home").on('click', function () {
    localStorage.clear();
});

// Added a keyup event listener so the user can enter a value and press enter on the keyboard instead of clicking the button
$("#search-input").on("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();

        $("#search-btn").click();
    };
});
// Kept the quoteableUrl global so it can be accessed everywhere
const quotableUrl = "https://api.quotable.io/";

// Error elements for the UI if validation fails
const noResultsEl = $(".no-results-message");
const emptySearchEl = $(".empty-search-message");

// Function to search for a quote using the users input
const searchQuote = (searchTerm) => {
    // Hides the error messages when the search begins
    noResultsEl.addClass("hide")
    emptySearchEl.addClass("hide")

    // Performs a GET against the quotes/queries endpoint using the users input to search
    $.ajax({
        method: 'GET',
        url: quotableUrl + "search/quotes?query=" + searchTerm,
        success: function (quoteData) {
            // Validation incase no quotes are returned
            if (quoteData.count === 0) {
                console.error("Error: No results returned for this search query. Please try again")
                // Error is shown in the UI
                noResultsEl.removeClass("hide")
            } else {
                // Stored the quoteData object into local storage
                localStorage.setItem("quoteData", JSON.stringify(quoteData));
                
                // Takes the user to the quote page
                window.location = './quote.html';
            }
        },
        error: function ajaxError(errorData) {
            // If the call errors the following will be executed
            console.error('Error: ', errorData.responseText);
            // Error is shown in the UI
            emptySearchEl.removeClass("hide")
        }
    })
};

// Function to get a random quote for the user
const randomQuote = () => {
    // Ajax call to search for a quote from the random endpoint
    $.ajax({
        method: 'GET',
        url: quotableUrl + "random"
    }).then(function (randomQuoteData) {
        // Stored the randomQuoteData object into local storage
        localStorage.setItem("randomQuoteData", JSON.stringify(randomQuoteData));

        // Takes the user to the quote page
        window.location = './quote.html';
    })
};

// Function to get the tags and populate the top 10  with the highest quote count on the homepage
const getTags = () => {
    $.ajax({
        method: 'GET',
        url: quotableUrl + "tags?sortBy=quoteCount"
    }).then(function (tagData) {
        // Function that takes the tagData and extracts the tagNames and saves them into a new array
        $(function () {
            let tagNames = tagData.map(function (i) {
                return i.name;
            });
            // For loop that creates a link for every tag
            for (let i = 0; i < 10; i++) {
                $("#tags").append(`<a href="#" class="btn btn-link tag-btn">${tagNames[i]}</a>`);
            };

            // On-click event that will take the clicked value and store it in local storage and then calls the searchTags function
            $(".tag-btn").on('click', function (event) {
                event.preventDefault();

                const tagName = $(this).text();

                localStorage.setItem("authorName", tagName);
                localStorage.setItem("searchTerm", tagName);

                searchTags(tagName);
            });
        });
    });
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
    localStorage.removeItem("quoteData");
    localStorage.removeItem("authorInfo");

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
// Using math.floor to generate a random page number for the background image
let pageNo = Math.floor(Math.random() * 20)
let searchQuery = "";

// Sending a GET request to retrieve a random quote for the homescreen
function randomQuote() {
    const quotableUrl = "https://api.quotable.io/";

    $.ajax({
        url: quotableUrl + "random",
        method: "GET",
    }).then(function (randomQuoteData) {
        console.log(randomQuoteData)
        searchQuery = randomQuoteData.tags[0]

        var quoteContent = randomQuoteData.content
        var quoteAuthor = randomQuoteData.author
        
        var randomQuoteEl = $("#quote-content");
        randomQuoteEl.text(quoteContent)

        var authorEl = $("#author");
        authorEl.text(quoteAuthor)

        // Get random background image
        const unsplashUrl = "https://api.unsplash.com/";
        const apiKey = "uNOwDznJR7H5oeC9LQPuU_EfeLY4DPlkGjR3NrpXOP0";

        // $.ajax({
        //     url: unsplashUrl + "/search/photos?query=" + searchQuery + "&page=" + pageNo + "&client_id=" + apiKey,
        //     method: "GET",
        // }).then(function (pictureData) {
        //     console.log(pictureData)

        //     var randomImg = Math.floor(Math.random() * 10);

        //     var backgroundImgEl = $(".custom-jumbotron");
        //     backgroundImgEl.css('background-image', 'linear-gradient(0deg, var(--background-color), var(--background-color)), url(' + pictureData.results[randomImg].urls.regular + ')');;
        // });
    });
};

randomQuote()

$("#get-random").on('click', function () {
    var welcomeEl = $("#welcome")
    var randomQuoteEl = $("#random-quote")

    welcomeEl.addClass("hide")
    randomQuoteEl.removeClass("hide")
});

$("#refresh").on("click", function () {
    randomQuote()
})

$("#home").on('click', function () {
    var welcomeEl = $("#welcome")
    var randomQuoteEl = $("#random-quote")
    
    randomQuoteEl.addClass("hide")
    welcomeEl.removeClass("hide")
});
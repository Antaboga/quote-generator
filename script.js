const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

const showLoadingSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const removeLoadingSpinner = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
const newQuote = () => {
    showLoadingSpinner();
    //Pick Random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //If author is null, show unknown
    authorText.textContent = quote.author ? quote.author : 'Unknown';
    // Check Quote length to determine styling
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
};

//Get Quotes from API
const getQuotes = async () => {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const res = await fetch(apiUrl);
        apiQuotes = await res.json();
        newQuote();
    } catch (error) {
        //Catch Error
        // getQuotes();
    }
}

//Tweet Quote
const tweetQuote = () => {
 const twitterApiUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
 window.open(twitterApiUrl,'_blank');
}

//Event Listener
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

//On Load
getQuotes();
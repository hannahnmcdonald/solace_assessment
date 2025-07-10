# Changelog

## PR-1 : UI Improvements

### UI Improvements:
* Addition of Chakra UI library for clean react components
* Added debounce from lodash in order to give the search after each character is typed a bit of a delay before triggering a search, which improves performance
* Added Loading State & Empty state to make user aware that their search is pending or if they have no results
* Changed the keys for each result row, as using index as the key is bad practice (for DOM rendering/performance)
* Added simple CSS for hover state on each row to change the color to blue. Might be simple, but I find it easier to read.
* Changed some of the Text fields to Headings. This is better semantically and for accessibility. I would spend some more time here if I had the time.

## PR-2 : API Improvements

### API Improvements: 
* Added indexes to first_name, last_name, and city columns for query speed. I figured that these fields are probably the most popular for a user to be searching for, so I went with these (although on second thought, Specialty may be a good one to have indexed as well)
* ... and thats pretty much it, unfortunately 😔 I ran out of time to do all that I wanted to after having some Docker issues for a little bit. I added some comments into DISCUSSION.MD about some more things I would do if I had more time.
# Further improvements if I had the time 😅

## UI:
* Instead of joining all the advoate's specialties together, separated by a comma, I would implement some sort of badge for each. The specialties could still appear in a list right next to eachother, but they would easier to read because they would look visually more separated
* Sorting toggle on each column would be nice, I feel like this would be userful for the user especially for fields like Years of experience. 

## API:
* I would add another index onto the specialty names for each advocate, or even further allow the user to search specifically by specialty.
* I would add pagination to this 100%. I know this isn't a huge amount of data, atleast not right now, but it's a bit heavy to be making a DB call to get ALL the rows at once, especially if this list eventually becomes very large, it would be best to implement this now to scale later. I would pass a limit & offset to the DB query (limt being the # of rows to return, offset being the amount of rows to skip, considering how many pages have already been seen by the user). This would ensure the backened is only returning one page of data, and if the user needs more, another query can be made. 
* Caching the first page of results may also be something to consider

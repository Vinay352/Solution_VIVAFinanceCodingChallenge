# Part 2 - Processing Payments at scale

The payment processing you did in part 1 is a good approximation of the way payments processing was handled for over a year on the engineering team. However, as you can probably imagine, we used a real database instead of a database json file. For this portion of the challenge we ask that you design this database to efficiently support hundreds of thousands of users and payment files with thousands of rows of payments.

Questions to answer:

How would you set up a database with the same fields as the _db.json_ file? What would you choose as the primary key? Would you want to add additional indices? If so what would they be?

Using this db design that you create, how would you modify your payment processing function to efficiently interact with the database? Why is this more efficient than your solution in part1? Discuss the time complexity of both the solution in part1, and the time complexity using your database design.

## Notes:

- Part 2 is not is not a coding challenge! This is your opportunity to highlight your skills around database architecture, problem solving, technical communication, and research. You may write pseudo code if it is the most concise way to get your point across but it is designed as a writing problem.
- Feel free to look to the web for inspiration, but ensure that the content you submit is written by you and is your own work.
- If you would like to add any diagrams feel free to draw it out by hand, take a picture of the paper and add it as a pdf to the submission. Don't worry about making it visually appealing unless you really feel that is the best way for you to convey your ideas.

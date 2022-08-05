This is a file that answers the part2 of the VIVA Finance Coding challenge about creating a database.

Listing the attributes in the db.json file:-
    1) employer
    2) mask
    3) firstName
    4) lastName
    5) amountExpected
    6) username

Since the data follows a specific structure we can store this information
in a relational database, with the tabular format representation, from 
which we can easily derive necessary information and insights using a query
language like SQL. This would not only facilitate easy querying of data but 
also very clear and an easy to comprehend representaion of the data to the 
user as well. We can have the attributes as the column headers. Since the 
information that we are storing here is about how much are the users expected
to pay, i.e. it's every entry has details related to a user's specific data,
therefore i believe the primary key should be 'username', as the table is about
user's payment details and every user has a unique username assigned to them.
If one is unaware of the someone's username, but still wants to find the user 
details in the database, we can add 'mask' as a candidate key as this is also 
unique for every entry.

Now notice that in the database, every entry has 3 distinct type of information.
    1) About employer
    2) About user
    3) About money owed (pending payments)

Having all this information in a single table, in my opinion will introdcue data 
redundancy when the data scales in volume. Same information about an employer or 
a user might be repeated unnecessarily for a number of times. Therefore to avoid 
this, we can normalize the data and spread different types of information into 
different tables. For example here, when designeing the database, we can create an 
'employer' table solely for the employer details (let employerId be the primary key), another 
table 'user' solely for the user details (let userId or username be the primary key) and 
one more table 'owed' for the storing the details related to money owed by a particular
user and which employer is the user related to. The need to divide the data into 
different tables would be extremely important when dealing with large volume of data 
as when data size increases, it is highly likely that redundant and repeated data will 
also increase and use unnecessary space, adding to the unnecessary excess cost for the 
business.  

Table 'employer':
    1) employerId (primary key)
    2) employerName
    3) address ...

Table 'user':
    1) userId or username (primary key)
    2) firstName
    3) lastName
    4) address ...

Table 'owed':
    1) employerId (primary key)
    2) userId or username (primary key)
    3) amountExpected

Note that in table 'owed', 'employerId' and 'userId' both together form the primary key 
for the table. This type of database design will be very helpful in reducing data redundancy.

It becomes very easy to answer the first part of the coding challenge using the above 
database design. The desired ouput contains the username, applied and owed attributes. In 
table owed, we already have userId or userName and amountExpected. We can directly join this 
table with the 'user' and 'employer' table to get user and employer details, and along with 
that the 'payments' table (from payments.csv file) to get the amount to be deducted from 
amountExpected. The solution is very straightforward then.

Extra note: If we wish to find details regarding the money 'owed' by some user and/or which 
employer does the user belong to, like what is the employer name, what is the user first 
name etc, then we would have to perform JOINS between multiple tables to get the necessary 
information. This is fine. But after a certain threshold when the data becomes too large
such that performaing join operation also takes significant time and is very costly, then 
in that scenario having the data in denormalized form would be a better option as there 
wouldn't be much need for join operations (w.r.t the type of case we're discussing here). 
In that scenario, all information would be one place or one document and we could use a 
NoSQL database language like MongoDB for querying the database for necessary information.
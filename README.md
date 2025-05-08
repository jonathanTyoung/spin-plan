userStories

#1 As a user(notDJ)
Given I am not logged into the system
When I navigate to the login page
Then I should see the option to input my email to login
And then brought to the Welcome/Home page of the app

As a new user
Given I am not logged into the system, nor have been before
when i navigate to the login page, it should direct me to the register page to sign up
Then I should see the option to input my name and email to register
And then brought to the Welcome/Home page of the app


#2 As a user(notDJ) 
Given I am logged into the system
When I navigate to the Event List page
Then I should see my events sorted by event date (newest first)
And each order event display its ID, DJ name, and venue


#3 As a user(notDJ)

Given I am logged into the system
When I select an event from my personal Event List
Then I should see the complete event details including:

Event ID and event date
DJ information
List of all addOns in the order
Individual cost for each addOn
Base cost of the venue
Total cost for the entire event

#4 as a user(notDJ)

given I am logged into the system and on the home page,
when I navigate to the create event tab in navBar,
then I should be able to start creating my event by inputting the name, type and date of event
and each choice should dynamically get added to the event properties, and the event is created in database,
and then I'm redirected to the event details page where I can make further selections 

then I should be able to access either the navBar or the listed selections on this Event Details page


#5 as a user(notDJ)
given I am logged into the system and making selections for my event
when i navigate to the addOns tab,
then i should be able to select multiple radio buttons that display names and prices,
and upon clicking the update selections for event button, the total cost is updated and I am redirected to my event creation page

#6 as a user(notDJ)
given I am logged into the system and making selections for my event
when i navigate to the DJs tab,
then i should be able to select a single radio buttons that displays the name ad price of the DJ,
and upon clicking the update selections for event button, the total cost is updated and I am redirected to my event creation page

#7 as a user(notDJ)
given I am logged into the system and making selections for my event
when i navigate to the addOns tab,
then i should be able to select multiple radio buttons that display names and prices,
and upon clicking the update selections for event button, the total cost is updated and I am redirected to my event creation page


#7 as a user(notDJ)
given I am logged into the system 
when I clicked on the logout button in the navBar
then i should be logged out and not able to access the website any longer
and I am redirected to the login page



Stretch Goals

#1 as a user(DJ)
given I am using a DJ's email, 
when I login as a DJ
then I will have access to a different view of the website
and the navBar will appear the same with an additional profile tab

#2 as a user(DJ)
given I am logged into the system
when I click on the CreateEvent in the Nav Bar,
then just like a nonDJUser, I can make myself an event if I want
and i can do the same things as the nonDJUser

#3 as a user(DJ)
given I am logged into the system
when I click on the UpcomingEvents tab in the nav bar,
then I am directed to my upcoming events that I can either accept or deny
And those events will be displayed on to me

#4 as a user(DJ)
given I am logged into the system
when I am on my Upcoming Events page,
then I can click on the event itself to view the details (date, type, venue, addOns)
And here too I can accept or deny the event 

#5 as a userDJ
given I am logged in
when i go to the Profile tab in the NavBar 
then I can update my profile as a DJ 
and i can change my name, sampleSetList link




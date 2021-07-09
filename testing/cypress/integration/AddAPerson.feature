# High level description of the implemented feature and groups related scenarios.
Feature: Registration in CRUD-sample app.
I want to register a new person on the CRUD-sample website.

# Describes a business rule of the application to be tested.
Scenario: Register a single person.

# Describes the initial context of the system, something that happened in the past, puts the system in a known state.
Given I'm on CURD-sample's main page
# And, But keywords: Used when we need to use mutiple Given's, When's or Then's.
# Example: And the 'Add a new person' overlay is open

# Describes the event to be done in the application.
When I register a person with the name as "Amara Diaz" and job as "Software Developer" and address as "Dubrovnik St." and phone as 892834234 and has kids as false

# Describes the expected outcome or result after the events described by the "When" keyword.
Then the person should be registered in the application with the proportioned data
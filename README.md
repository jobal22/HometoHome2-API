# Home to Home API

This is an API that was made for the 'Home to Home App.'

## Link:
https://radiant-caverns-61441.herokuapp.com

##Documentation
The Database contains two tables: 1) lists and 2) addresses. The current use for the API only uses 'lists' for GET requests. However, 'addresses' is used for GET, POST, PATCH, and DELETE request.

GET
In order to make a GET request to lists use the endpoint '/api/lists' and for addresses use the endpoint '/api/addresses'.

POST
For POST request, use '/api/addresses' as the endpoint. POST requires 'street,' 'city,' 'state,' and 'zip.' The other information that can be included but not required with POST is 'name,' 'email,' 'gospelpresentation,' newsalvations,' and 'notes.' Please note that the information entered here is based on the resident(s) not the user. 
An example of a POST requests:
{
	"street": "12345 Stanson Rd",
	"city": "Atlanta",
	"state": "GA",
	"zip": "78912",
	"name": "N/A",
	"email": "N/A",
	"gospelpresentation": "N/A",
	"newsalvations": "0",
	"notes": "N/A"
}

PATCH
For PATCH request, use '/api/addresses/:addressId' as the endpoint. In order to submit the PATCH request, the users will need to navigate to an address' specific 'id.' Any information updated for the address will need to be wrapped in " ".
An example of a PATCH requests:
{
	"street": "12345 Stanson Rd",
	"city": "Atlanta",
	"state": "GA",
	"zip": "78912",
	"name": "Doug",
	"email": "DougNascarDreams@email.com",
	"gospelpresentation": "Yes",
	"newsalvations": "0",
	"notes": "Asked us to come back tomorrow at 1pm."
}

DELETE
For DELETE request, use '/api/addresses/:addressId' as the endpoint. In order to submit the PATCH request, the users will need to navigate to an address' specific 'id.'

## Description
This API connects to a Database that has two tables: 1) lists and 2) addresses. The relationships between the lists and addresses are found in the 'gospelPresentation' and the 'newSalvations' columns. The API allows the App to make GET, POST, PATCH, and DELETE request for the addresses table.

## Technologies Used
Node/Express/PostgreSQL/JSON/TSQL
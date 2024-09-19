api/auth/signup POST
req example:
{
	"username" : "tutor1",
	"email" : "tutor1@test.com",
	"user_type": "tutor",
	"password" : "towl123"
}

return:
200
{
	"message": "User registered successfully"
}

400
{
	"message": "failed,  username already taken"
}


api/auth/signin POST
req:
{
	"username" : "tutor1",
	"password" : "towl123"
}

return:
{
	"id": "820d20f2-ec59-44d1-8920-8a9ab0d8fd5e",
	"username": "tutor1",
	"email": "tutor1@test.com",
	"user_type": "tutor",
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODIwZDIwZjItZWM1OS00NGQxLTg5MjAtOGE5YWIwZDhmZDVlIiwiZW1haWwiOiJ0dXRvcjFAdGVzdC5jb20iLCJpYXQiOjE3MjY3MjQzNzUsImV4cCI6MTcyNjgxMDc3NX0.LrdpHo5t_Aj4HgmCr5BMed4bXUG4wCXxxgEtEY482so"
}

{
	"message": "User not found."
}

{
	"accessToken": null,
	"message": "Invalid password!"
}

(probably should  have made 1  response , either pw wrong or user not exist)


/api/update/user POST
header:
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODIwZDIwZjItZWM1OS00NGQxLTg5MjAtOGE5YWIwZDhmZDVlIiwiZW1haWwiOiJ0dXRvcjFAdGVzdC5jb20iLCJpYXQiOjE3MjY3MjQzNzUsImV4cCI6MTcyNjgxMDc3NX0.LrdpHo5t_Aj4HgmCr5BMed4bXUG4wCXxxgEtEY482so

req:
{
    "nama": "Jane Doe",
    "gender": "female",
    "age": 29,
    "contact_number": "987654321",
    "grade": ["A", "B"],
    "availability": ["mon", "wed"],
    "price_preference": [150, 250]   
}

return:
{
	"message": "Profile updated successfully."
}

/api/test/user GET
header:
(x access token like before)
return:
{
	"message": "unauthorized!"
}
{
	"message": "Welcome Tutor"
}
{
	"message": "Welcome Student"
}
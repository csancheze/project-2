function generateEmail(category, id) {
    return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Event</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100&family=Lexend:wght@200;500&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: 'League Spartan', sans-serif; background-color: #83cee0;; ">
        <header style="background-color:#5f5dbd;">
            <a style="text-decoration: none; href="#"><h1 style="text-align:center; font-size: 50pt; color:#83cee0">Ü Meet</h1></a>
        </header>
        <main>
        <a style="text-decoration: none; text-align:center" href="#"><p style="color:white; font-size: large; text-align:center">Hey! Someone has created a new event in ${category} that might interest you! Come back to see what's happening at Ü Meet<p></a>
        <p>https://u-meet-app.herokuapp.com/category/${id}</p>
        </main>
    </body>
    </html>`
}


module.exports = generateEmail;

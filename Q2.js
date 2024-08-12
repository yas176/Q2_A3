const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    let visitCount = req.cookies.visitCount ? parseInt(req.cookies.visitCount) : 0;
    visitCount += 1;

    // Get the current date and time
    const currentDate = new Date();

    if (visitCount === 1) {
        res.cookie('visitCount', visitCount, { maxAge: 900000, httpOnly: true });
        res.cookie('lastVisit', currentDate.toString(), { maxAge: 900000, httpOnly: true });
        res.send('Welcome to my webpage! It is your first time that you are here.');
    } else {
        const lastVisit = new Date(req.cookies.lastVisit);
        res.cookie('visitCount', visitCount, { maxAge: 900000, httpOnly: true });
        res.cookie('lastVisit', currentDate.toString(), { maxAge: 900000, httpOnly: true });

        const lastVisitMessage = `Last time you visited my webpage on: ${lastVisit.toString()}`;
        res.send(`Hello, this is the ${visitCount} time that you are visiting my webpage.<br>${lastVisitMessage}`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

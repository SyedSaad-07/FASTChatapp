const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.js')

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSID, authToken);

// set-up middleware
app.use(cors()); // allow us to make cross-origin request
app.use(express.json())  // this will allow us to pass JSON payload from Front-end to the Back-end
app.use(express.urlencoded()); // build-in middleware function in express

// root-route
app.get('/', (req, res) =>{
    res.send('hello');
});

app.post('/', (req,res) => {
    const {message, user: sender, type, members } = req.body;

    if(type === 'message.new') {
        members.filter((member) => member.user_id !== sender.id)
        .forEach(( {user} ) =>{
            if(!user.online){
                twilioClient.messages.create({
                    body: `You have a new message from ${message.user.email} ${message.user.username} - ${message.text}`,
                    messagingServiceSid: messagingServiceSid,
                    to: user.phoneNumber
                })
                .then(() => console.log('Message Sent!'))
                .catch((err) => console.log(err));
            }
        })
        res.status(200).send('Message sent! ');
    }
    return res.status(200).send('Not a new message request! ');
})
app.use('/auth',authRoutes)

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));


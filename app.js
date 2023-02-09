const openai = require('openai');
const express = require('express')
const ejs = require('ejs')
const https = require('https');
const bodyParser = require('body-parser')

const app = express()
// organization: "org-XFskBKdgOxS7f1EKrrR09Sfy",
// apiKey: "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",

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get("/",(req,res)=>{
    res.render('index',{url:"https://htmlcolorcodes.com/assets/images/colors/white-color-solid-background-1920x1080.png"})
})








    app.post('/', (req, res) => {
        // Replace YOUR_API_KEY with your actual API key
        const apiKey = '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';
    
        // Extract the image generation model name from the request body
        // const { model } = req.body;
    
        // Extract the image generation prompt from the request body
        const  prompt  = req.body.userInput;
    
        // Set up the request options
        const options = {
            hostname: 'api.openai.com',
            path: '/v1/images/generations',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        };
    
        // Make the API request
        const apiRequest = https.request(options, (apiResponse) => {
            let data = '';
    
            apiResponse.on('data', (chunk) => {
                data += chunk;
            });

    
            apiResponse.on('end', () => {
                const response = JSON.parse(data);
                res.render('index',{url:response.data[0].url})
             
                // handle the response
            });
        });
    
    
        // Send the request body
        apiRequest.write(JSON.stringify({
            model: "image-alpha-001",
            prompt: prompt,
            num_images: 1
        }));
    
        apiRequest.end();


    });
    



app.listen(3000,(err)=>{
    if(!err)
    console.log("server started at port 3000");
})






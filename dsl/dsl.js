const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5004;

const cmdPostCall = async (req, res) => {
    console.log(req.body)

    const { cmd } = req.body;
    
    exec(cmd, (err, stdout, stderr) => {
        console.log({ err, stdout, stderr });
        
        if (err) {
        return res.status(400).send(JSON.stringify(err))
        }
        
        // Output of the script in stdout
        return res.status(200).send(stdout)
    });
  };


app.use(express.json());


app.post('/cmd/',cmdPostCall);
app.get('*', (req, res) => res.status(200).send({message: 'CitiusCloud Calm-Wrapper Application',}));
app.listen(port, () => { console.log(`CitiusClous's Calm-Wrapper app is running on port ${port}.`); });



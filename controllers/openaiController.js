const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//this is where we go into the openai library. 
const generateImage = async (req,res) => {
  const { prompt, size }  = req.body; 
  //size instead choosing pixels 
  const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' :  '1024x1024';

  try {
    const response = await openai.createImage({
      //this prompt will describe our image that we input. 
      prompt,
      //numeber of images aka responses. But this can be mulit response where in the fronend one can choose. 
      n:1,
      size: imageSize
    })
    //get the data from the array and in this case it's first item. 
    const imageUrl = response.data.data[0].url
    
    res.status(200).json({
      success:true,
      data:imageUrl
    })

  } catch(error){
    // this will tell the developer why is the error happening. 
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success:false,
      //this mostly will happen if one ask something that violates the policy. 
      error: 'The image could not be generated.'
    })
  }
};

module.exports = { generateImage };
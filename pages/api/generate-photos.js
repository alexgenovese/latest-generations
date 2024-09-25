import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { ComfyDeploy } from 'comfydeploy';
// import axios from 'axios';
// import FormData from 'form-data';
// import { v4 as uuidv4 } from 'uuid';
// import sharp from 'sharp';
// import { checkStatus } from "@/server/polling";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);
const client = new ComfyDeploy({
    bearerAuth: process.env.comfydeploy_api_key,
});

async function checkStatus(run_id) {
    return await client.client.run.get({
        run_id: run_id,
    })
}

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
    try {
        const fileContent = await fs.promises.readFile('./prompts.txt', 'utf-8');
        const prompts = fileContent.split('---').map(prompt => prompt.trim());
        
        for (const prompt of prompts) {
            console.log('Processing prompt:', prompt)
            
            // Step 1: Send request to ComfyDeploy
            const result = await client.run.create({
                deployment_id: "41f9a271-1791-4d57-8be7-921c42137c1e",
                // webhook: "http://localhost:3000/api/webhook",           // suggested
                inputs: {
                    "prompt": prompt,
                    "steps_1": 8,
                    "steps_2": 8,
                    "guidance_1": 4,
                    "guidance_2": 8,
                    "width": 768,
                    "height": 1024,
                    "scale": 2,
                    "upscale_steps": 4
                }
            });

            
            
            if (result) {
                const runId = result.runId
                // save runId to database
                console.log('runId', runId)
            }
  
        // polling for the result
        let imageUrl;
        while (!imageUrl) {
            // const local_file = await axios.get(`http://localhost3000/api/read-file-id?query=${runId}`);
            // const data = JSON.parse(local_file);

            // if ( data ) {
            //     imageUrl = data;
            // }

            checkStatus(runId).then((res) => {
                if (res && res.status === "success") {
                    console.log(res.outputs[0]?.data);
                    imageUrl = res.output[0]?.data
                }
            });

            await new Promise(res => setTimeout(res, 5000)); // Wait 5 seconds before retrying
        }

        console.log('get from endpoint:', imageUrl)

        // // Step 3: Download and process image
        // const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        // const imageBuffer = await sharp(imageResponse.data).jpeg({ mozjpeg: true }).toBuffer();

        // // Step 4: Upload the image to Cloudinary
        // const cloudinaryForm = new FormData();
        // cloudinaryForm.append('file', imageBuffer, {
        //     filename: `${uuidv4()}.jpeg`,
        //     contentType: 'image/jpeg',
        // });
        // cloudinaryForm.append('upload_preset', 'your_preset_name');

        // const cloudinaryResponse = await axios.post(process.env.CLOUDINARY_URL, cloudinaryForm, {
        //     headers: cloudinaryForm.getHeaders(),
        // });

        // const { secure_url: secureUrl, format } = cloudinaryResponse.data;

        // // Step 5: Save image data to Supabase
        // const { error: imageError } = await supabase
        //     .from('latest_generations')
        //     .insert({
        //         prompt: prompt,
        //         image_name: secureUrl,
        //         image_format: format,
        //     });

        // if (imageError) {
        //     throw new Error(`Error saving image data: ${imageError.message}`);
        // }
    }

    // cleanup txt file
    // await fs.promises.writeFile(fileContent, "", 'utf-8');

    res.status(200).json({ message: 'All prompts processed successfully.' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

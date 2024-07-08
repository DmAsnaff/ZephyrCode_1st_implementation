import dotenv from 'dotenv'
dotenv.config()

import { v4 as uuidv4 } from 'uuid';
// import express from "express"
import bodyParser from "body-parser"
import authenticationRouter from './routes/autheticationRouter'
import feedbackRouter from './routes/feedbackRouter'
import cors from 'cors'
// import { bucket } from "./constant/firebaseAdmin"
import multer from 'multer';
import stream from 'stream'

import express, { Request, Response } from 'express';
// import multer from 'multer';
import { PythonShell } from 'python-shell';
import path from 'path';
import fs from 'fs';
 import { PrismaClient } from '@prisma/client';
import admin from 'firebase-admin';
// import { v4 as uuidv4 } from 'uuid';

// import { dbDisconnector, prisma } from './prisma/database'






const app = express()
const PORT = 5000

process.env.NODE_OPTIONS = '--openssl-legacy-provider';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())


// app.use(express.json());

// // Define a route to insert hairstyles
// app.post('/hairstyles', async (req, res) => {
//   try {
//     const { gender, face_shape, age_range, hairLength, dresscode, imageLink, how_to_achieve, Products_to_achieve } = req.body;

//     const newHairstyle = await prisma.hairstyle.create({
//       data: {
//         gender,
//         face_shape,
//         age_range,
//         hairLength,
//         dresscode,
//         imageLink,
//         how_to_achieve,
//         Products_to_achieve
//       },
//     });

//     res.json(newHairstyle);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error creating hairstyle entry' });
//   }
// });



app.get('/', (req, res) => {
  return res.json({
    "Result": "Success"

  })

})

const users = ["asnaff"]

app.get('/users', (req, res) => {
  return res.send(users)
})

// const upload = multer();


// app.post('/upload', upload.single('file'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const fileName = req.file.originalname;
//   const fileBuffer = req.file.buffer;

//   console.log({
//     file: req.file
//   })

//   const blob = bucket.file(fileName);
//   const blobStream = blob.createWriteStream({
//     metadata: {
//       contentType: req.file.mimetype,
//       metadata: {
//         firebaseStorageDownloadTokens: uuidv4() // Generate a download token
//       }
//     }
//   });

//   blobStream.on('error', (err) => {
//     console.error('Error uploading file:', err);
//     res.status(500).send('Error uploading file.');
//   });

//   blobStream.on('finish', () => {
//     //@ts-ignore
//     const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media&token=${blob.metadata.metadata.firebaseStorageDownloadTokens}`;
//     res.status(200).send({ fileName, url: publicUrl });
//   });

//   blobStream.end(fileBuffer);

// });


// Firebase setup
const serviceAccount = require('./constant/zephyrcode-firebase-adminsdk-9fxps-ad336a51bf.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://zephyrcode.appspot.com'
});
const bucket = admin.storage().bucket();


const prisma = new PrismaClient();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.post('/analyze-face', upload.fields([{ name: 'front_face' }, { name: 'side_face' }]), async (req: Request, res: Response) => {
  const frontFacePath = (req.files as { [fieldname: string]: Express.Multer.File[] })['front_face'][0].path;
  const sideFacePath = (req.files as { [fieldname: string]: Express.Multer.File[] })['side_face'][0].path;
  const { email, gender, ageRange, dressCode, hairLength } = req.body;

  let faceShapeResult = '';
  let baldnessResultFront = '';
  let baldnessResultSide = '';
  let frontImageUrl = '';
  let sideImageUrl = '';
  let hairstyleTransferredImageUrl = ''; // Placeholder for the hairstyle transferred image URL



  // const options = {
  //   mode: 'text',
  //   pythonPath: path.join(__dirname, '../ml_service/venv/Scripts/python'), // Specify the Python executable in the virtual environment
  //   args: [frontFacePath]
  // };

  try {
// Define the base options
const baseOptions: Parameters<typeof PythonShell.run>[1] = {
  mode: 'text',
  pythonPath: path.join(__dirname, '../../venv_zc/python'),
};

// Run face shape classifier
faceShapeResult = await new Promise<string>(async (resolve, reject) => {
  const options = {
    ...baseOptions,
    args: [frontFacePath]
  };

  try {
    const results = await PythonShell.run(path.join(__dirname, '../ml_service/face_shape_classifier.py'), options);
    resolve(results && results.length > 0 ? results[0] : '');
  } catch (err) {
    reject(err);
  }
});

// Run baldness detector for front face
baldnessResultFront = await new Promise<string>(async (resolve, reject) => {
  const frontOptions = {
    ...baseOptions,
    args: [frontFacePath, 'front']
  };

  try {
    const results = await PythonShell.run(path.join(__dirname, '../ml_service/baldness_detector.py'), frontOptions);
    resolve(results && results.length > 0 ? results[0] : '');
  } catch (err) {
    reject(err);
  }
});

// Run baldness detector for side face
baldnessResultSide = await new Promise<string>(async (resolve, reject) => {
  const sideOptions = {
    ...baseOptions,
    args: [sideFacePath, 'side']
  };

  try {
    const results = await PythonShell.run(path.join(__dirname, '../ml_service/baldness_detector.py'), sideOptions);
    resolve(results && results.length > 0 ? results[0] : '');
  } catch (err) {
    reject(err);
  }
});

    if (baldnessResultFront === 'No Bald' && baldnessResultSide === 'No Bald') {
      // Fetch hairstyle recommendations from the database
      const recommendations = await prisma.hairstyle.findMany({
        where: {
          face_shape: faceShapeResult,
          gender: gender,
          age_range: ageRange,
          dresscode: dressCode,
          hairLength: hairLength
        }
      });

      // Upload front face image to Firestore
      frontImageUrl = await uploadToFirestore(frontFacePath, 'front_face');

      // Upload side face image to Firestore
      sideImageUrl = await uploadToFirestore(sideFacePath, 'side_face');

      // Save details to userhistory table
      await prisma.userHistory.create({
        data: {
          email: email,
          front_image_link: frontImageUrl,
          side_image_link: sideImageUrl,
          gender: gender,
          faceshape: faceShapeResult,
          hairstyle_transferred_image_link: hairstyleTransferredImageUrl, // Update this once you implement the hairstyle transfer logic
          actionDateTime: new Date().toISOString(), // Use full ISO-8601 DateTime string
          agerange: ageRange,
          dresscode: dressCode,
          hairlength: hairLength
        }
      });

      res.json({ faceShape: faceShapeResult, recommendations });
    } else {
      res.json({ faceShape: faceShapeResult, message: "Sorry, don't have suggestions." });
    }

    // Cleanup uploaded files
    fs.unlinkSync(frontFacePath);
    fs.unlinkSync(sideFacePath);
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
});
  
  async function uploadToFirestore(filePath: string, fileType: string): Promise<string> {
    const fileName = path.basename(filePath);
    const blob = bucket.file(`${fileType}/${fileName}`);
    const fileBuffer = fs.readFileSync(filePath);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: 'image/jpeg',
        metadata: {
          firebaseStorageDownloadTokens: uuidv4() // Generate a download token
        }
      }
    });
  
    return new Promise<string>((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject('Error uploading file: ' + err);
      });
  
      blobStream.on('finish', () => {
        const downloadToken = blob.metadata?.metadata?.firebaseStorageDownloadTokens || '';
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media&token=${downloadToken}`;
        resolve(publicUrl);
      });
  
      blobStream.end(fileBuffer);
    });
  }







app.post('/users', (req, res) => {
  console.log("params", req.body)
  const newUser = req.body.username
  users.push(newUser)
  return res.send("success")
})

app.use(authenticationRouter)
app.use(feedbackRouter)

app.listen(PORT, () => {
  console.log("Backend is running on", PORT)
})

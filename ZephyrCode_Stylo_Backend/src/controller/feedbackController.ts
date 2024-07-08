import { Request, Response } from 'express';
import { dbDisconnector, prisma } from '../prisma/database';

export const feedbackHandler = async (req: Request, res: Response) => {
  const { email, rating } = req.body;

//   try {
//     // Create feedback entry
//     const feedback = await prisma.feedback.create({
//       data: {
//         email,
//         rating,
//       },
//     });

//     res.status(201).json({ message: 'Feedback submitted successfully', feedback });
//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   } finally {
//     dbDisconnector(); // Assuming this function disconnects your database connection
//   }
// };
try {
  // Retrieve user by email
  const user = await prisma.user.findUnique({
    where: { email }
  });
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Create feedback entry
  const feedback = await prisma.feedback.create({
    data: {
      rating,
     email:user.email
    }
  });
  
  res.status(201).json({ message: 'Feedback submitted successfully', feedback });
} catch (error) {
  console.error('Error submitting feedback:', error);
  res.status(500).json({ error: 'Internal server error' });
}
}
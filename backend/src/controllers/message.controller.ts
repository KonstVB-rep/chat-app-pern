import { Response, Request } from "express";
import prisma from "../../db/prisma.js";
import { handleError } from "../utils/handleError.js";

const sendMessage = async (req: Request, res: Response) => {

  try {
    const { id: receiverId } = req.params;
    const { message } = req.body;
    const senderId =
      req.user.id; /*user в req добавили в ./middlewares/protectRoute*/

    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
      },
    });

    if (!newMessage) {
      return res.status(400).json({ error: "Message not sent" });
    }

    conversation = await prisma.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
    });

    res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("Error in sendMessage controller: ", error.message);
    handleError(res, error);
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const sender =
      req.user.id; /*user в req добавили в ./middlewares/protectRoute*/

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [sender, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error: any) {
    console.log("Error in getMessages controller: ", error.message);
    handleError(res, error);
  }
};

const getSidebarUsers = async (req: Request, res: Response) => {
    try {
       const authUserId = req.user.id /*user в req добавили в ./middlewares/protectRoute*/

       if(!authUserId) {
           return res.status(401).json({error: "Unauthorized"});
       }

       const users = await prisma.user.findMany({
           where: {
               id: {
                   not: authUserId
               }
           },
           select: {
               id: true,
               fullName: true,
               profileImage: true
           }
       });

       res.status(200).json(users);

      } catch (error: any) {
        console.log("Error in getSidebarUsers controller:", error.message);
        handleError(res, error);
      }
}

const messageController = { sendMessage, getMessages, getSidebarUsers  };

export default messageController;


const fetchSendMessage = async (_prev: unknown, formData: FormData) => {
    
    try {
      const message = formData.get("message") as string;
      const authUserId = formData.get("senderId") as string;
      const response = await fetch(`/api/messages/send/${authUserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log((error as Error).message || error);
    }
  };

  export default fetchSendMessage
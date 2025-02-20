export const getProfileImage = (gender: string, username: string): string => {
    const profilePic: Record<string, string> = {
      male: `https://avatar.iran.liara.run/public/boy?username=${username}`,
      female: `https://avatar.iran.liara.run/public/girl?username=${username}`,
    };
    return profilePic[gender] || "";
  };
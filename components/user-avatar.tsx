import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export const UserAvatar = () => {

  return (
    <Avatar className="h-8 w-8 border-2 border-black">
      <AvatarImage src={'user.svg'} />
      <AvatarFallback>
        S
      </AvatarFallback>
    </Avatar>
  );
};



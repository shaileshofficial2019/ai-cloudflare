import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8 border-2 border-black">
      <AvatarImage className="p-1" src="/logo.svg" />
    </Avatar>
  );
};

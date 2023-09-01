import { authModalState } from "@/atoms";
import { CustomerPanelContainer } from "@/styles/Panel/Panel";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { useUser } from "@supabase/auth-helpers-react";
import { useRecoilState } from "recoil";
import { Icons } from "../../app/Icons";

function CustomerPanel() {
  const user = useUser();
  const [isOpen, setIsOpen] = useRecoilState(authModalState);

  return (
    <CustomerPanelContainer>
      <Icons.bell />
      {user ? (
        <Avatar
          classNames={{
            base: "bg-gradient-to-br from-[#ffafe67b] to-[#ff005da2]",
            icon: "text-white/70",
          }}
          name={user.user_metadata.user_name}
        />
      ) : (
        <Button
          startContent={<Icons.user2Icon />}
          variant="ghost"
          radius="full"
          isIconOnly
          onPress={() => setIsOpen(true)}
        />
      )}
    </CustomerPanelContainer>
  );
}
export default CustomerPanel;

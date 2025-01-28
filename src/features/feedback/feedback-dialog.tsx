import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import { Textarea } from "@/components/ui/textarea";
import { useDialog } from "@/hooks/use-dialog";
import { useFeedback } from "@/features/feedback/use-feedback";
import { useInput } from "@/hooks/use-input";
import { cn } from "@/lib/utils";
import { MessageSquareTextIcon } from "lucide-react";

export const FeedbackDialog = () => {
  const dialog = useDialog();

  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.onOpenChange}>
      <Dialog.Trigger asChild>
        <IconButton
          className={cn("fixed right-4 bottom-4", dialog.isOpen && "invisible")}
          size="small"
          aria-label="피드백 남기기"
          variant="primary"
        >
          <MessageSquareTextIcon size={16} />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content className="flex flex-col w-[480px]" animation="slide">
        <FeedbackDialogContent onClose={dialog.close} />
      </Dialog.Content>
    </Dialog>
  );
};

type FeedbackDialogContentProps = {
  onClose: () => void;
};

const FeedbackDialogContent = ({ onClose }: FeedbackDialogContentProps) => {
  const input = useInput();

  const { isPending, submit } = useFeedback();

  const onSubmit = async () => {
    await submit(input.value);
    onClose();
  };

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>피드백 남기기</Dialog.Title>
        <Dialog.Description>
          기능 추가 아이디어, 의견 등을 남겨주세요.
        </Dialog.Description>
      </Dialog.Header>
      <Textarea
        value={input.value}
        onChange={input.onChange}
        maxLength={1000}
        className="my-4 min-h-[120px]"
        placeholder="최대 1,000자까지 입력 가능합니다"
      />
      <Dialog.Footer>
        <Button
          disabled={input.value.length === 0 || isPending}
          onClick={onSubmit}
        >
          전송하기
        </Button>
      </Dialog.Footer>
    </>
  );
};

"use client";

import { cn } from "@/lib/utils";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import React from "react";
import { IconButton } from "./icon-button";

type DialogProps = React.ComponentPropsWithRef<typeof DialogPrimitives.Root>;

export const Dialog = ({ children, ...props }: DialogProps) => {
  return <DialogPrimitives.Root {...props}>{children}</DialogPrimitives.Root>;
};

type DialogOverlayProps = React.ComponentPropsWithRef<
  typeof DialogPrimitives.Overlay
>;

const DialogOverlay = ({
  className,
  children,
  ...props
}: DialogOverlayProps) => {
  return (
    <DialogPrimitives.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/70",
        "animate-in fade-in",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitives.Overlay>
  );
};

type DialogContentProps = React.ComponentPropsWithRef<
  typeof DialogPrimitives.Content
> & {
  animation?: "pop" | "slide";
};

const DialogContent = ({
  className,
  children,
  animation = "pop",
  ...props
}: DialogContentProps) => {
  return (
    <DialogPrimitives.Portal>
      <DialogOverlay />
      <DialogPrimitives.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100%-4rem)] w-full max-w-[calc(100%-4rem)] -translate-x-1/2 -translate-y-1/2 rounded-[12px] bg-background p-5",
          animation === "pop" &&
            "duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          animation === "slide" &&
            "ease-out-expo !duration-500 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-[600px] data-[state=open]:slide-in-from-left-1/2",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitives.Close asChild className="absolute right-4 top-4">
          <IconButton variant="ghost" aria-label="닫기" size="xsmall">
            <XIcon size={16} />
          </IconButton>
        </DialogPrimitives.Close>
      </DialogPrimitives.Content>
    </DialogPrimitives.Portal>
  );
};

type DialogHeaderProps = React.ComponentPropsWithRef<"div">;

const DialogHeader = ({ className, children, ...props }: DialogHeaderProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {children}
    </div>
  );
};

type DialogFooterProps = React.ComponentPropsWithRef<"div">;

const DialogFooter = ({ className, children, ...props }: DialogFooterProps) => {
  return (
    <div className={cn("flex justify-end gap-2", className)} {...props}>
      {children}
    </div>
  );
};

type DialogTitleProps = React.ComponentPropsWithRef<
  typeof DialogPrimitives.Title
>;

const DialogTitle = ({ className, children, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitives.Title
      className={cn("text-lg font-semibold tracking-tight", className)}
      {...props}
    >
      {children}
    </DialogPrimitives.Title>
  );
};

type DialogDescriptionProps = React.ComponentPropsWithRef<
  typeof DialogPrimitives.Description
>;

const DialogDescription = ({
  className,
  children,
  ...props
}: DialogDescriptionProps) => {
  return (
    <DialogPrimitives.Description
      className={cn("text-sm text-sub", className)}
      {...props}
    >
      {children}
    </DialogPrimitives.Description>
  );
};

Dialog.Trigger = DialogPrimitives.Trigger;
Dialog.Close = DialogPrimitives.Close;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;

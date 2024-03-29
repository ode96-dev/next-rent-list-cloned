"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../button/button";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = (props: ModalProps) => {
  const [showModal, setShowModal] = useState(props.isOpen);

  useEffect(() => {
    setShowModal(props.isOpen);
  }, [props.isOpen]);

  const handleClose = useCallback(() => {
    if (props.disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      props.onClose();
    }, 300);
  }, [props.disabled, props.onClose]);

  const handleSubmit = useCallback(() => {
    if (props.disabled) {
      return;
    }
    props.onSubmit();
  }, [props.disabled, props.onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (props.disabled || !props.secondaryAction) {
      return;
    }

    props.secondaryAction();
  }, [props.disabled, props.secondaryAction]);

  if (!props.isOpen) {
    return null;
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div
            className={`translate duration-300 h-full 
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{props.title}</div>
              </div>
              <div className="relative p-6 flex-auto">{props.body}</div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {props.secondaryAction && props.secondaryActionLabel && (
                    <Button
                      disabled={props.disabled}
                      label={props.secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={props.disabled}
                    label={props.actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {props.footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

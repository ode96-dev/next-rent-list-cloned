"use client";
import React, { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import useRegisterModal from "@/hooks/use-register-modal";
import axios from "axios";
import Modal from "./modal";
import Heading from "../heading/heading";
import Input from "../inputs/input";
import toast from "react-hot-toast";
import Button from "../button/button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/use-login-modal";

type RegisterModalProps = {};

const RegisterModal = (props: RegisterModalProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("registered!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
      .finally(() => setIsLoading(false));
  };

  const toggleAuth = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title={"Welcome to Nextbnb"} subtitle="Create an account!" />

      <Input
        id={"name"}
        disabled={isLoading}
        label={"Name"}
        register={register}
        errors={errors}
        required
      />
      <Input
        id={"email"}
        disabled={isLoading}
        label={"Email"}
        register={register}
        errors={errors}
        type="email"
        required
      />
      <Input
        id={"password"}
        disabled={isLoading}
        label={"Password"}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />{" "}
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggleAuth}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={"Register"}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={"Continue"}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;

"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

interface ToasterProviderProps {}

const ToasterProvider = (props: ToasterProviderProps) => {
  return <Toaster />;
};

export default ToasterProvider;

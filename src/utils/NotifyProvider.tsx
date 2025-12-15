"use client";

import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { ToastContainer } from "react-toastify";

export default function NotifyProvider(props: { children: React.ReactNode }) {
  return (
    <>
      {props.children}
      <ToastContainer limit={0} position="top-center" autoClose={3000} />
    </>
  );
}

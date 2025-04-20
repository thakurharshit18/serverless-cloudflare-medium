"use client";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { signupInput } from "@thakurharshit18/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
export default function Authcomponent({ type }: { type: "signin" | "signup" }) {
  const router = useRouter();
  const [postInputs, setPostInputs] = useState<signupInput>({
    name: "",
    username: "",
    password: "",
  });
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      router.push("/blog");
    } catch (error) {}
  }

  return (
    <div className="h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">
          {type === "signup" ? "Create an account" : "Login to your account"}
        </div>

        <div className="text-slate-500 dark:text-slate-300 mb-6 text-center">
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <Link
            className="pl-2 underline text-blue-600 dark:text-blue-400"
            href={type === "signup" ? "/signin" : "/signup"}
          >
            {type === "signup" ? "Login" : "Sign Up"}
          </Link>
        </div>

        {type === "signup" && (
          <LabelledInput
            label="Name"
            placeholder="John Doe"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value,
              });
            }}
          />
        )}

        <LabelledInput
          label="Username"
          placeholder="johndoe"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              username: e.target.value,
            });
          }}
        />
        <LabelledInput
          label="Password"
          type="password"
          placeholder="••••••••"
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            });
          }}
        />

        {/* You can add a submit button here */}
        <button
          onClick={sendRequest}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {type === "signup" ? "Sign Up" : "Login"}
        </button>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div className="w-full mb-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

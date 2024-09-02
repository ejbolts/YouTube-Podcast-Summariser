"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Signup() {
  const router = useRouter();

  //might change to server action later
  function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value;
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        alert("Could not sign up");
      });
  }

  return (
    <div className="flex h-screen items-center justify-center bg-stone-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form
          onSubmit={(event) => {
            handleSignUp(event);
          }}
        >
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-stone-700"
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              className="mt-1 block w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700"
            >
              Email address
            </label>
            <Input
              type="email"
              id="email"
              className="mt-1 block w-full"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-stone-700"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              className="mt-1 block w-full"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-stone-600">
            Already have account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

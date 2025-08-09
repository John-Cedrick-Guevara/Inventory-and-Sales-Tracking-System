"use client";
import React, { useActionState, useState } from "react";
import { Eye, EyeOff, Loader2, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { signInAction } from "./actions/auth";
import { useFormState } from "react-dom";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, action, isPending] = useActionState(signInAction, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Store className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access your sales and inventory dashboard
          </p>
        </div>

        {/* main form */}
        <form className="mt-8 space-y-6" action={action}>
          {/* email */}

          <div>
            <Label htmlFor="email">Email:</Label>
            <Input
              required
              type="email"
              id="email"
              placeholder="Email"
              name="email"
            />
          </div>

          <div>
            <Label htmlFor="password">Password:</Label>

            <div className="mt-1 relative">
              <Input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {data?.error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/50 p-4">
              <p className="text-sm text-red-800 dark:text-red-200">
                {data?.error}
              </p>
            </div>
          )}

          <button
            type="submit"
            // disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;

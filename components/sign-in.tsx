"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { User } from "lucide-react";

export const SignInButton = () => {
  const onSignIn = async () => {
    await authClient.signIn.social({
      /**
       * The social provider id
       * @example "github", "google", "apple"
       */
      provider: "github",
      /**
       * A URL to redirect after the user authenticates with the provider
       * @default "/"
       */
      callbackURL: "/",
      /**
       * A URL to redirect if an error occurs during the sign in process
       */
      errorCallbackURL: "/error",
      /**
       * A URL to redirect if the user is newly registered
       */
      newUserCallbackURL: "/",
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={onSignIn}>
      <User className="h-5 w-5" />
    </Button>
  );
};

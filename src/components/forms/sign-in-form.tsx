import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WrapperForm } from "@/components/ui/wrapper-form";

import { useSignInMutation } from "@/hooks/auth";
import { signInSchema, type SignInSchema } from "@/schemas/auth";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const { mutate: signIn, isPending } = useSignInMutation();
  const onSubmit = (values: SignInSchema) => signIn(values);

  return (
    <WrapperForm
      title="Welcome to NeoCare"
      description="Enter your credentials to securely access your NeoCare account."
      href="/auth/sign-up"
      label="Create Account"
      message="Don't have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    type="text"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        disabled={isPending}
                        className="pr-12"
                        {...field}
                      />
                      <button
                        type="button"
                        tabIndex={0}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-primary transition"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={isPending}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              to="/auth/forgot-password"
              className="text-xs text-primary hover:underline"
              tabIndex={isPending ? -1 : 0}
            >
              Forgot your password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full"
            isLoading={isPending}
            disabled={isPending}
          >
            Sign In
          </Button>
        </form>
      </Form>
    </WrapperForm>
  );
}
SignInForm.displayName = "SignInForm";

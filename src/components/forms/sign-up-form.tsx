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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WrapperForm } from "@/components/ui/wrapper-form";

import { useSignUpMutation } from "@/hooks/auth";
import { signUpSchema, type SignUpSchema } from "@/schemas/auth";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: signUp, isPending } = useSignUpMutation();
  const onSubmit = (values: SignUpSchema) => signUp(values);

  return (
    <WrapperForm
      title="Create an Account"
      description="Join Flexify to get started with your account."
      href="/auth/sign-in"
      label="Sign In"
      message="Already have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
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
                        className="pr-12"
                        {...field}
                        disabled={isPending}
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
            Create Account
          </Button>
        </form>
      </Form>
    </WrapperForm>
  );
}
SignUpForm.displayName = "SignUpForm";

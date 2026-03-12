import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { SignUpSchema, type SignUpPayLoadType } from "@/zod/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@/hooks/useAuth";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpPayLoadType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignUpSchema),
  });
  const { mutate, isPending } = useSignUp();
  const signUpSubmit = (data: SignUpPayLoadType) => mutate(data);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(signUpSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: true })}
                />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-password">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Loading..." : " Create Account"}
                </Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <Link to={"/sign-in"}>Sign In</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

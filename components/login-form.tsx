"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChangeEvent, memo, useState } from "react";
import { signIn } from "@/lib/auth-client";
import { SparklesCore } from "./ui/sparkles";

const MemoizedSparkles = memo(SparklesCore);

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError("");
  };

  const loginErrors: Record<string, string> = {
    INVALID_EMAIL: "Неверный формат почты",
    INVALID_EMAIL_OR_PASSWORD: "Неверная почта или пароль",
  };

  const handleLogin = async () => {
    try {
      const res = await signIn.email({
        email: email,
        password: password,
        callbackURL: "/dashboard",
      });
      if (res.error?.code) {
        setError(loginErrors[res.error?.code] || "");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoginVK = async () => {
    try {
      const res = await signIn.social({
        provider: "vk",
      });
      if (res.error?.code) {
        setError(loginErrors[res.error?.code] || "");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      const res = await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      if (res.error?.code) {
        setError(loginErrors[res.error?.code] || "");
      }
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Добро пожаловать</h1>
                <p className="text-muted-foreground text-balance">
                  Войдите в ваш Infinity аккаунт
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={handleChangeEmail}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Забыли пароль?
                  </a>
                </div>
                <Input
                  value={password}
                  onChange={handleChangePassword}
                  id="password"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button type="button" onClick={handleLogin}>
                  Войти
                </Button>
                <div className="text-center text-red-500 text-sm">{error}</div>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                или войти с помощью
              </FieldSeparator>
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button" onClick={handleLoginVK}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M17.802 12.298s1.617 1.597 2.017 2.336a.1.1 0 0 1 .018.035q.244.409.123.645c-.135.261-.592.392-.747.403h-2.858c-.199 0-.613-.052-1.117-.4c-.385-.269-.768-.712-1.139-1.145c-.554-.643-1.033-1.201-1.518-1.201a.6.6 0 0 0-.18.03c-.367.116-.833.639-.833 2.032c0 .436-.344.684-.585.684H9.674c-.446 0-2.768-.156-4.827-2.327C2.324 10.732.058 5.4.036 5.353c-.141-.345.155-.533.475-.533h2.886c.387 0 .513.234.601.444c.102.241.48 1.205 1.1 2.288c1.004 1.762 1.621 2.479 2.114 2.479a.53.53 0 0 0 .264-.07c.644-.354.524-2.654.494-3.128c0-.092-.001-1.027-.331-1.479c-.236-.324-.638-.45-.881-.496c.065-.094.203-.238.38-.323c.441-.22 1.238-.252 2.029-.252h.439c.858.012 1.08.067 1.392.146c.628.15.64.557.585 1.943c-.016.396-.033.842-.033 1.367c0 .112-.005.237-.005.364c-.019.711-.044 1.512.458 1.841a.4.4 0 0 0 .217.062c.174 0 .695 0 2.108-2.425c.62-1.071 1.1-2.334 1.133-2.429c.028-.053.112-.202.214-.262a.5.5 0 0 1 .236-.056h3.395c.37 0 .621.056.67.196c.082.227-.016.92-1.566 3.016c-.261.349-.49.651-.691.915c-1.405 1.844-1.405 1.937.083 3.337"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Войти через VK</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleLoginGoogle}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Войти через Google</span>
                </Button>
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Войти через Meta</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Нет аккаунта? <a href="#">Зарегистрироватся</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            <div className="w-full absolute inset-0 h-screen">
              <MemoizedSparkles
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
            <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
              Infinity
            </h1>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Созданно <a href="https://github.com/rLukoyanov">@rLukoyanov</a>.
      </FieldDescription>
    </div>
  );
}

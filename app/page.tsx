"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, signUp } from "@/lib/auth-client";

export default function Home() {
  const test = async () => {
    const { data, error } = await signUp.email(
      {
        email: "test@test.ru",
        password: "12345678",
        name: "ruslan",
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          console.log(ctx);
        },
        onSuccess: (ctx) => {
          console.log(ctx);
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );

    console.log(data, error);
  };

  const onSignOut = async () => {
    await signOut();
  };

  const onSignIn = async () => {
    await signIn.email({
      email: "test@test.ru",
      password: "12345678",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        salam
        <Button onClick={test}>sign up</Button>
        <Button onClick={onSignIn}>sign in</Button>
        <Button onClick={onSignOut}>signOut</Button>
      </main>
    </div>
  );
}

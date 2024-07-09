import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { useState } from "react";
import LoginForm from "../components/auth/loginForm"; // Assuming LoginForm is your Login component
import { Image } from "@nextui-org/react";
export default function IndexPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  // const [LoggedIn, setLoggedIn] = useState(true);

  return (
    <>
      {LoggedIn ? (
        <DefaultLayout>
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center"></div>

            <div className="flex gap-3">
              <Link
                isExternal
                className={buttonStyles({
                  color: "primary",
                  radius: "full",
                  variant: "shadow",
                })}
                href={siteConfig.links.docs}
              >
                Documentation
              </Link>
              <Link
                isExternal
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href={siteConfig.links.github}
              >
                <GithubIcon size={20} />
                GitHub
              </Link>
            </div>

            <div className="mt-8">
              <Snippet hideCopyButton hideSymbol variant="bordered">
                <span>
                  Get started by editing{" "}
                  <Code color="primary">pages/index.tsx</Code>
                </span>
              </Snippet>
            </div>
          </section>
        </DefaultLayout>
      ) : (
        <div style={{
          // backgroundImage: "url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgb&dl=pexels-jplenio-1103970.jpg&fm=jpg')",
        }}>
          <div className="m-10 p-2 absolute right-2 bg-slate-200 rounded" >
            <ThemeSwitch />
          </div>

          <div className="flex justify-center items-center h-screen">
            <LoginForm />
          </div>
        </div>
      )}
    </>
  );
}

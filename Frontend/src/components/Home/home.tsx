import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center" />

      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.chats}
        >
          Get Started
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
            Share codes and chat easily with your friends or team.
            <Divider />
            <div className="flex justify-center">
              <Code className="p-2" color="primary">
                Now Debugging is easy with BitsChat
              </Code>
            </div>
            <Divider />
            <div className="flex justify-center">
              <Code color="success">Accepted</Code>
              <Divider orientation="vertical" />
              <Code color="warning">Compilation Error</Code>
              <Divider orientation="vertical" />
              <Code color="danger">Wrong Answers</Code>
            </div>
            <Divider />
            Ask for any help with your friends.
          </span>
        </Snippet>
      </div>
    </section>
  );
};

export default Home;

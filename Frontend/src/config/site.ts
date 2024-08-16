export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "BitsChat",
  description: "Share codes and chat easily with your friends or team.Now Debugging is easy with BitsChat",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    // {
    //   label: "Docs",
    //   href: "/docs",
    // },
    {
      label: "Chats",
      href: "/chats",
    },
    // {
    //   label: "Blog",
    //   href: "/blog",
    // },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    // {
    //   label: "Docs",
    //   href: "/docs",
    // },
    {
      label: "Chats",
      href: "/chats",
    },
    // {
    //   label: "User",
    //   href: "/users",
    // },
    // {
    //   label: "Blog",
    //   href: "/blog",
    // },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Arnab-K-S",
    twitter: "https://twitter.com/getnextui",
    chats: "/chats",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/9b6yyZKmH4",
  },
};

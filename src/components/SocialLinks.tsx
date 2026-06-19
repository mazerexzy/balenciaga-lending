export const SocialLinks = () => {
  return (
    <div className="flex items-center gap-6">
      {[
        { name: "Telegram", href: "https://t.me/+ysUDS-t2v0A4ZjNi", icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" },
        { name: "Instagram", href: "#", icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z" },
        { name: "Discord", href: "#", icon: "M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.1.03c-.45.43-.86 1.08-1.18 1.83-1.38-.2-2.76-.2-4.14 0-.32-.75-.73-1.4-1.18-1.83a.08.08 0 0 0-.1-.03c-1.5.26-2.94.71-4.27 1.33a.1.1 0 0 0-.05.07c-1.44 2.22-2.31 4.67-2.39 7.22a.1.1 0 0 0 .04.09c1.68 1.23 3.3 1.99 5.06 2.5a.1.1 0 0 0 .11-.06c.32-.82.6-1.68.83-2.58a.1.1 0 0 0-.06-.12c-1.28-.48-2.5-1.07-3.66-1.8a.1.1 0 0 1-.02-.15c.18-.13.36-.27.53-.41a.1.1 0 0 1 .11-.01c2.82 1.3 5.86 1.3 8.66 0a.1.1 0 0 1 .11.01c.17.14.35.28.53.41a.1.1 0 0 1-.02.15c-1.16.73-2.38 1.32-3.66 1.8a.1.1 0 0 0-.06.12c.23.9.51 1.76.83 2.58a.1.1 0 0 0 .11.06c1.76-.51 3.38-1.27 5.06-2.5a.1.1 0 0 0 .04-.09c-.14-3.52-1.02-6.52-2.42-7.22a.1.1 0 0 0-.06-.07z" }
      ].map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-black/40 grayscale transition-all duration-500 group-hover:text-black group-hover:grayscale-0 group-hover:scale-125 group-hover:-rotate-12 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            <path d={social.icon} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ))}
    </div>
  );
};
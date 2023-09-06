export const Footer = () => {
  return (
    <footer className="flex justify-center py-12">
      <span>
        Built with ♡ in{" "}
        <a
          href="https://remix.run/"
          target="_blank"
          className="text-zinc-500"
          rel="noreferrer"
        >
          Remix
        </a>{" "}
        &{" "}
        <a
          href="https://turso.tech/"
          target="_blank"
          className="text-secondary-500"
          rel="noreferrer"
        >
          Turso
        </a>
      </span>
    </footer>
  );
};

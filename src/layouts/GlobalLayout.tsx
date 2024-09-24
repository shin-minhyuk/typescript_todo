import { ReactNode } from "react";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header>
        <h1>TODOLIST</h1>
      </header>
      {children}
      <footer>@minhyuk</footer>
    </div>
  );
}

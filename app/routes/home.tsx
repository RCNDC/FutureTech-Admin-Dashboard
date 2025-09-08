import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Future Tech Addis Dashboard" },
    { name: "description", content: "Welcome to Future Tech Event Dashboard" },
  ];
}

export default function Home() {
  return <></>;
}

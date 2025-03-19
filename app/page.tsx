import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { WordRotate } from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-grow flex-col p-5 sm:justify-center">
      {/* Headline */}
      <h1 className="flex w-fit flex-wrap items-center gap-1.5 text-xl font-semibold tracking-tight sm:mx-auto sm:-mt-28 sm:text-center sm:text-4xl">
        All Your Important Links.{" "}
        <WordRotate
          words={["Organized.", "Accessible.", "Anywhere."]}
          className="text-primary"
        />
      </h1>
      {/* Subheadline */}
      <p className="mt-6 max-w-[55ch] sm:mx-auto sm:text-center">
        Save and organize your favorite links with ease. Add tags, autofill
        details, and access everything from any device — all in one clean,
        simple app.
      </p>
      {/* Get Started Button */}
      <div className="mt-10 grid w-full place-items-center sm:mt-12">
        <Button asChild>
          <Link
            href="/bookmarks"
            className="flex w-full items-center gap-2 sm:w-fit"
          >
            Get Started
            <LucideArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-2 text-center text-sm text-muted-foreground">
        View the source code on{" "}
        <a
          href="https://github.com/mvahaste/linkbook"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:underline"
        >
          GitHub
        </a>
      </footer>
      {/* Background */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "fixed opacity-75 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)] dark:opacity-25 sm:opacity-100 sm:dark:opacity-50",
          "inset-y-[5%] h-[100%] skew-y-12",
        )}
      />
    </div>
  );
}

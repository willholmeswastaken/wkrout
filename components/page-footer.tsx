import Link from "next/link";
import { Github } from "lucide-react";

export function PageFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Wrkout. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/yourusername/wrkout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

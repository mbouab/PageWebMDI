import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CommentCaMarche from "@/components/sections/CommentCaMarche";
import { etapes } from "@/content/commentCaMarche";

const SENSITIVE_TERMS = ["BigQuery", "n8n"];

describe("CommentCaMarche", () => {
  it("renders all 4 steps in order", () => {
    render(<CommentCaMarche />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(4);
    headings.forEach((heading, index) => {
      expect(heading).toHaveTextContent(etapes[index]!.title);
    });
  });

  it("never exposes sensitive internal technology names", () => {
    const { container } = render(<CommentCaMarche />);

    for (const term of SENSITIVE_TERMS) {
      expect(container.textContent).not.toContain(term);
    }
  });
});

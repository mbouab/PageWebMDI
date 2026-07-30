import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("links to the legal and privacy pages", () => {
    render(<Footer />);

    expect(
      screen.getByRole("link", { name: /mentions légales/i }),
    ).toHaveAttribute("href", "/mentions-legales");
    expect(
      screen.getByRole("link", { name: /confidentialit/i }),
    ).toHaveAttribute("href", "/confidentialite");
  });
});

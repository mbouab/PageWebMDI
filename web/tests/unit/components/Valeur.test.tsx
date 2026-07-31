import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Valeur from "@/components/sections/Valeur";
import { piliers, benefits } from "@/content/valeur";

describe("Valeur (T-3.1)", () => {
  it("renders exactly 3 pillar cards, each with a title and a description", () => {
    render(<Valeur />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(3);

    for (const pilier of piliers) {
      expect(
        screen.getByRole("heading", { level: 3, name: pilier.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(pilier.description)).toBeInTheDocument();
    }
  });
});

describe("Valeur (T-3.2)", () => {
  it("renders the 4 numeric benefit arguments", () => {
    render(<Valeur />);

    // Some benefits use non-breaking spaces (e.g. inside the "à la louche"
    // expression) to keep the phrase from wrapping mid-way; the default
    // testing-library normalizer already collapses those on the rendered
    // side (\s matches NBSP), so pre-normalize the query string the same
    // way rather than matching the raw whitespace bytes.
    for (const benefit of benefits) {
      expect(
        screen.getByText(benefit.replace(/\s+/g, " ").trim()),
      ).toBeInTheDocument();
    }
  });
});

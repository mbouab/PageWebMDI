import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faq from "@/components/sections/Faq";
import { faqItems } from "@/content/faq";

describe("Faq (T-6.1)", () => {
  it("has every item collapsed by default", () => {
    render(<Faq />);

    for (const item of faqItems) {
      expect(
        screen.getByRole("button", { name: item.question }),
      ).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("renders at least the 6 required questions", () => {
    render(<Faq />);

    expect(screen.getAllByRole("button")).toHaveLength(faqItems.length);
    expect(faqItems.length).toBeGreaterThanOrEqual(6);
  });
});

describe("Faq (T-6.2)", () => {
  it("expands the answer on click, setting aria-expanded to true", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const first = faqItems[0]!;
    const button = screen.getByRole("button", { name: first.question });

    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(first.reponse)).toBeVisible();
  });
});

describe("Faq (T-6.3)", () => {
  it("opens an item via keyboard (Enter) and keeps it a focusable native button", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const second = faqItems[1]!;
    const button = screen.getByRole("button", { name: second.question });

    button.focus();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});

import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { UserEvent } from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

async function fillValidForm(user: UserEvent) {
  await user.type(screen.getByLabelText(/^nom$/i), "Jeanne Dupont");
  await user.type(screen.getByLabelText(/^email/i), "jeanne@example.com");
  await user.type(screen.getByLabelText(/^établissement$/i), "Boma Beach");
  await user.selectOptions(screen.getByLabelText(/segment/i), "solo");
  await user.type(
    screen.getByLabelText(/^message/i),
    "Bonjour, je souhaite une démo de votre produit, merci.",
  );
  await user.click(screen.getByLabelText(/consentement|accepte|rgpd/i));
}

describe("ContactForm (T-8.1)", () => {
  it("shows validation errors and never calls onSubmit when fields are invalid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ContactForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(await screen.findAllByRole("alert")).not.toHaveLength(0);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /envoyer/i })).toBeInTheDocument();
  });
});

describe("ContactForm (T-8.2)", () => {
  it("calls onSubmit once with the right fields and moves to the success state", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmit={onSubmit} />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /envoyer/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        nom: "Jeanne Dupont",
        email: "jeanne@example.com",
        etablissement: "Boma Beach",
        segment: "solo",
        consentement: true,
      }),
    );

    expect(await screen.findByRole("status")).toHaveTextContent(/envoyée/i);
  });
});

describe("ContactForm (T-8.3)", () => {
  it("disables the submit button and shows the submitting state while sending", async () => {
    const user = userEvent.setup();
    let resolveSubmit!: () => void;
    const onSubmit = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSubmit = resolve;
        }),
    );
    render(<ContactForm onSubmit={onSubmit} />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /envoyer/i }));

    const submittingButton = await screen.findByRole("button", {
      name: /envoi en cours/i,
    });
    expect(submittingButton).toBeDisabled();

    resolveSubmit();
    await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
  });
});

describe("ContactForm (T-8.4)", () => {
  it("shows an error state on failure, keeps the data, and allows retrying", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValueOnce(new Error("boom"));
    render(<ContactForm onSubmit={onSubmit} />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: /envoyer/i }));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.getByLabelText(/^nom$/i)).toHaveValue("Jeanne Dupont");

    onSubmit.mockResolvedValueOnce(undefined);
    await user.click(screen.getByRole("button", { name: /envoyer/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(2));
    expect(await screen.findByRole("status")).toHaveTextContent(/envoyée/i);
  });
});

describe("ContactForm (T-8.5)", () => {
  it("links every field to its label, and errors to their field via aria-describedby", async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText(/^nom$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^établissement$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/segment/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /envoyer/i }));

    const emailInput = await screen.findByLabelText(/^email/i);
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAccessibleDescription(/./);
  });
});

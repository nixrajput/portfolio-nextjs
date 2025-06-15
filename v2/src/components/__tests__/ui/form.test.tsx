import { render, screen, fireEvent } from "@testing-library/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const TestForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
};

describe("Form Component", () => {
  it("renders form fields correctly", () => {
    render(<TestForm />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows validation errors for invalid input", async () => {
    render(<TestForm />);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Username must be at least 2 characters")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Invalid email address")
    ).toBeInTheDocument();
  });

  it("submits form with valid data", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    render(<TestForm />);

    const usernameInput = screen.getByLabelText("Username");
    const emailInput = screen.getByLabelText("Email");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith({
      username: "testuser",
      email: "test@example.com",
    });
  });

  it("clears validation errors when input becomes valid", async () => {
    render(<TestForm />);

    const usernameInput = screen.getByLabelText("Username");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    fireEvent.click(submitButton);
    expect(
      await screen.findByText("Username must be at least 2 characters")
    ).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(
      screen.queryByText("Username must be at least 2 characters")
    ).not.toBeInTheDocument();
  });
});

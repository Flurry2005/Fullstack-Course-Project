export async function Login(email: string, password: string) {
  const emailRegex =
    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:(?:\\[\x00-\x7F]|[^\\"]))*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:\d{1,3}\.){3}\d{1,3}\]))$/;

  if (
    email.trim() === "" ||
    password.trim() === "" ||
    password.trim().length <= 8 ||
    !emailRegex.test(email)
  ) {
    //invalid formats
    console.error("Invalid email/password");
    return { success: false, data: { error: "Invalid email/password" } };
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}${"/login"}`,
      {
        method: "POST",
        body: JSON.stringify({ username: email, password }),
      },
    );

    const res = await response.json();

    return { success: response.ok, data: res };
  } catch (error) {
    console.error(error);
    return { success: false, data: { error: "Failed to contact server" } };
  }
}

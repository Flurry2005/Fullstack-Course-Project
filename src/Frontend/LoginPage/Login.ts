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
    return { success: false, error: "Invalid email/password" };
  }

  try {
    const response = await fetch(
      `https://fullstackapi.liamjorgensen.dev/api${"/login"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password }),
        credentials: "include",
      },
    );

    const res = await response.json();

    if (res.success) {
      return { success: res.success, data: res.data };
    } else {
      return { success: res.success, error: res.error };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to contact server" };
  }
}

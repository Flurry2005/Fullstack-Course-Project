export async function Register(
  fullname: string,
  username: string,
  email: string,
  password: string,
) {
  const emailRegex =
    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:(?:\\[\x00-\x7F]|[^\\"]))*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:\d{1,3}\.){3}\d{1,3}\]))$/;

  if (
    fullname.trim() === "" ||
    email.trim() === "" ||
    username.trim() === "" ||
    password.trim() === "" ||
    password.trim().length <= 8 ||
    !emailRegex.test(email)
  ) {
    //invalid formats
    console.error("Invalid fullname/email/password");
    return {
      success: false,
      data: "Invalid fullname/email/password",
    };
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API}${"/register"}`,
      {
        method: "POST",
        body: JSON.stringify({
          fullname: fullname,
          username: username,
          email: email,
          password,
        }),
      },
    );

    const res = await response.json();

    if (res.success) {
      console.log(res.data);
      return { success: res.success, message: res.message };
    }

    return { success: res.success, error: res.error };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to contact server" };
  }
}

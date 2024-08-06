"use server";
import { connectToDB } from "@/db/connection";
import { User } from "@/models/userModel";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

export const signupHandler = async (formData: FormData) => {
  const name = formData.get("name") as string | undefined;
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;
  const confirmPassword = formData.get("confirmPassword") as string | undefined;

  if (!email || !password || !name) {
    throw new Error("Please fill all the fields");
  }
  if (password !== confirmPassword) {
    throw new Error("Password and confirm password do not match");
  }
  // ... connection with db

  await connectToDB();

  const user = await User.findOne({ email });
  if (user) {
    throw new Error("Email already exists");
  }
  // ... create user
  const hashedPassword = await hash(password, 12);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (!newUser) {
    throw new Error("Something went wrong, try again");
  }
  redirect("/auth/signin");
};

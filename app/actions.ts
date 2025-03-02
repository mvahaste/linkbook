"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/bookmarks");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const newBookmarkAction = async (formData: FormData) => {
  const supabase = await createClient();
  const url = formData.get("url") as string;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) ?? null;
  const image = (formData.get("image") as string) ?? null;

  const { error } = await supabase.from("bookmarks").insert([
    {
      url,
      title,
      description,
      image,
    },
  ]);

  if (error) {
    console.error(error.message);
    return { error: error.message };
  }

  return { success: true };
};

export const editBookmarkAction = async (formData: FormData) => {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const url = formData.get("url") as string;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) ?? null;
  const image = (formData.get("image") as string) ?? null;

  const { error } = await supabase
    .from("bookmarks")
    .update({ url, title, description, image })
    .eq("id", id);

  if (error) {
    console.error(error.message);
    return { error: error.message };
  }

  return { success: true };
};

export const deleteBookmarkAction = async (id: number) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id.toString());

  if (error) {
    console.error(error.message);
    return { error: error.message };
  }

  return { success: true };
};

export const newTagAction = async (formData: FormData) => {
  const supabase = await createClient();
  const label = formData.get("label") as string;

  const { error } = await supabase.from("tags").insert([{ label }]);

  if (error) {
    console.error(error.message);
    return { error: error.message };
  }

  return { success: true };
};

export const editTagAction = async (formData: FormData) => {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const label = formData.get("label") as string;

  const { error } = await supabase.from("tags").update({ label }).eq("id", id);

  if (error) {
    console.error(error.message);
    return { error: error.message };
  }

  return { success: true };
};

export const deleteTagAction = async (id: number) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tags")
    .delete()
    .eq("id", id.toString());

  if (error) {
    console.error(error.message);
    return { error: error.message };
  }

  return { success: true };
};

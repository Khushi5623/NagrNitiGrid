import { supabase } from "./client";

const ADMIN_EMAIL = "khushiofficial@gmail.com";

export const isAdmin = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  return user.email === ADMIN_EMAIL;
};

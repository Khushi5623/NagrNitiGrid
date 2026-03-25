import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Signup button clicked");

    if (!form.email || !form.password) {
      alert("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
          },
        },
      });

      console.log("SIGNUP DATA:", data);
      console.log("SIGNUP ERROR:", error);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Account created successfully 🎉");

      navigate("/dashboard");

    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-3xl font-bold text-white mb-2">
          Create Your NagarNiti Grid Account
        </h1>

        <p className="text-muted-foreground mb-6">
          Join NagarNiti Grid and report issues transparently
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-[#00E5FF] to-primary-glow hover:shadow-[0_0_30px_rgba(0,229,255,0.8)] transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="text-sm text-muted-foreground mt-6 text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-cyan-400 hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;


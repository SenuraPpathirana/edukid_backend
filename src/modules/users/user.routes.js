import { Router } from "express";
import { supabase } from "../../config/supabase.js";
import { requireAuth } from "../auth/auth.middleware.js";

const router = Router();

// GET /me (protected)
router.get("/me", requireAuth, async (req, res) => {
  const { user_id } = req.user;

  const { data, error } = await supabase
    .from("user")
    .select("user_id, fname, lname, email, account_status, is_verified")
    .eq("user_id", user_id)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "User not found" });

  res.json({ user: data });
});

export default router;



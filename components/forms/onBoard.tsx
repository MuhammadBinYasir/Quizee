"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Image as ImageIcon,
  FileText,
  Youtube,
  Linkedin,
  Loader2,
  Check,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { updateUser } from "@/lib/action/user.action";

interface OnBoardProps {
  user: {
    id?: string;
    username: string;
    name?: string;
    email: string;
    image?: string;
    desc?: string;
    yt?: string;
    lkd?: string;
  };
}

export default function OnBoard({ user }: OnBoardProps) {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [desc, setDesc] = useState(user.desc || "");
  const [image, setImage] = useState(
    user.image ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        user.username
      )}`
  );
  const [yt, setYt] = useState(user.yt || "");
  const [lkd, setLkd] = useState(user.lkd || "");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShuffleAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setImage(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim()) {
      setError("Please provide your full name.");
      return;
    }

    setLoading(true);

    try {
      const res = await updateUser({
        userId: user.id || "",
        name: name.trim(),
        image: image.trim(),
        desc: desc.trim(),
        yt: yt.trim().replace(/^@/, ""),
        lkd: lkd.trim().replace(/^@/, ""),
      });

      if (res === "ok") {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        router.refresh();
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err: any) {
      console.error("Profile update error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      {success && (
        <div className="p-3.5 rounded-xl bg-[#edf3ee] border border-[#d6e5d8] text-xs text-[#52745a] font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-[#52745a] shrink-0" />
          <span>Profile successfully updated!</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          {error}
        </div>
      )}

      {/* =====================================================
          AVATAR CUSTOMIZER
      ===================================================== */}
      <div className="p-4 rounded-2xl bg-[#fafaf8] border border-[#e8e8e5] flex flex-col sm:flex-row items-center gap-4">
        <img
          src={image}
          alt={name || user.username}
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs bg-[#f0eef6]"
        />

        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs font-bold text-[#353640]">Profile Avatar</p>
          <p className="text-[11px] text-[#8e909a] mt-0.5">
            Use an automatically generated stylized avatar or paste a custom URL.
          </p>
        </div>

        <button
          type="button"
          onClick={handleShuffleAvatar}
          className="h-9 px-3 rounded-xl border border-[#dddddf] bg-white text-xs font-semibold text-[#5a5c66] hover:bg-[#f4f3f8] transition inline-flex items-center gap-1.5 shadow-2xs shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#8279a9]" />
          <span>Generate New</span>
        </button>
      </div>

      {/* Custom Avatar URL input */}
      <div>
        <label className="block text-xs font-semibold text-[#525460] mb-1.5">
          Avatar Image URL
        </label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://example.com/avatar.png"
          className="w-full h-11 px-3.5 rounded-xl border border-[#dedee2] bg-[#fafaf8] text-xs text-[#33353f] placeholder:text-[#a6a7b0] outline-none focus:border-[#8279a9] focus:bg-white transition"
        />
      </div>

      {/* =====================================================
          BASIC INFO
      ===================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#525460] mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Muhammad Ali"
            required
            className="w-full h-11 px-3.5 rounded-xl border border-[#dedee2] bg-[#fafaf8] text-xs text-[#33353f] placeholder:text-[#a6a7b0] outline-none focus:border-[#8279a9] focus:bg-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#525460] mb-1.5">
            Username
          </label>
          <input
            type="text"
            value={`@${user.username}`}
            disabled
            className="w-full h-11 px-3.5 rounded-xl border border-[#e4e4e7] bg-[#f0eff4] text-xs text-[#71737e] cursor-not-allowed outline-none font-medium"
          />
        </div>
      </div>

      {/* Description / Bio */}
      <div>
        <label className="block text-xs font-semibold text-[#525460] mb-1.5">
          Bio / About You
        </label>
        <textarea
          rows={3}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="A short introduction about yourself, topics you teach, or subjects you're interested in..."
          className="w-full p-3.5 rounded-xl border border-[#dedee2] bg-[#fafaf8] text-xs text-[#33353f] placeholder:text-[#a6a7b0] outline-none focus:border-[#8279a9] focus:bg-white transition resize-none leading-5"
        />
      </div>

      {/* =====================================================
          SOCIAL CHANNELS
      ===================================================== */}
      <div className="space-y-3 pt-2">
        <p className="text-xs font-bold text-[#353640]">Social Handles</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center text-[#999aa2]">
              <Youtube className="w-4 h-4 text-red-500" />
            </div>
            <input
              type="text"
              value={yt}
              onChange={(e) => setYt(e.target.value)}
              placeholder="YouTube Handle (e.g. MyChannel)"
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#dedee2] bg-[#fafaf8] text-xs text-[#33353f] placeholder:text-[#a6a7b0] outline-none focus:border-[#8279a9] focus:bg-white transition"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center text-[#999aa2]">
              <Linkedin className="w-4 h-4 text-blue-600" />
            </div>
            <input
              type="text"
              value={lkd}
              onChange={(e) => setLkd(e.target.value)}
              placeholder="LinkedIn Username"
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-[#dedee2] bg-[#fafaf8] text-xs text-[#33353f] placeholder:text-[#a6a7b0] outline-none focus:border-[#8279a9] focus:bg-white transition"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          SUBMIT ACTION
      ===================================================== */}
      <div className="pt-4 border-t border-[#eeeeeb] flex items-center justify-end">
        <button
          type="submit"
          disabled={loading}
          className="h-11 px-6 rounded-xl bg-[#30323c] hover:bg-[#41434e] text-white text-xs font-semibold inline-flex items-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-xs"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Profile...</span>
            </>
          ) : (
            <span>Save Profile Changes</span>
          )}
        </button>
      </div>
    </form>
  );
}
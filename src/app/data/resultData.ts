export interface ResultData {
  title: string;
  reflection: string;
  closing: string;
  gradientClass: string;
  textColorClass: string;
  decorationType: "petals" | "sparkles" | "cloud" | "none";
}

export const RESULT_DATA: Record<string, ResultData> = {
  "The Brave Heart": {
    title: "THE BRAVE HEART",
    reflection:
      "You choose honesty, even when your voice shakes. You walk toward connection instead of away from fear.",
    closing: "Your courage makes love possible.",
    gradientClass: "bg-gradient-to-br from-rose-300 to-pink-500",
    textColorClass: "text-white",
    decorationType: "petals",
  },
  "The Quiet Protector": {
    title: "THE QUIET PROTECTOR",
    reflection:
      "You hold your feelings gently, guarding them until the world feels safe. Your silence is not emptiness — it’s care.",
    closing: "You love softly, even when unseen.",
    gradientClass: "bg-gradient-to-br from-[#E8DCC4] to-[#E2C2B3]", // Beige to muted peach
    textColorClass: "text-stone-800",
    decorationType: "petals",
  },
  "The Heart That Waits": {
    title: "THE HEART THAT WAITS",
    reflection:
      "You long for closeness, but you move carefully. You’re patient with your own timing, even when the world rushes.",
    closing: "Your pace is still a kind of love.",
    gradientClass: "bg-gradient-to-br from-violet-200 to-indigo-900", // Lavender to midnight blue
    textColorClass: "text-white",
    decorationType: "sparkles",
  },
  "The Hopeful Believer": {
    title: "THE HOPEFUL BELIEVER",
    reflection:
      "You see the light in others even when it dims. You choose to trust in the possibility of what could be.",
    closing: "Your faith is a beacon.",
    gradientClass: "bg-gradient-to-br from-pink-200 to-rose-100",
    textColorClass: "text-rose-900",
    decorationType: "petals",
  },
  "The Silent Heart": {
    title: "THE SILENT HEART",
    reflection:
      "You feel deeply but keep it hidden within. A reservoir of emotion that only needs a safe space to flow.",
    closing: "Your depth is your gift.",
    gradientClass: "bg-gradient-to-br from-stone-200 to-stone-400",
    textColorClass: "text-stone-800",
    decorationType: "none",
  },
  "The Lonely Companion": {
    title: "THE LONELY COMPANION",
    reflection:
      "You stay, even when you feel alone. Your loyalty is deep, but your heart deserves to be held too.",
    closing: "You are worthy of being chosen back.",
    gradientClass: "bg-gradient-to-br from-slate-300 to-blue-200", // Cool gray to soft blue
    textColorClass: "text-slate-800",
    decorationType: "none",
  },
  "The Open Heart": {
    title: "THE OPEN HEART",
    reflection:
      "You’re ready to love again. You’ve learned from your past without letting it close you.",
    closing: "Your openness is your strength.",
    gradientClass: "bg-gradient-to-br from-pink-100 to-white",
    textColorClass: "text-pink-900",
    decorationType: "petals",
  },
  "The Guarded Soul": {
    title: "THE GUARDED SOUL",
    reflection:
      "You protect yourself because you’ve been hurt. Your caution is not weakness — it’s wisdom.",
    closing: "You deserve a love that feels safe.",
    gradientClass: "bg-gradient-to-br from-fuchsia-900 to-purple-800", // Deep plum to muted lavender
    textColorClass: "text-white",
    decorationType: "sparkles",
  },
  "The Quiet Dreamer": {
    title: "THE QUIET DREAMER",
    reflection:
      "You imagine love more than you chase it. Your heart is tender, hopeful, and still healing.",
    closing: "Your dreams are seeds — they will grow.",
    gradientClass: "bg-gradient-to-br from-sky-200 to-orange-50", // Soft sky blue to pale cream
    textColorClass: "text-sky-900",
    decorationType: "cloud",
  },
  "The Growing Soul": {
    title: "THE GROWING SOUL",
    reflection:
      "You act with purpose and care for others. You're learning that growth means both reaching outward and tending to your own heart.",
    closing: "Your journey is your strength.",
    gradientClass: "bg-gradient-to-br from-emerald-200 to-teal-400",
    textColorClass: "text-emerald-900",
    decorationType: "petals",
  },
  "The Mirror Seeker": {
    title: "THE MIRROR SEEKER",
    reflection:
      "You look inward with courage, facing truths others avoid. Your honesty with yourself is a rare gift.",
    closing: "Knowing yourself is the beginning of wisdom.",
    gradientClass: "bg-gradient-to-br from-cyan-200 to-blue-400",
    textColorClass: "text-cyan-900",
    decorationType: "sparkles",
  },
  "The Forgiver": {
    title: "THE FORGIVER",
    reflection:
      "You hold space for others' imperfections, including your own. Your compassion is a healing force.",
    closing: "Grace is your superpower.",
    gradientClass: "bg-gradient-to-br from-amber-100 to-yellow-200",
    textColorClass: "text-amber-900",
    decorationType: "petals",
  },
  "The Passionate Wanderer": {
    title: "THE PASSIONATE WANDERER",
    reflection:
      "You move forward boldly, guarding your heart while seeking adventure. You don't need to reveal everything to live fully.",
    closing: "Your freedom is your love language.",
    gradientClass: "bg-gradient-to-br from-orange-300 to-red-400",
    textColorClass: "text-white",
    decorationType: "petals",
  },
  "The Peaceful One": {
    title: "THE PEACEFUL ONE",
    reflection:
      "You've found a quiet confidence in who you are. Your self-worth doesn't depend on someone else's validation.",
    closing: "Your calm is a kind of courage.",
    gradientClass: "bg-gradient-to-br from-indigo-200 to-purple-300",
    textColorClass: "text-indigo-900",
    decorationType: "sparkles",
  },
  "The Shadow Holder": {
    title: "THE SHADOW HOLDER",
    reflection:
      "You carry weight others don't see. Your struggles are real, and they matter. You don't have to hold it all alone.",
    closing: "Even shadows need light.",
    gradientClass: "bg-gradient-to-br from-gray-400 to-slate-600",
    textColorClass: "text-white",
    decorationType: "none",
  },
  "The Unnamed Heart": {
    title: "THE UNNAMED HEART",
    reflection:
      "You exist in perfect balance, neither here nor there. You're discovering that not every question needs an answer right now.",
    closing: "Mystery is a valid state of being.",
    gradientClass: "bg-gradient-to-br from-violet-300 via-fuchsia-200 to-pink-200",
    textColorClass: "text-violet-900",
    decorationType: "sparkles",
  },
  "The Heart Between Worlds": {
    title: "THE HEART BETWEEN WORLDS",
    reflection:
      "You contain multitudes — fierce and gentle, hopeful and guarded. You defy simple categories, and that's your magic.",
    closing: "Contradiction is not confusion.",
    gradientClass: "bg-gradient-to-br from-rose-400 via-purple-500 to-indigo-600",
    textColorClass: "text-white",
    decorationType: "sparkles",
  },
};

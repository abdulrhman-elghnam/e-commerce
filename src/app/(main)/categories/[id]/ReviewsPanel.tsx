"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Pencil, Send, Star, Trash2 } from "lucide-react";
import { createReview, deleteReview, getProductReviews, type Review, updateReview } from "@/lib/services/reviewService";
import { toast } from "sonner";

export default function ReviewsPanel({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { const result = await getProductReviews(productId); setReviews(result.data || []); }
    catch { setReviews([]); }
    finally { setLoading(false); }
  }, [productId]);
  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!session?.user?.token) return toast.error("Sign in to share a review.");
    if (text.trim().length < 3) return toast.error("Please write a little more about your experience.");
    setSaving(true);
    try {
      if (editing) await updateReview(session.user.token, editing, text.trim(), rating);
      else await createReview(session.user.token, productId, text.trim(), rating);
      toast.success(editing ? "Review updated" : "Thanks for your review!");
      setText(""); setRating(5); setEditing(null); await load();
    } catch (error) { toast.error(error instanceof Error ? error.message : "Could not save review"); }
    finally { setSaving(false); }
  };
  const remove = async (reviewId: string) => {
    if (!session?.user?.token) return;
    try { await deleteReview(session.user.token, reviewId); setReviews(list => list.filter(item => item._id !== reviewId)); toast.success("Review deleted"); }
    catch (error) { toast.error(error instanceof Error ? error.message : "Could not delete review"); }
  };

  return <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
    <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Customer feedback</p><h2 className="mt-1 text-xl font-bold text-slate-900">Reviews</h2></div><span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">{reviews.length} total</span></div>
    <form onSubmit={submit} className="mt-6 rounded-xl bg-slate-50 p-4">
      <div className="mb-3 flex items-center justify-between"><p className="font-semibold text-slate-800">{editing ? "Edit your review" : "Tell us what you think"}</p><div className="flex">{[1,2,3,4,5].map(value => <button key={value} type="button" onClick={() => setRating(value)} aria-label={`${value} stars`} className="p-0.5"><Star size={20} className={value <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}/></button>)}</div></div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder={session ? "What did you like or dislike?" : "Sign in to leave a review"} disabled={!session} className="min-h-24 w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-emerald-500 disabled:cursor-not-allowed"/>
      <div className="mt-3 flex justify-end gap-2">{editing && <button type="button" onClick={() => { setEditing(null); setText(""); setRating(5); }} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600">Cancel</button>}<button disabled={saving || !session} className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-50">{saving ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>} {editing ? "Save changes" : "Post review"}</button></div>
    </form>
    <div className="mt-6 divide-y divide-slate-100">{loading ? <div className="flex justify-center py-8"><Loader2 className="animate-spin text-emerald-600"/></div> : reviews.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">No reviews yet. Be the first to share your experience.</p> : reviews.map(review => { const canManage = session?.user?.name && session.user.name === review.user?.name; return <article key={review._id} className="py-5 first:pt-0"><div className="flex items-start justify-between gap-4"><div><p className="font-semibold text-slate-800">{review.user?.name || "Verified customer"}</p><div className="mt-1 flex text-amber-400">{[1,2,3,4,5].map(value => <Star key={value} size={15} fill={value <= review.rating ? "currentColor" : "none"} className={value <= review.rating ? "" : "text-slate-300"}/>)}</div></div>{canManage && <div className="flex gap-1"><button onClick={() => { setEditing(review._id); setText(review.review); setRating(review.rating); }} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Edit review"><Pencil size={15}/></button><button onClick={() => remove(review._id)} className="rounded-lg p-2 text-rose-600 hover:bg-rose-50" aria-label="Delete review"><Trash2 size={15}/></button></div>}</div><p className="mt-3 text-sm leading-6 text-slate-600">{review.review}</p></article>})}</div>
  </section>;
}

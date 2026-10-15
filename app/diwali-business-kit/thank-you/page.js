"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ModeShell from "../../../components/ModeShell";
import { PageHeader, PremiumCard } from "../../../components/Premium";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  
  const [status, setStatus] = useState("checking"); // checking, paid, pending, error
  const [downloadUrl, setDownloadUrl] = useState("");
  const [message, setMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const checkStatus = async () => {
    if (!orderId) {
      setStatus("error");
      setMessage("Order ID missing. Please try again from the product page.");
      return;
    }

    try {
      const res = await fetch(`/api/order-status?order_id=${encodeURIComponent(orderId)}`);
      const data = await res.json();

      if (data.status === "paid" && data.download_url) {
        setStatus("paid");
        setDownloadUrl(data.download_url);
        setMessage(data.message || "Payment verified!");
        // Track Purchase event
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Purchase', {value: 149, currency: 'INR', content_name: 'Diwali Business Promo Pack'});
        }
      } else if (data.status === "pending") {
        setStatus("pending");
        setMessage(data.message || "Payment not completed yet.");
      } else {
        setStatus("error");
        setMessage(data.error || data.message || "Something went wrong.");
      }
    } catch (e) {
      setStatus("error");
      setMessage("Failed to verify payment. Please try again.");
    }
  };

  useEffect(() => {
    checkStatus();
  }, [orderId, retryCount]);

  // Auto-retry for pending payments (webhook might be delayed)
  useEffect(() => {
    if (status === "pending" && retryCount < 10) {
      const timer = setTimeout(() => {
        setRetryCount(c => c + 1);
      }, 5000); // Retry every 5 seconds, up to 10 times (50 seconds)
      return () => clearTimeout(timer);
    }
  }, [status, retryCount]);

  return (
    <ModeShell mode="sarkari">
      <div className="max-w-md mx-auto pb-12">
        <PageHeader
          title="🪔 Thank You!"
          subtitle="Verifying your payment..."
        />

        <PremiumCard className="p-6 mb-4 text-center">
          {status === "checking" && (
            <>
              <div className="text-5xl mb-4">⏳</div>
              <h2 className="text-xl font-bold text-white mb-2">Verifying payment...</h2>
              <p className="text-white/60 text-[14px]">Please wait while we confirm your payment with Cashfree.</p>
            </>
          )}

          {status === "paid" && (
            <>
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-white mb-2">Payment Successful!</h2>
              <p className="text-white/60 text-[14px] mb-6">{message}</p>
              <a
                href={downloadUrl}
                className="pu-btn-primary pu-press w-full py-4 text-[16px] font-extrabold inline-flex items-center justify-center gap-2 rounded-2xl"
              >
                <span>📥</span> Download Your Pack (22MB)
              </a>
              <p className="text-white/40 text-[12px] mt-4">
                This link is single-use and expires in 24 hours.<br/>
                Order ID: {orderId}
              </p>
            </>
          )}

          {status === "pending" && (
            <>
              <div className="text-5xl mb-4">⏳</div>
              <h2 className="text-xl font-bold text-white mb-2">Payment Pending</h2>
              <p className="text-white/60 text-[14px] mb-4">{message}</p>
              <p className="text-white/40 text-[12px] mb-4">
                Checking again automatically... ({retryCount}/10)
              </p>
              <button
                onClick={() => setRetryCount(c => c + 1)}
                className="pu-btn-primary pu-press px-6 py-3 text-[14px] rounded-xl"
              >
                Check Again
              </button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="text-5xl mb-4">❌</div>
              <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
              <p className="text-white/60 text-[14px] mb-4">{message}</p>
              <button
                onClick={() => { setStatus("checking"); setRetryCount(c => c + 1); }}
                className="pu-btn-primary pu-press px-6 py-3 text-[14px] rounded-xl"
              >
                Try Again
              </button>
              <p className="text-white/40 text-[12px] mt-4">
                If you completed the payment, please contact support with your Order ID: {orderId}
              </p>
            </>
          )}
        </PremiumCard>
      </div>
    </ModeShell>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="text-white text-center p-8">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}

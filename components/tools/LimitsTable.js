// Free vs Pro limits table (audit fix 31 Oct 2026) — the single published
// source of limits on tool pages and /coins. Values come from lib/pro.js
// so the table can never drift from the enforced caps.
import { FREE_PHOTO_MAX_MB, PRO_PHOTO_MAX_MB, FREE_PDF_MAX_MB, PRO_PDF_MAX_MB, PRO_PRICE_INR } from "../../lib/pro";

export default function LimitsTable() {
  return (
    <div className="pu-card p-4 mt-4">
      <p className="text-[13px] font-bold text-mist-100 mb-2">Free vs Pro limits</p>
      <table className="w-full text-[13px] text-mist-300">
        <thead>
          <tr className="text-left text-mist-500">
            <th className="py-1 pr-2 font-semibold">Tool input</th>
            <th className="py-1 pr-2 font-semibold">Free</th>
            <th className="py-1 font-semibold">Pro (₹{PRO_PRICE_INR}/month)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1 pr-2">Photo input</td>
            <td className="py-1 pr-2">{FREE_PHOTO_MAX_MB}MB</td>
            <td className="py-1">{PRO_PHOTO_MAX_MB}MB</td>
          </tr>
          <tr>
            <td className="py-1 pr-2">PDF input</td>
            <td className="py-1 pr-2">{FREE_PDF_MAX_MB}MB</td>
            <td className="py-1">{PRO_PDF_MAX_MB}MB</td>
          </tr>
        </tbody>
      </table>
      <p className="text-[12px] text-mist-500 mt-2 leading-snug">
        Limit lagne par tool file refuse kar dega aur Pro email check ka option
        dega. Pro limit sirf server-verified payment email se milti hai — koi
        login account nahi chahiye. Free tools hamesha free rahenge.
      </p>
    </div>
  );
}

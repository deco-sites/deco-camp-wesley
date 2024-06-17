import { useState } from "preact/hooks";

function CouponButton({ couponCode }: { couponCode: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center border border-gray-300 rounded px-2 py-1 gap-2">
      <p className="mt-2 text-base font-bold text-black">{couponCode}</p>
      <button
        onClick={copyToClipboard}
        className="bg-black text-white font-bold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {copied ? "Cupom copied!" : "copy coupon"}
      </button>
    </div>
  );
}

export default CouponButton;

import CouponButton from "../islands/CouponButton.tsx";

interface Props {
  /** @title coupon code */
  coupon: string;
}

export default function Coupon({
  coupon = "10off",
}: Props) {
  return (
    <section class="relative bg-white text-black py-20 max-w-screen">
      <div class="mx-6 lg:container lg:mx-auto flex justify-center items-center flex-col gap-4">
        <p> Utilize o código  <CouponButton couponCode={coupon} /> e receba o desconto em qualquer serviço que escolher.</p>
      </div>
    </section>
  );
}

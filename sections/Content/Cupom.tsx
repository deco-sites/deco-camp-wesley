export interface Props {
  /**
   * @title Cupom
   */
  coupon: string;
  /**
   * @title Descrição
   */
  description?: string;
}

export default function Coupon(
  { coupon, description = "Cupom de primeira compra!" }: Props,
) {
  return (
    <div class="w-full container px-4 py-8 flex flex-col gap-6 lg:py-10 lg:px-0 items-center">
      <h2 class="leading-6 lg:leading-8 text-base-content lg:text-3xl text-center">
        {description}
      </h2>

      <button class="relative font-medium lg:text-[20px] px-4 py-2">
    
      </button>
    </div>
  );
}

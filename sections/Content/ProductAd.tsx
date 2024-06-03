import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /**
   * @title Products
   */
  myProduct: {
    productId: number;
    productImage: ImageWidget;
    productName: string;
    productDescription: string;
    productPrice: number;
  }[];
}

export const formatPrice = (amount: number, prefix = "R$ ") => {
  const value = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
    .format(amount)
    .replace(/R\$\s{1}/g, prefix);
  return value;
};

export default function HorizontalProductCard(props: Props) {
  const productList = props.myProduct;

  return (
    <>
      {!!productList?.length &&
        productList.map((item) => {
          const id = item.productId;
          const image = item.productImage;
          const name = item.productName;
          const description = item.productDescription;
          const price = item.productPrice;

          return (
            <div
              key={`horizontal-product-card-${id}`}
              class="w-full container flex gap-6 my-12 p-6 rounded-xl bg-neutral-content"
            >
              <div class="w-[192px] aspect-square flex justify-center items-center overflow-hidden rounded min-w-fit">
                <Image
                  width={192}
                  sizes="(max-width: 640px) 100vw, 30vw"
                  src={image}
                  alt={image}
                  decoding="async"
                  loading="lazy"
                />
              </div>

              <div class="flex gap-6">
                <div class="flex flex-col gap-6">
                  <h2 class="truncate text-base lg:text-lg text-base-content uppercase font-normal">
                    {name}
                  </h2>
                  <span class="text-base-content lg:text-sm font-light">
                    {description}
                  </span>
                </div>

                <div class="flex flex-col gap-6">
                  <span class="text-base-content lg:text-sm font-light">
                    {formatPrice(price)}
                  </span>
                  <button class="w-max bg-primary p-2 rounded text-base-content lg:text-sm font-light">
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
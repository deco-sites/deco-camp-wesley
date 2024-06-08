import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import AddToCartButton from "../../components/product/AddToCartButton/vtex.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import formatCurrency from '../../utils/formatCurrency.ts'

export interface Props {
    /**
     * @title Produtos
     */
    products: Product[] | null;
    animateImage: boolean;
}

export function ErrorFallback({ error }: { error?: Error }) {
    console.log("error HorizontalProductCard: ", error);

    return (
        <div class="w-full max-w-5xl px-4 mx-auto py-8 lg:py-10 flex flex-col gap-8 lg:gap-10">
            <a
                href="/culturas"
                aria-label={`Página de culturas`}
                class="flex gap-2 sm:gap-4 md:gap-8 p-2 sm:p-4 md:p-6 rounded-xl bg-neutral-content"
            >
                <div
                    class={`w-40 md:w-48 h-40 md:h-48 flex justify-center items-center overflow-hidden rounded`}
                >
                    <img
                        loading="lazy"
                        width="200"
                        height="279"
                        src="/image/banner-fallback.png"
                        alt="Imagem de cerâmica"
                        class="duration-300 hover:scale-110"
                    />
                </div>

                <div class="flex flex-col gap-3 sm:gap-4 md:gap-8 flex-1 ">
                    <h2 class="line-clamp-2 md:line-clamp-3 text-base md:text-lg text-base-content uppercase font-normal">
                        Fantasia boi de mamão
                    </h2>
                    <span class="line-clamp-1 md:line-clamp-3 text-base-content text-xs md:text-sm font-light">
                        Confira todas as fantasias do boi de mamão
                    </span>
                    <button class="btn btn-block max-w-48 mt-auto">
                        Saiba mais
                    </button>
                </div>
            </a>
        </div>
    );
}
export function LoadingFallback() {
    return (
      <div
        style={{ height: "150px" }}
        class="w-full flex justify-center items-center"
      >
        <span class="loading loading-spinner" />
      </div>
    );
  }

export default function HorizontalProductCard(
    { products, animateImage }: Props,
) {
    if (!products?.length) {
        return ErrorFallback({ error: new Error("Sem produtos para renderizar") });
    }

    return (
        <div class="w-full max-w-5xl px-4 mx-auto py-8 lg:py-10 flex flex-col gap-8 lg:gap-10">
            {products.map((product) => {
                const id = product.productID;
                const url = product.url;
                const image = product.image?.[0];
                const name = product.name;
                const description = product.description;
                const { listPrice, price } = useOffer(product.offers);

                if (!id) return ErrorFallback({ error: new Error("Produto sem ID") });
                if (!url) return ErrorFallback({ error: new Error("Produto sem URL") });
                if (!name) {
                    return ErrorFallback({ error: new Error("Produto sem nome") });
                }

                const eventItem = mapProductToAnalyticsItem({
                    product,
                    breadcrumbList: undefined,
                    price,
                    listPrice,
                });

                return (
                    <a
                        key={`horizontal-product-card-${product?.productID}`}
                        href={url}
                        aria-label={`Ver produto ${name}`}
                        class="flex gap-2 sm:gap-4 md:gap-8 p-2 sm:p-4 md:p-6 rounded-xl bg-neutral-content"
                    >
                        {!!image && (
                            <div
                                class={`w-40 md:w-48 h-40 md:h-48 flex justify-center items-center overflow-hidden rounded`}
                            >
                                <Image
                                    width={200}
                                    height={279}
                                    sizes="(max-width: 640px) 100vw, 30vw"
                                    src={image.url!}
                                    alt={image.alternateName}
                                    decoding="async"
                                    loading="lazy"
                                    class={`duration-300 ${animateImage ? "hover:scale-110" : ""
                                        }`}
                                />
                            </div>
                        )}

                        {!image && (
                            <div class="w-40 md:w-48 h-40 md:h-48 rounded bg-gray-300" />
                        )}

                        <div class="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-8 flex-1 ">
                            <div class="flex flex-col gap-1 md:gap-8 flex-1">
                                <h2 class="line-clamp-2 md:line-clamp-3 text-base md:text-lg text-base-content uppercase font-normal">
                                    {name}
                                </h2>
                                {!!description && (
                                    <span class="line-clamp-1 md:line-clamp-3 text-base-content text-xs md:text-sm font-light">
                                        {description}
                                    </span>
                                )}
                            </div>

                            <div class="flex flex-col gap-1 md:gap-8 md:pl-8 md:border-l md:border-solid md:border-gray-300">
                                <div class="flex flex-col gap-1">
                                    {!!listPrice && (
                                        <span class="line-through text-sm hidden md:inline-flex">
                                            {formatCurrency(listPrice)}
                                        </span>
                                    )}
                                    {!!price && (
                                        <span class="text-sm text-secondary">
                                            {formatCurrency(price)}
                                        </span>
                                    )}
                                </div>

                                {!price && <span class="text-sm">Indisponível</span>}

                                <div class="flex flex-col gap-2 mt-auto max-w-48 md:max-w-none">
                                    {!!price && (
                                        <AddToCartButton
                                            eventParams={{ items: [eventItem] }}
                                            productID={id}
                                            seller={"1"}
                                        />
                                    )}
                                    <button class="btn btn-block hidden md:inline-flex">
                                        Ver produto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}

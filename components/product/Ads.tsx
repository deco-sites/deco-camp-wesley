import type { Section } from "deco/blocks/section.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

import Image from "apps/website/components/Image.tsx";
import { renderSection } from "apps/website/pages/Page.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

interface Props {
  sections: Section[];
  /**
   * @hide
   */
  activeIndex: number;
  /**
   * @format textarea
   */
  message: string;
  image: ImageWidget;
}

export default function ProductAds({
  sections,
  activeIndex = 0,
  message =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit sed euismod tincidunt dapibus",
  image =
    "https://deco-camp--deco-camp-wesley.deco.site/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fozksgdmyrqcxcwhnbepg.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fassets%2F10470%2F2a941f65-091a-4f54-94ac-b22eb0375ac9&fit=cover&width=120&height=120",
}: Props) {
  return (
    <>
      {renderSection(sections[activeIndex])}
      <div class="container px-3 sm:px-0 flex flex-col sm:flex-row align-start gap-3 py-10">
        <div class="flex flex-col items-center justify-start gap-2">
          <div class="avatar">
            <div class="w-24 rounded-full">
              <Image
                alt="Assistente de anúncios"
                src={image}
                width={60}
                height={60}
                loading="lazy"
                fetchPriority="low"
              />
            </div>
          </div>
          <button
            class="flex bg-black text-white grow-0 rounded text-nowrap px-3 py-2 h-auto"
            {...usePartialSection<typeof ProductAds>({
              props: {
                activeIndex: activeIndex + 1 >= sections.length
                  ? 0
                  : activeIndex + 1,
              },
            })}
          >
           Next ad
          </button>
        </div>
        <div class="bg-gray-100 p-3 rounded pb-10">{message}</div>
      </div>
    </>
  );
}


import { HiOutlineTag } from "react-icons/hi2";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import {IoShirtOutline} from 'react-icons/io5'



export default function Card() {
  return (
<><h1>Hello</h1></>
  );
}

/* ORIGINAL
    <div
      data-slot="card"
      class="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-200 group"
    >
      <div class="relative">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&amp;h=800&amp;fit=crop"
          alt="Classic Navy Suit"
          class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
        />
        <div class="absolute top-3 right-3">
          <button
            data-slot="button"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:text-accent-foreground dark:hover:bg-accent/50 size-9 rounded-full bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-heart h-4 w-4 transition-colors text-gray-600"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </button>
        </div>
        <div class="absolute top-3 left-3">
          <span
            data-slot="badge"
            class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden [a&amp;]:hover:bg-primary/90 bg-[#C5A059] text-white border-[#C5A059] hover:bg-[#B89350]"
          >
            Available
          </span>
        </div>
      </div>
      <div
        data-slot="card-content"
        class="[&amp;:last-child]:pb-6 p-4 space-y-3"
      >
        <div class="cursor-pointer">
          <h3 class="font-semibold text-lg mb-1.5 line-clamp-1">
            Classic Navy Suit
          </h3>
          <div class="flex flex-wrap gap-1.5 mb-2">
            <span
              data-slot="badge"
              class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground text-xs font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-tag h-3 w-3 mr-1"
              >
                <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                <circle
                  cx="7.5"
                  cy="7.5"
                  r=".5"
                  fill="currentColor"
                ></circle>
              </svg>
              Formal
            </span>
            <span
              data-slot="badge"
              class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground text-xs font-normal capitalize"
            >
              corporate
            </span>
            <span
              data-slot="badge"
              class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 w-fit whitespace-nowrap shrink-0 [&amp;&gt;svg]:size-3 gap-1 [&amp;&gt;svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground text-xs font-normal capitalize"
            >
              finance
            </span>
          </div>
          <div class="space-y-1.5 text-sm text-muted-foreground">
            <div class="flex items-start gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-shirt h-4 w-4 mt-0.5 flex-shrink-0"
              >
                <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
              </svg>
              <span>5'9–6'0, Average build</span>
            </div>
            <p class="text-xs pl-5">Fabric: Wool blend</p>
          </div>
        </div>
        <div class="bg-[#FDF9F3] border border-[#C5A059]/20 rounded-lg p-3">
          <p class="text-xs text-[#1A2B48] italic leading-relaxed line-clamp-2">
            "Wore this for my first investment banking interview at Goldman
            Sachs. Walk in with confidence."
          </p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t">
          <div class="flex items-center space-x-2">
            <span
              data-slot="avatar"
              class="relative flex size-10 shrink-0 overflow-hidden rounded-full h-7 w-7"
            >
              <img
                data-slot="avatar-image"
                class="aspect-square size-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&amp;h=150&amp;fit=crop"
              />
            </span>
            <span class="text-sm text-muted-foreground">Sarah Johnson</span>
          </div>
        </div>
        <button
          data-slot="button"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 has-[&gt;svg]:px-3 w-full"
        >
          View Details
        </button>
      </div>
    </div>

*/
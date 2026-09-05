import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryBanners } from "@/components/home/CategoryBanners";
import { VideoReel } from "@/components/home/VideoReel";
import { BrandStory } from "@/components/home/BrandStory";
import { DeliveryCities } from "@/components/home/DeliveryCities";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <FeaturedProducts />
      <CategoryBanners />
      <VideoReel />
      <BrandStory />
      <DeliveryCities />
    </>
  );
}

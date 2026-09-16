import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { ShopByGender } from "@/components/home/ShopByGender";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryHoverLinks } from "@/components/home/CategoryHoverLinks";
import { VideoReel } from "@/components/home/VideoReel";
import { BrandStory } from "@/components/home/BrandStory";
import { DeliveryCities } from "@/components/home/DeliveryCities";
import { getGenderBanners } from "@/lib/data";

export default async function Home() {
  const banners = await getGenderBanners();

  return (
    <>
      <Hero />
      <Ticker />
      <ShopByGender banners={banners} />
      <FeaturedProducts />
      <CategoryHoverLinks />
      <VideoReel />
      <BrandStory />
      <DeliveryCities />
    </>
  );
}

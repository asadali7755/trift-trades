import { getGenderBanners } from "@/lib/data";
import { GenderBannerManager } from "@/components/admin/GenderBannerManager";

export default async function AdminBannersPage() {
  const banners = await getGenderBanners();

  return (
    <div>
      <h1 className="font-display text-4xl text-paper">SHOP BY GENDER</h1>
      <p className="mt-2 text-paper/60">
        Upload one photo each for Men, Women, and Kids — these show on the homepage so customers
        can jump straight to that section. Use a plain black background, like the shoe photos on
        sneakup.pk, so all three look consistent.
      </p>
      <div className="mt-6">
        <GenderBannerManager banners={banners} />
      </div>
    </div>
  );
}

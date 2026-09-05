# Thrift Trades — Setup Guide

Website ban chuki he (design, pages, admin panel — sab kaam kar raha he). Ab live hone se pehle
sirf 2 free accounts banane hen aur unki keys `.env.local` file mein daalni hen. Yeh main aapki
taraf se nahi bana sakta (account creation aapko khud karni parti he), lekin steps neeche hen.

## 1. Supabase (database + admin login)

1. https://supabase.com pe jaake free account banayen, phir "New Project" banayen.
2. Project ready hone k baad, left sidebar mein **SQL Editor** kholein.
3. Is repo ki file `supabase/migrations/0001_init.sql` ka pura content copy karke SQL Editor mein
   paste karen aur **Run** karen — yeh `products` aur `categories` tables + starter categories
   bana dega.
4. **Authentication → Users** mein jaake bhai k liye ek login banayen (email + password) — yehi
   admin panel (`/admin`) ka login hoga.
5. **Project Settings → API** se ye 3 cheezein copy karen:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (abhi use nahi ho raha, future k liye rakh len)

## 2. Cloudinary (photos + videos ka storage)

1. https://cloudinary.com pe free account banayen.
2. Dashboard se **Cloud Name** copy karen → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
3. **Settings → Upload** mein jaake "Add upload preset" karen:
   - Signing Mode: **Unsigned**
   - Preset name jo bhi rakhen (e.g. `thrift_trades`) → `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`
4. Isi unsigned preset se bhai apne phone se seedha admin panel se photo/video upload kar sakega.

## 3. `.env.local` file banayen

`E:\sheryar bhai projects\thrift-trades\.env.local` naam ki file banayen (`.env.example` ko copy
karke rename kar den) aur upar wali sari values bhar den. Saath hi:

- `NEXT_PUBLIC_WHATSAPP_NUMBER` → bhai ka WhatsApp order number, country code k sath, bina + ke
  (e.g. `923001234567`)
- `NEXT_PUBLIC_SITE_URL` → jab domain mil jaye to us pe update kar den (abhi localhost theek he)

`.env.local` set karne k baad dev server restart karen:

```bash
npm run dev
```

## 4. Pehla shoe add karen

1. `http://localhost:3000/admin/login` pe jaake login karen.
2. **Add Shoe** pe click karen, photo/video upload karen, price/sizes bharen, save karen.
3. Wahi shoe turant `/shop` aur homepage pe show ho jayega.

## Abhi tak pending

- Bhai ka dedicated WhatsApp order number
- Domain name (naya lena he)
- Real shoes ka data (bhai jaisay jaisay stock add karta jayega)

Jab yeh sab ready ho jaye, Vercel pe deploy kar denge (jaisay baqi client sites hen).

/**
 * Download all project sample images for WordPress upload
 * Run: node docs/wordpress-import/download-images.mjs
 */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { basename } from 'path';

const OUT = 'docs/wordpress-import/images';
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const images = [
  // Portfolio
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_140930152-1773529709087.png', name: 'portfolio-spa-huong-thom.png' },
  { url: 'https://images.unsplash.com/photo-1715572158823-7fae1ef02b3b?w=800&q=80', name: 'portfolio-the-brew-house.jpg' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e8e280b3-1772070160060.png', name: 'portfolio-minh-tuan-photo.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_174834907-1773110789836.png', name: 'portfolio-coaching-thanh-cong.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1815a4642-1772246537354.png', name: 'portfolio-thoi-trang-linh.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c9ef2cf3-1772642421181.png', name: 'portfolio-dien-lanh-hoang.png' },
  // Testimonial avatars
  { url: 'https://images.unsplash.com/photo-1633058851642-4bc86a5a6117?w=200&q=80', name: 'avatar-lan-anh.jpg' },
  { url: 'https://images.unsplash.com/photo-1601724373327-8d3d925e43a2?w=200&q=80', name: 'avatar-minh-khoa.jpg' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_12132e915-1772250338040.png', name: 'avatar-thu-huong.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_17811e40c-1773306160878.png', name: 'avatar-van-duc.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c2020835-1763297966684.png', name: 'avatar-mai-linh.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ff87df0a-1763300324588.png', name: 'avatar-hoang-nam.png' },
  // Hero carousel
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_101c23f1e-1772098302371.png', name: 'hero-01.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_13dc3af92-1768230094419.png', name: 'hero-02.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1644aff77-1764659451775.png', name: 'hero-03.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_108a0859a-1772349644893.png', name: 'hero-04.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1e9d1dbf8-1767922575252.png', name: 'hero-05.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_157c4caf6-1764839075183.png', name: 'hero-06.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1f3c30478-1773105689326.png', name: 'hero-07.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1cb089fd3-1772791245629.png', name: 'hero-08.png' },
  // Portfolio detail page
  { url: 'https://images.unsplash.com/photo-1672666037110-2dbdff9ac52e?w=800&q=80', name: 'detail-spa-01.jpg' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19da85e8e-1772182199533.png', name: 'detail-spa-02.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_10fff23d0-1766589453161.png', name: 'detail-spa-03.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19330abe5-1772905195171.png', name: 'detail-spa-04.png' },
  { url: 'https://images.unsplash.com/photo-1651338520040-5e02e1ce9404?w=800&q=80', name: 'detail-brew-01.jpg' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1bbcf1307-1772627399820.png', name: 'detail-brew-02.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_19d1c6f52-1774325655936.png', name: 'detail-brew-03.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_138817c9c-1764782793767.png', name: 'detail-photo-01.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d682778c-1767008426773.png', name: 'detail-photo-02.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_189ab91e9-1772182273187.png', name: 'detail-photo-03.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_163d8dca6-1768133602485.png', name: 'detail-photo-04.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_112127b74-1765392059924.png', name: 'detail-related-01.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_18b3867c0-1768239312455.png', name: 'detail-related-02.png' },
  { url: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a11d3b6a-1763300597589.png', name: 'detail-related-03.png' },
];

async function downloadImage(url, name) {
  try {
    const res = await fetch(url);
    if (!res.ok) { console.error(`❌ ${name} — ${res.status}`); return; }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(`${OUT}/${name}`, buf);
    console.log(`✅ ${name} (${(buf.length/1024).toFixed(0)} KB)`);
  } catch (e) {
    console.error(`❌ ${name} — ${e.message}`);
  }
}

async function main() {
  console.log(`Downloading ${images.length} images to ${OUT}/...\n`);
  // Download 3 at a time
  for (let i = 0; i < images.length; i += 3) {
    const batch = images.slice(i, i + 3);
    await Promise.all(batch.map(img => downloadImage(img.url, img.name)));
  }
  console.log(`\n🎉 Done! Images saved to: ${OUT}/`);
}

main();

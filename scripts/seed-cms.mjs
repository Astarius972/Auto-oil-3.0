/**
 * CMS бүх post-ийг автоматаар үүсгэнэ.
 * Ажиллуулах: node scripts/seed-cms.mjs
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
const API_URL = env.match(/ERXES_API_URL=(.+)/)?.[1]?.trim().replace(/\/$/, "");
const APP_TOKEN = env.match(/ERXES_APP_TOKEN=(.+)/)?.[1]?.trim();

if (!API_URL || !APP_TOKEN) {
  console.error(
    "ERXES_API_URL болон ERXES_APP_TOKEN .env.local дээр байх ёстой",
  );
  process.exit(1);
}

async function gql(query, variables) {
  const res = await fetch(`${API_URL}/gateway/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-token": APP_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(" | "));
  }
  return json.data;
}

const SEED_POSTS = [
  {
    type: "about",
    title: "Компаний танилцуулга",
    excerpt:
      "2001 оноос хойшхи аяллаа, үнэт зүйлс, алсын хараагаа танд хүргэж байна.",
    content: `<h3>Захирлын мэндчилгээ</h3>
<p>"Авто Ойл" ХХК-ийн хамт олнохоо өмнөөс Танд энэ өдрийн амар амгаланг эрж, ажил үйлст тань амжилт хүсье. Манай "Авто Ойл" ХХК нь анх 2001 оноос бизнесийн гараагаа эхэлж байсан билээ.</p>
<p>Өнөөдөр "Авто Ойл" ХХК нь бүх төрлийн суудлын болон хүнд даацын автомашин, техник, тоног төхөөрөмжийн тос тосолгооны материал, даацын дугуй, фильтр, төрөл бүрийн автохимийн бүтээгдэхүүн, аккумуляторын бөөнөөр худалдаа, автомашины засвар үйлчилгээ болон бусад чиглэлээр үйл ажиллагаагаа эрхлэн явуулж байна.</p>
<p><strong>Б.Ганбаатар</strong><br/><strong>"Авто Ойл" ХХК-ийн Захирал</strong></p>
<h3 style="color:#1a3e75;text-align:center">Компанийн тухай</h3>
<p>2001 онд байгуулагдсан "АВТО ОЙЛ" ХХК нь бүх төрлийн автомашин техникийн тос тосолгооны материал, даацын дугуй, аккумулятор, бүх төрлийн автохими, фильтрийн бөөний худалдаа, автомашины тос солилгоо, засвар үйлчилгээ болон бусад чиглэлээр үйл ажиллагаагаа эрхлэн явуулдаг.</p>
<p>"АВТО ОЙЛ" ХХК нь дэлхийн "DELFIN GROUP WORLDWIDE"-ийн Орос дахь төлөөлөл болох АНУ, ОХУ-ын хамтарсан "Delfin Industry (LUXE)", Германы "ROYAL DUTCH SHELL" "SCT MANNOL", Солонгосын "Hyundai Emsys Inc (KORLUBE)", "KNR Manufac (DELUXE)", Турк улсын аккумулятор "MUTLU BATTERY" БНХАУ-ын дугуй үйлдвэрлэлийн шилдэг компани болох "TRIANGLE" групп компаниудын Монгол дахь албан ёсны дистрибьютер.</p>
<p>"LUXOIL" төв нь зочид буудал, ресторан, паб, тосны дэлгүүр болон тосолгоо үйлчилгээний чиглэлээр цогц үйл ажиллагаа явуулдаг. Харин Нарны зам дагуух "LUXE" төв нь бүх төрлийн япон автомашины сэлбэг, тос тосолгооны материалын дэлгүүр болон автомашины бүх төрлийн засвар үйлчилгээ эрхлэн явуулдаг.</p>
<p>Төмөр замын салаатай 12000м2 талбайтай өөрийн агуулахтай ба гадаадын бэлтгэн нийлүүлэгчдээс бараа бүтээгдэхүүнийг төмөр замаар дамжуулан шууд хүлээн авдаг тул өртөг хямд.</p>
<p><strong style="color:#1a3e75">Бидний зорилго:</strong> Бид шилдэг инноваци, мэдлэгт тулгуурласан бүтээлч хандлагаар салбартаа манлайлагч байж, сэтгэл ханамж, мэргэжлийн ур чадвараар үргэлж тэргүүлнэ.</p>
<p><strong style="color:#1a3e75">Үнэт зүйлс:</strong><br/>Сэтгэл ханамж /SS<br/>Мэргэжлийн ур чадвар /PS<br/>Чанар, стандарт /QS</p>
<p><strong style="color:#1a3e75">Алсын хараа:</strong> Бид 2040 он гэхэд үйл ажиллагааны цар хүрээг системтэйгээр өргөжүүлж, нягт хөгжлийг бүтээх замаар салбарын чиг хандлагыг хүчтэй тэргүүлэгчдийн нэг болсон байна.</p>
<p><strong style="color:#1a3e75">Уриа үг:</strong> AUTO OIL — Drive your happiness / Аз жаргалаа жолоод</p>
<img src="/Time_line.jpg" alt="Auto Oil Time Line" />
<h3>Гэрчилгээ, өргөмжлөл</h3>
<p><img src="/urgumjlil-3.jpg" alt="Гэрчилгээ 1" /> <img src="/urgumjlul-2.jpg" alt="Гэрчилгээ 2" /> <img src="/urgumjlol.jpg" alt="Гэрчилгээ 3" /></p>`,
  },
  {
    type: "branch",
    title: "САЛБАР 1 ТОСНЫ ХУДАЛДАА, ЗАСВАР ҮЙЛЧИЛГЭЭ",
    excerpt: "Нарны зам, Өгөөмөр техникийн захаас зүүнтийш 300м",
    content: `<p><strong>Хаяг:</strong> Нарны зам, "Өгөөмөр" техникийн захаас зүүнтийш 300м, "МТ" ШТС-ын баруун талд</p><p><strong>Утас:</strong> 11-480-000, 99015238, 99432314</p><p><strong>Цагийн хуваарь:</strong> Бүх өдөр 9:00 - 20:00</p>`,
  },
  {
    type: "branch",
    title: "САЛБАР 2 ТОСНЫ ХУДАЛДАА, АГУУЛАХ, ЗАСВАР ҮЙЛЧИЛГЭЭ",
    excerpt: "Товчооны зам, Сонсголонгийн уулзвар",
    content: `<p><strong>Хаяг:</strong> Товчооны зам, Сонсголонгийн уулзвар Монос фармын замын хойно</p><p><strong>Утас:</strong> 7019-6666, 88066688</p><p><strong>Цагийн хуваарь:</strong> Бүх өдөр 9:00 - 20:00</p>`,
  },
  {
    type: "branch",
    title: "САЛБАР 3 ТОСНЫ ХУДАЛДАА, ЗАСВАР ҮЙЛЧИЛГЭЭ",
    excerpt: "LUXOIL төв, Энхтайваны өргөн чөлөө-163",
    content: `<p><strong>Хаяг:</strong> Улаанбаатар хот, 18080, Сонгинохайрхан дүүрэг, 18-р хороо, Энхтайваны өргөн чөлөө-163, "LUXOIL" төв, "АВТО ОЙЛ" ХХК</p><p><strong>Утас:</strong> 7019-6666</p><p><strong>Цагийн хуваарь:</strong> БҮХ ӨДӨР 9:00 - 20:00</p>`,
  },
  {
    type: "branch",
    title: "АГУУЛАХ БӨӨНИЙ ХУДАЛДАА",
    excerpt: "Товчооны зам, Сонсголонгийн уулзвар",
    content: `<p><strong>Хаяг:</strong> Товчооны зам, Сонсголонгийн уулзвар Монос фармын замын хойно</p><p><strong>Утас:</strong> 7019-6666</p><p><strong>Цагийн хуваарь:</strong> Бүх өдөр 9:00 - 20:00</p>`,
  },
  {
    type: "jobs",
    title: "Ажлын байр",
    excerpt: "Манай багт нэгдэх боломжуудын тухай мэдээлэл.",
    content: `<h2>Одоогоор нээлттэй ажлын байр алга байна</h2><p>Хамтран ажиллах сонирхолтой бол өөрийн анкетаа <a href="mailto:info@auto-oil.mn">info@auto-oil.mn</a> хаягаар бидэнд илгээгээрэй. Бид тантай эргэн холбогдох болно.</p>`,
  },
  {
    type: "procurement",
    title: "Худалдан авалт",
    excerpt:
      "Бөөний болон жижиглэн худалдааны нөхцөл, бүтээгдэхүүний мэдээлэл.",
    content: `<p><img src="/Web_items_2017.10.06.jpg" alt="Худалдан авалт" /></p>`,
  },
  {
    type: "aurora",
    title: "AURORA HOTEL",
    excerpt: "Зочид буудал, оффис зориулалттай бүтээн байгуулалт",
    content: `<p>Нэрнээс нь шууд мэдрэх туулийн туяа мэт сэтгэлийн тав тухыг мэдрүүлэх дээд зэрэглэлийн үйлчилгээ, оффис зориулалттай бүтээн байгуулалт. Энэхүү төв нь олон улсын шаардлагад нийцсэн А зэрэглэлийн оффис, ресторан, лоунж, зочид буудлын үйлчилгээ явуулах зориулалт бүхий барилга юм.</p>
<blockquote>"AURORA HOTEL сонгосноор таны өмнө байгууллагынхаа нэр хүндийг илүү өсгөх, бизнесийнхээ эзлэх орон зайг улам тэлэх өрөн боломжууд нээгдэх болно."</blockquote>
<p>Сүхбаатарын талбайгаас ердөө 4км зайтай байрлах чамин шийдэл, чанартай менежмент бүхий уг байгууламж нь худалдаа, үйлчилгээ, зочид буудал, зоогийн газруудын нийлэмжтэй цогц бүрдлээрээ олон улсын стандартын шаардлага хангасан төв болох юм.</p>`,
  },
  {
    type: "dulguun-restaurant",
    title: "Салбар №1",
    excerpt: "40-60 хүн хүлээн авах хүчин чадалтай",
    content: `<p>Дөлгөөн ресторан нь ОУ зэрэглэлтэй мэргэжлийн тогоочоор танд үйлчилж байна. Бид халуун тогоо, ази, европ зэрэг төрөл бүрийн амтат хоол болон гаднаа 20 гаруй авто машины зогсоолтой 40-60 хүн хүлээн авах хүчин чадалтай.</p><p><strong>Зохион байгуулах үйл ажиллагаа:</strong> Буяны цайллага, Төрсөн өдөр, Үсний найр, Бусад зохион байгуулах</p>`,
  },
  {
    type: "dulguun-restaurant",
    title: "Дөлгөөн Зоог Ресторан (Салбар №2)",
    excerpt: "100-150 хүн хүлээн авах хүчин чадалтай",
    content: `<p>Хотын баруун хэсэгт байрших энэхүү салбар нь 100-150 хүн хүлээн авах хүчин чадалтай. Тансаг, дундаа баганагүй сaruул танхимтай, кофе шоп, халуун тогоо, европ ази хоол, мэргэжлийн тайз, дэлгэц, хөгжим, орчин үеийн тоног төхөөрөмжөөр тоноглогдсон.</p><p><strong>Зохион байгуулах үйл ажиллагаа:</strong> Буяны цайллага, Төрсөн өдөр, Үсний найр, Хуримын ёслол, Хонхны баяр, Тэмдэглэлт баяр, Одонгийн найр</p><p><strong>Захиалга:</strong> <a href="tel:99995463">99995463</a> (Менежер Сэлэнгэ)</p>`,
  },
  {
    type: "auto-news",
    title: "Хятадын Tencent Америкийн Tesla-гийн 5 хувийг худалдаж авлаа",
    excerpt: "Хятадын сошиал сүлжээний хамгийн том платформыг эзэмшигч...",
    content: "<p>Энд бүх дэлгэрэнгүй мэдээлэл орно...</p>",
  },
  {
    type: "auto-news",
    title: "Б.МӨНХЖАРГАЛ: ТЭЭВРИЙН ХЭРЭГСЛИЙН ТҮҮХИЙГ...",
    excerpt: "Орон нутагт авто үйлчилгээний ангилал тогтоож эхэлсэнтэй...",
    content: "<p>Ярилцлагын дэлгэрэнгүй мэдээлэл энд байна...</p>",
  },
  {
    type: "lux-news",
    title: "LUX OIL Auto Center шинэчлэгдлээ",
    excerpt: "LUX OIL Auto Center үйлчилгээний чанар, тав тухыг нэмэгдүүллээ.",
    content:
      "<p>LUX OIL Auto Center-ийн шинэчлэл, үйлчилгээний талаарх дэлгэрэнгүй мэдээлэл.</p>",
  },
  {
    type: "legal-advice",
    title: "Автомашины даатгалын зөвлөгөө",
    excerpt: "Автомашины даатгал сонгох, шаардлагатай баримт бичгийн талаар.",
    content:
      "<p>Автомашины даатгалын төрөл, хамгаалалт, шаардлагатай баримт бичгийн зөвлөмж.</p>",
  },
  {
    type: "auto-advice",
    title: "Өвлийн улиралд машинаа хэрхэн бэлтгэх вэ?",
    excerpt: "Өвлийн улиралд тос, дугуй, аккумуляторыг шалгах зөвлөмж.",
    content:
      "<p>Өвлийн улиралд автомашины тос, дугуй, аккумулятор, зайрмаг шалгах алхмууд.</p>",
  },
  {
    type: "product",
    title: "Shell Helix Ultra 5W-40",
    excerpt:
      "Өндөр гүйцэтгэлтэй синтетик моторын тос. Хөдөлгүүрийг бүрэн хамгаалж, түлшний хэмнэлтийг сайжруулна.",
    content: `<p><strong>Брэнд:</strong> Shell</p>
<p><strong>Үнэ:</strong> 125000</p>
<p><strong>Ангилал:</strong> oils</p>
<p>Shell Helix Ultra 5W-40 нь хөдөлгүүрийн эд ангийг цэвэр байлгаж, өргөөн температурын нөхцөлд тогтвортой ажиллана.</p>
<p><strong>Техник үзүүлэлт:</strong> Брэнд: Shell, Загвар: 5W-40, Төрөл: Синтетик моторын тос</p>`,
  },
  {
    type: "product",
    title: "LUXE Моторын тос 10W-40",
    excerpt: "LUXE брэндийн өндөр чанарын моторын тос.",
    content: `<p><strong>Брэнд:</strong> Luxe</p>
<p><strong>Үнэ:</strong> 45000</p>
<p><strong>Ангилал:</strong> oils</p>
<p>Бүх төрлийн бензин болон дизель хөдөлгүүрийн автомашинд тохиромжтой.</p>
<p><strong>Техник үзүүлэлт:</strong> Брэнд: Luxe, Загвар: 10W-40</p>`,
  },
];

const MUTATION_CANDIDATES = [
  {
    name: "cpCmsPostsAdd",
    build: (post) => ({
      query: `mutation($input: PostInput!) { cpCmsPostsAdd(input: $input) { _id title type status } }`,
      variables: {
        input: {
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          type: post.type,
          status: "published",
        },
      },
    }),
  },
  {
    name: "cmsPostsAdd",
    build: (post) => ({
      query: `mutation($title: String!, $content: String, $excerpt: String, $type: String, $status: PostStatus) { cmsPostsAdd(title: $title, content: $content, excerpt: $excerpt, type: $type, status: $status) { _id title type status } }`,
      variables: {
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        type: post.type,
        status: "published",
      },
    }),
  },
];

async function findWorkingMutation() {
  for (const candidate of MUTATION_CANDIDATES) {
    try {
      const test = SEED_POSTS[0];
      const payload = candidate.build(test);
      const data = await gql(payload.query, payload.variables);
      const key = Object.keys(data)[0];
      if (data[key]?._id) {
        console.log(`✓ Mutation ажиллаж байна: ${candidate.name}`);
        return candidate;
      }
    } catch (error) {
      console.log(`✗ ${candidate.name}: ${error.message}`);
    }
  }
  return null;
}

async function main() {
  console.log("CMS seed эхэллээ...\n");

  const existing = await gql(
    `query { cpPostList { totalCount posts { _id title type status } } }`,
  );
  const existingPosts = existing.cpPostList?.posts ?? [];
  console.log(`Одоогийн post: ${existingPosts.length}\n`);

  const mutation = await findWorkingMutation();

  if (!mutation) {
    console.log("\n⚠️  Client Portal token-оор post үүсгэх боломжгүй.");
    console.log("CMS admin panel руу нэвтэрч гараар post нэмнэ үү:");
    console.log(
      "https://autooilnew.next.erxes.io/content/cms/yxdeOzP8ZW1oS7y-uCG8_/posts",
    );
    console.log("\nДараах type-уудаар post үүсгэнэ:");
    for (const type of [...new Set(SEED_POSTS.map((p) => p.type))]) {
      console.log(`  - ${type}`);
    }
    process.exit(1);
  }

  let created = 0;
  let skipped = 0;

  for (const post of SEED_POSTS) {
    const duplicate = existingPosts.find(
      (p) => p.type === post.type && p.title === post.title,
    );
    if (duplicate) {
      console.log(`⏭  Алгасав (${post.type}): ${post.title}`);
      skipped++;
      continue;
    }

    try {
      const payload = mutation.build(post);
      const data = await gql(payload.query, payload.variables);
      const key = Object.keys(data)[0];
      console.log(`✓ Үүсгэв (${post.type}): ${post.title} → ${data[key]._id}`);
      created++;
    } catch (error) {
      console.log(`✗ Алдаа (${post.type}): ${post.title} — ${error.message}`);
    }
  }

  console.log(`\nДууслаа. Үүсгэсэн: ${created}, Алгассан: ${skipped}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

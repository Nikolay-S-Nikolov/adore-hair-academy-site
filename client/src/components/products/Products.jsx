import styles from "./Products.module.css";

export default function Products() {
  // --- BRAND DATA ---
  const brands = [
    {
      id: 1,
      name: "L’Oréal Professionnel",
      image:
        "https://images.seeklogo.com/logo-png/8/1/loreal-professionnel-logo-png_seeklogo-81124.png",
      description: "Професионална грижа, колористика и стайлинг от световен клас.",
    },
    {
      id: 2,
      name: "Schwarzkopf Professional",
      image:
        "https://images.seeklogo.com/logo-png/12/1/schwarzkopf-professional-logo-png_seeklogo-123625.png",
      description: "Иновации в избелване, боядисване и грижа за косата.",
    },
    {
      id: 3,
      name: "Keune Hair Cosmetics",
      image:
        "https://images.seeklogo.com/logo-png/7/1/keune-logo-png_seeklogo-78130.png",
      description: "Холандско качество и премиум формули за професионалисти.",
    },
  ];

  // --- PRODUCT DATA ---
  const productList = [
    {
      id: 1,
      brand: "L’Oréal Professionnel",
      name: "Blond Studio Lightening Powder",
      image:
        "https://www.lorealprofessionnel.com/-/media/project/loreal/brand-sites/lp/emea/inter/hair-color/blond-studio/lp_blond_studio_9.jpg",
      category: "Колористика",
      description: "Професионален изсветлител до 9 тона с минимално увреждане.",
    },
    {
      id: 2,
      brand: "Schwarzkopf Professional",
      name: "Igora Royal Permanent Color",
      image:
        "https://dm.henkel-dam.com/is/image/henkel/SKP_1-1_IG_Vario_Blond_2023_Flatlay_Full-range_1680x1680",
      category: "Кола",
      description: "Перманентна боя с наситени пигменти и устойчиви резултати.",
    },
    {
      id: 3,
      brand: "Keune",
      name: "Care Vital Nutrition Mask",
      image:
        "https://keune.bg/images_ext/?id=613F693D4D7A5A794B6B5571566C34324E5439624A4541704846594342334D6265415145526E526D416E414645455269424159",
      category: "Грижа за коса",
      description:
        "Интензивна маска за възстановяване, хидратация и блясък.",
    },
  ];

  return (
    <section className={styles.productsPage}>
      <div className="container">

        {/* ---------------- BRANDS SECTION ---------------- */}
        <section className={styles.brandsSection}>
          <h1 className={styles.title}>Брандове, с които работим</h1>
          <p className={styles.subtitle}>
            Професионални продукти, избрани за най-високи резултати.
          </p>

          <div className={styles.brandsGrid}>
            {brands.map((brand) => (
              <div key={brand.id} className={styles.brandCard}>
                <img src={brand.image} alt={brand.name} />
                <h3>{brand.name}</h3>
                <p>{brand.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- PRODUCTS SECTION ---------------- */}
        <section className={styles.productsSection}>
          <h2 className={styles.title}>Продукти, които използваме</h2>
          <p className={styles.subtitle}>
            Подбрани с внимание към качество, безопасност и резултат.
          </p>

          <div className={styles.productsGrid}>
            {productList.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img src={product.image} alt={product.name} />

                <div className={styles.productInfo}>
                  <span className={styles.productBrand}>{product.brand}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <span className={styles.productCategory}>{product.category}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </section>
  );
}

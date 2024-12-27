import Hero from "src/components/layouts/hero";
import Navbar from "src/components/layouts/navbar";
import Kategori from "src/components/layouts/kategori";
import NewProduct from "src/components/layouts/newProduct";
import AddProduct from "src/components/form/addProduct";
import Footer from "src/components/layouts/footer";
import AddCategoryOrSizeForm from "src/components/form/addKategoriandSize";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero className="mb-2" />
      <section>
        <div className="kategori text-darkBlue text-xl sm:text-2xl md:text-3xl  font-black py-4 sm:py-8 md:py-10  ">
          Kategori Produk
        </div>
        <Kategori />

        {/* Background Melengkung */}
        <div className="bg-gradient-to-b from-white to-blue  absolute left-0 right-0 px-2 sm:px-4 lg:px-8 xl:px-14">
          <img
            src="/images/leaf.png"
            alt="Leaf Decoration"
            className="absolute left-0 w-[30%]"
          />
          <div className="w-full h-4 sm:h-12 md:h-36 from-lightBlue to-blue rounded-t-[50%] ">
            {/* Daun Dekoratif */}
          </div>
          <div className="produk text-darkBlue text-lg sm:text-xl md:text-3xl font-black py-4 sm:py-8 md:py-12 text-center ">
            Koleksi Terbaru
          </div>
          <NewProduct />

          <Footer type="map" />
        </div>
      </section>
      {/* <AddProduct /> */}
    </div>
  );
}

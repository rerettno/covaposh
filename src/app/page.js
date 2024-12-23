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
        <div className="produk text-darkBlue text-lg sm:text-xl md:text-2xl font-black py-4 sm:py-8 md:py-10 text-center ">
          Koleksi Terbaru
        </div>
        <NewProduct />
      </section>

      <Footer type="map" />
      {/* <AddProduct /> */}
    </div>
  );
}

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
      <Hero />
      <div className="kategori text-darkBlue">Kategori Produk</div>
      <Kategori />
      <div className="produk text-darkBlue">Koleksi Terbaru</div>
      <NewProduct />
      <AddProduct />

      <AddCategoryOrSizeForm />
      <div>
        <Footer type="map" />
      </div>
    </div>
  );
}

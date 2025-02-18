import ProductList from "./Productslist";

function ProductListDisplay() {
    const sampleProducts = [
      {
        id: 1,
        name: "Organic Tomatoes",
        description: "Fresh, locally grown organic tomatoes",
        price: 4.99,
        image: "/images/tomatoes.jpg",
        farmerId: 1,
      },
      {
        id: 2,
        name: "Fresh Lettuce",
        description: "Crisp, green lettuce from local farms",
        price: 2.99,
        image: "/images/lettuce.jpg",
        farmerId: 2,
      },
      {
        id: 3,
        name: "Sweet Corn",
        description: "Hand-picked sweet corn",
        price: 3.99,
        image: "/images/corn.jpg",
        farmerId: 1,
      },
    ];
  
    return (
      <div className="bg-gray-50 p-4 space-y-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Loading State</h3>
          <ProductList categoryId={1} />
        </div>
  
        <div>
          <h3 className="text-lg font-bold mb-4">With Products</h3>
          <ProductList categoryId={1} products={sampleProducts} />
        </div>
  
        
  
        
      </div>
    );
}
    export default ProductListDisplay
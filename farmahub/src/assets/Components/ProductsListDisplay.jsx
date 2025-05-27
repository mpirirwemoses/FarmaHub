import ProductList from "./Productslist";
import image1 from "../../assets/images/istockphoto-152150863-1024x1024.jpg"
import image10 from "../../assets/images/istockphoto-1066928884-1024x1024.jpg";
import image2 from "../../assets/images/istockphoto-1324921732-1024x1024.jpg";
import image3 from "../../assets/images/pexels-goumbik-952476.jpg";
import { useState } from "react";


function ProductListDisplay() {
   const [clicked, setClicked] = useState(false);
  
    // Function to handle button click
    const handleClick = () => {
      setClicked(!clicked); // Toggle the clicked state
    };
    const sampleProducts = [
      {
        id: 1,
        name: "Organic Tomatoes",
        description: "Fresh, locally grown organic tomatoes",
        price: 4.99,
        image: image1,
        farmerId: 1,
      },
      {
        id: 2,
        name: "Fresh Lettuce",
        description: "Crisp, green lettuce from local farms",
        price: 2.99,
        image: image2,
        farmerId: 2,
      },
      {
        id: 3,
        name: "Sweet Corn",
        description: "Hand-picked sweet corn",
        price: 3.99,
        image: image3,
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
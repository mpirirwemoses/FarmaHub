import Category from "./Products";

function CategoryDisplay() {
    const defaultCategories = [
      { id: 1, name: "Vegetables", icon: "leaf" },
      { id: 2, name: "Fruits", icon: "apple-alt" },
      { id: 3, name: "Grains", icon: "wheat" },
      { id: 4, name: "Dairy", icon: "cheese" },
    ];
  
    return (
      <div className="bg-gray-50 p-4 space-y-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Default View</h3>
          <Category
            categories={defaultCategories}
            onCategoryClick={(category) =>
              console.log("Category clicked:", category)
            }
          />
        </div>
  
        
      </div>
    );
  }
  export default CategoryDisplay
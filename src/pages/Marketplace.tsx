
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Search, Star, MapPin, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const { toast } = useToast();

  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "Green Valley Farm",
      location: "California",
      price: "$4.99/lb",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Vegetables",
      inStock: true,
      description: "Fresh, organic tomatoes grown without pesticides"
    },
    {
      id: 2,
      name: "Sweet Corn",
      farmer: "Sunny Acres",
      location: "Iowa",
      price: "$3.50/dozen",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Vegetables",
      inStock: true,
      description: "Non-GMO sweet corn, picked fresh daily"
    },
    {
      id: 3,
      name: "Honey Crisp Apples",
      farmer: "Mountain View Orchard",
      location: "Washington",
      price: "$5.99/lb",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Fruits",
      inStock: false,
      description: "Crisp, sweet apples perfect for snacking"
    },
    {
      id: 4,
      name: "Fresh Lettuce",
      farmer: "Organic Gardens",
      location: "Arizona",
      price: "$2.99/head",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Vegetables",
      inStock: true,
      description: "Hydroponically grown, pesticide-free lettuce"
    },
    {
      id: 5,
      name: "Free-Range Eggs",
      farmer: "Happy Hen Farm",
      location: "Vermont",
      price: "$6.99/dozen",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Dairy & Eggs",
      inStock: true,
      description: "Farm-fresh eggs from pasture-raised hens"
    },
    {
      id: 6,
      name: "Raw Honey",
      farmer: "Wildflower Apiaries",
      location: "Texas",
      price: "$12.99/jar",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      category: "Pantry",
      inStock: true,
      description: "Pure, unfiltered wildflower honey"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || product.category === categoryFilter;
    const matchesLocation = !locationFilter || product.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const addToCart = (product: any) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-primary">Marketplace</h1>
            <p className="text-muted-foreground">Fresh produce directly from local farmers</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search products or farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Vegetables">Vegetables</SelectItem>
              <SelectItem value="Fruits">Fruits</SelectItem>
              <SelectItem value="Dairy & Eggs">Dairy & Eggs</SelectItem>
              <SelectItem value="Pantry">Pantry</SelectItem>
            </SelectContent>
          </Select>

          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              <SelectItem value="California">California</SelectItem>
              <SelectItem value="Iowa">Iowa</SelectItem>
              <SelectItem value="Washington">Washington</SelectItem>
              <SelectItem value="Arizona">Arizona</SelectItem>
              <SelectItem value="Vermont">Vermont</SelectItem>
              <SelectItem value="Texas">Texas</SelectItem>
            </SelectContent>
          </Select>

          <Button className="gradient-primary text-white">
            Apply Filters
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover-lift overflow-hidden group">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  {product.inStock ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">{product.farmer}</p>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm ml-1">{product.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location}
                  </div>
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    disabled={!product.inStock}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="gradient-primary text-white flex-1"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
                setLocationFilter("");
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;

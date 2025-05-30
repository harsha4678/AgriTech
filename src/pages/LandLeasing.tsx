
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Search, MapPin, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LandLeasing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [landTypeFilter, setLandTypeFilter] = useState("");
  const { toast } = useToast();

  const landListings = [
    {
      id: 1,
      title: "Prime Agricultural Land - 50 Acres",
      location: "Central Valley, California",
      size: "50 acres",
      type: "Cropland",
      price: "$2,500/month",
      duration: "12 months minimum",
      soilType: "Clay Loam",
      waterAccess: "Irrigation available",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Fertile agricultural land perfect for crop production",
      available: true,
      owner: "Valley Farms LLC"
    },
    {
      id: 2,
      title: "Organic Certified Farmland",
      location: "Iowa Countryside",
      size: "25 acres",
      type: "Organic",
      price: "$1,800/month",
      duration: "24 months",
      soilType: "Rich Black Soil",
      waterAccess: "Natural water source",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "USDA certified organic land ready for sustainable farming",
      available: true,
      owner: "Green Earth Holdings"
    },
    {
      id: 3,
      title: "Greenhouse Complex with Land",
      location: "Arizona Desert",
      size: "15 acres + facilities",
      type: "Greenhouse",
      price: "$4,200/month",
      duration: "36 months",
      soilType: "Controlled Environment",
      waterAccess: "Hydroponic system",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Modern greenhouse facilities for year-round production",
      available: false,
      owner: "Desert Growth Systems"
    },
    {
      id: 4,
      title: "Pasture Land for Livestock",
      location: "Texas Hill Country",
      size: "100 acres",
      type: "Pasture",
      price: "$1,200/month",
      duration: "18 months",
      soilType: "Sandy Loam",
      waterAccess: "Multiple water wells",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      description: "Rolling pasture perfect for cattle or sheep grazing",
      available: true,
      owner: "Lone Star Ranch"
    }
  ];

  const filteredListings = landListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || locationFilter === "all" || listing.location.includes(locationFilter);
    const matchesType = !landTypeFilter || landTypeFilter === "all" || listing.type === landTypeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  const handleInquiry = (listing: any) => {
    toast({
      title: "Inquiry Sent",
      description: `Your inquiry for ${listing.title} has been sent to the owner.`,
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
            <h1 className="text-3xl font-bold text-primary">Land Leasing</h1>
            <p className="text-muted-foreground">Find agricultural land for lease or list your property</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button className="gradient-primary text-white">
            List Your Land
          </Button>
          <Button variant="outline">
            View My Listings
          </Button>
          <Button variant="outline">
            My Applications
          </Button>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search locations or titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="California">California</SelectItem>
              <SelectItem value="Iowa">Iowa</SelectItem>
              <SelectItem value="Arizona">Arizona</SelectItem>
              <SelectItem value="Texas">Texas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={landTypeFilter} onValueChange={setLandTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Land Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Cropland">Cropland</SelectItem>
              <SelectItem value="Organic">Organic</SelectItem>
              <SelectItem value="Greenhouse">Greenhouse</SelectItem>
              <SelectItem value="Pasture">Pasture</SelectItem>
            </SelectContent>
          </Select>

          <Button className="gradient-primary text-white">
            Apply Filters
          </Button>
        </div>

        {/* Land Listings */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="hover-lift overflow-hidden">
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  {listing.available ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      Leased
                    </span>
                  )}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{listing.title}</CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {listing.location}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground mb-4">{listing.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium">Size:</span> {listing.size}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {listing.type}
                  </div>
                  <div>
                    <span className="font-medium">Soil:</span> {listing.soilType}
                  </div>
                  <div>
                    <span className="font-medium">Water:</span> {listing.waterAccess}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-primary mr-1" />
                    <span className="text-xl font-bold text-primary">{listing.price}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {listing.duration}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground mb-4">
                  Owner: {listing.owner}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    disabled={!listing.available}
                  >
                    View Details
                  </Button>
                  <Button 
                    className="gradient-primary text-white flex-1"
                    onClick={() => handleInquiry(listing)}
                    disabled={!listing.available}
                  >
                    Send Inquiry
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No land listings found matching your criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("");
                setLandTypeFilter("");
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

export default LandLeasing;

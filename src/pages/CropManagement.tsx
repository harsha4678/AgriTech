
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Plus, Calendar, Droplets, Sprout, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CropManagement = () => {
  const [showAddCrop, setShowAddCrop] = useState(false);
  const { toast } = useToast();

  const crops = [
    {
      id: 1,
      name: "Tomatoes",
      variety: "Heirloom Cherokee Purple",
      plotSize: "2 acres",
      sowingDate: "2024-01-15",
      expectedHarvest: "2024-04-15",
      currentStage: "Flowering",
      progress: 65,
      status: "healthy",
      nextTask: "Watering",
      nextTaskDate: "2024-02-01",
      notes: "Plants showing good growth, regular monitoring needed"
    },
    {
      id: 2,
      name: "Corn",
      variety: "Sweet Golden Bantam",
      plotSize: "5 acres",
      sowingDate: "2024-01-20",
      expectedHarvest: "2024-05-20",
      currentStage: "Vegetative Growth",
      progress: 45,
      status: "attention",
      nextTask: "Fertilization",
      nextTaskDate: "2024-02-02",
      notes: "Some yellowing noticed on lower leaves, may need nitrogen boost"
    },
    {
      id: 3,
      name: "Lettuce",
      variety: "Buttercrunch",
      plotSize: "0.5 acres",
      sowingDate: "2024-01-25",
      expectedHarvest: "2024-03-25",
      currentStage: "Seedling",
      progress: 25,
      status: "healthy",
      nextTask: "Thinning",
      nextTaskDate: "2024-02-05",
      notes: "Good germination rate, ready for first thinning"
    }
  ];

  const upcomingTasks = [
    { task: "Water tomatoes", crop: "Tomatoes", date: "2024-02-01", priority: "high" },
    { task: "Apply fertilizer", crop: "Corn", date: "2024-02-02", priority: "medium" },
    { task: "Thin lettuce seedlings", crop: "Lettuce", date: "2024-02-05", priority: "medium" },
    { task: "Pest inspection", crop: "All Crops", date: "2024-02-07", priority: "low" }
  ];

  const recommendations = [
    {
      type: "irrigation",
      title: "Irrigation Adjustment",
      description: "Based on weather forecast, reduce watering by 30% this week",
      urgency: "medium"
    },
    {
      type: "pest",
      title: "Aphid Prevention",
      description: "Apply neem oil spray to tomatoes as preventive measure",
      urgency: "low"
    },
    {
      type: "harvest",
      title: "Harvest Window",
      description: "Lettuce will be ready for harvest in 2-3 weeks",
      urgency: "high"
    }
  ];

  const handleAddCrop = () => {
    toast({
      title: "Crop Added",
      description: "New crop has been added to your management system.",
    });
    setShowAddCrop(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-100 text-green-800";
      case "attention": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" asChild className="mr-4">
              <Link to="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">Crop Management</h1>
              <p className="text-muted-foreground">Track and manage your crop lifecycle</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddCrop(true)}
            className="gradient-primary text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Crop
          </Button>
        </div>

        {/* Add Crop Modal */}
        {showAddCrop && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Crop</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cropName">Crop Name</Label>
                  <Input id="cropName" placeholder="e.g., Tomatoes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="variety">Variety</Label>
                  <Input id="variety" placeholder="e.g., Cherokee Purple" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plotSize">Plot Size</Label>
                  <Input id="plotSize" placeholder="e.g., 2 acres" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sowingDate">Sowing Date</Label>
                  <Input id="sowingDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cropType">Crop Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetable">Vegetable</SelectItem>
                      <SelectItem value="fruit">Fruit</SelectItem>
                      <SelectItem value="grain">Grain</SelectItem>
                      <SelectItem value="herb">Herb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="season">Growing Season</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Any special notes or requirements..." />
              </div>
              <div className="flex space-x-2 mt-4">
                <Button onClick={handleAddCrop} className="gradient-primary text-white">
                  Add Crop
                </Button>
                <Button variant="outline" onClick={() => setShowAddCrop(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Crops</p>
                  <p className="text-2xl font-bold">{crops.length}</p>
                </div>
                <Sprout className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Area</p>
                  <p className="text-2xl font-bold">7.5 acres</p>
                </div>
                <div className="w-8 h-8 bg-earth-500 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Tasks</p>
                  <p className="text-2xl font-bold">{upcomingTasks.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Health Status</p>
                  <p className="text-2xl font-bold text-green-600">Good</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Crop List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold">Active Crops</h2>
            {crops.map((crop) => (
              <Card key={crop.id} className="hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{crop.name}</CardTitle>
                    <Badge className={getStatusColor(crop.status)}>
                      {crop.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{crop.variety}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Plot Size:</span>
                        <span className="ml-1 font-medium">{crop.plotSize}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Stage:</span>
                        <span className="ml-1 font-medium">{crop.currentStage}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sown:</span>
                        <span className="ml-1 font-medium">{crop.sowingDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Harvest:</span>
                        <span className="ml-1 font-medium">{crop.expectedHarvest}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Growth Progress</span>
                        <span className="text-sm font-medium">{crop.progress}%</span>
                      </div>
                      <Progress value={crop.progress} className="h-2" />
                    </div>
                    
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Next Task:</p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{crop.nextTask}</span>
                        <span className="text-muted-foreground">{crop.nextTaskDate}</span>
                      </div>
                    </div>
                    
                    {crop.notes && (
                      <div className="text-sm">
                        <p className="text-muted-foreground mb-1">Notes:</p>
                        <p className="text-sm">{crop.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Add Entry</Button>
                      <Button size="sm" variant="outline">Schedule Task</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{task.task}</h4>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{task.crop}</p>
                      <p className="text-xs text-muted-foreground">{task.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Smart Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-3 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{rec.title}</h4>
                        <Badge variant="outline" className={getPriorityColor(rec.urgency)}>
                          {rec.urgency}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <Droplets className="w-4 h-4 mr-2" />
                    Log Irrigation
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Sprout className="w-4 h-4 mr-2" />
                    Record Growth
                  </Button>
                  <Button className="w-full" variant="outline">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropManagement;

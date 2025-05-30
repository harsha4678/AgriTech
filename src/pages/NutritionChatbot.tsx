
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Send, User, Bot } from "lucide-react";

const NutritionChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI nutrition assistant. I can help you create personalized meal plans, provide nutritional advice, and suggest healthy recipes based on locally grown produce. What would you like to know about nutrition today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        content: getBotResponse(inputMessage)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputMessage("");
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
      return "For healthy weight loss, I recommend focusing on whole foods from local farms. Include plenty of leafy greens, lean proteins, and seasonal vegetables. A typical day might include: Breakfast - Spinach and mushroom omelet with local herbs, Lunch - Grilled chicken salad with mixed greens from nearby farms, Dinner - Roasted seasonal vegetables with quinoa. Would you like specific meal planning based on your local produce availability?";
    }
    
    if (lowerMessage.includes('diabetes') || lowerMessage.includes('blood sugar')) {
      return "For managing blood sugar levels, focus on low-glycemic foods available locally. Fresh vegetables like broccoli, cauliflower, and leafy greens are excellent choices. Pair them with lean proteins and healthy fats. Local berries are great for satisfying sweet cravings while providing fiber and antioxidants. Would you like me to create a week-long meal plan using seasonal produce?";
    }
    
    if (lowerMessage.includes('protein') || lowerMessage.includes('muscle')) {
      return "Great question about protein! For muscle building and maintenance, aim for 0.8-1g of protein per kg of body weight. Local sources include fresh eggs from free-range chickens, locally caught fish, and farm-fresh dairy. Plant-based options from local farms include legumes, nuts, and seeds. Combining these with seasonal vegetables ensures you get complete amino acid profiles. What's your preferred protein source?";
    }
    
    if (lowerMessage.includes('recipe') || lowerMessage.includes('meal')) {
      return "I'd love to suggest some nutritious recipes using local ingredients! Here's a simple, healthy option: 'Farm Fresh Vegetable Stir-Fry' - Use whatever seasonal vegetables are available (bell peppers, zucchini, carrots), add local herbs, garlic, and a protein of choice. Season with olive oil and herbs. This provides vitamins, minerals, and fiber while supporting local agriculture. Would you like more specific recipes based on what's currently in season in your area?";
    }
    
    return "That's a great nutrition question! I'd recommend incorporating more fresh, locally-sourced produce into your diet. Local farms often have the freshest, most nutrient-dense options available. Could you tell me more about your specific dietary goals or any health conditions you'd like to address? This will help me provide more targeted nutritional advice.";
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
            <h1 className="text-3xl font-bold text-primary">AI Nutrition Assistant</h1>
            <p className="text-muted-foreground">Get personalized nutrition advice and meal planning</p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="h-[70vh] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 mr-2 text-primary" />
                Nutrition AI Assistant
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.type === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === 'bot' ? (
                            <Bot className="w-5 h-5 mt-1 text-primary" />
                          ) : (
                            <User className="w-5 h-5 mt-1" />
                          )}
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about nutrition, meal planning, or healthy recipes..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="gradient-primary text-white"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Quick Questions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Help me lose weight with local produce",
                "Create a diabetes-friendly meal plan",
                "What are good protein sources?",
                "Suggest healthy breakfast recipes",
                "Foods for better heart health",
                "Nutrition for muscle building"
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-4"
                  onClick={() => setInputMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Disclaimer:</strong> This AI nutrition assistant provides general guidance and should not replace professional medical advice. 
              Always consult with healthcare providers for specific dietary requirements or health conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionChatbot;

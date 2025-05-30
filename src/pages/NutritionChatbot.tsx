
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import { ArrowLeft, Send, User, Bot, MessageSquare } from "lucide-react";

const NutritionChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot' as const,
      content: "Hello! I'm your AI nutrition assistant. I can help you create personalized meal plans, provide nutritional advice, and suggest healthy recipes based on locally grown produce. What would you like to know about nutrition today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response with typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot' as const,
        content: getBotResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
      return "For healthy weight loss, I recommend focusing on whole foods from local farms. Include plenty of leafy greens, lean proteins, and seasonal vegetables. A typical day might include:\n\n🌅 **Breakfast**: Spinach and mushroom omelet with local herbs\n🍽️ **Lunch**: Grilled chicken salad with mixed greens from nearby farms\n🌙 **Dinner**: Roasted seasonal vegetables with quinoa\n\nWould you like specific meal planning based on your local produce availability?";
    }
    
    if (lowerMessage.includes('diabetes') || lowerMessage.includes('blood sugar')) {
      return "For managing blood sugar levels, focus on low-glycemic foods available locally:\n\n✅ Fresh vegetables like broccoli, cauliflower, and leafy greens\n✅ Lean proteins paired with healthy fats\n✅ Local berries for natural sweetness with fiber and antioxidants\n\nThese foods help maintain stable blood sugar while supporting local agriculture. Would you like me to create a week-long meal plan using seasonal produce?";
    }
    
    if (lowerMessage.includes('protein') || lowerMessage.includes('muscle')) {
      return "Great question about protein! For muscle building and maintenance:\n\n🎯 **Target**: 0.8-1g protein per kg of body weight\n🥚 **Local sources**: Free-range eggs, locally caught fish, farm-fresh dairy\n🌱 **Plant-based**: Local legumes, nuts, and seeds\n\nCombining these with seasonal vegetables ensures complete amino acid profiles. What's your preferred protein source?";
    }
    
    if (lowerMessage.includes('recipe') || lowerMessage.includes('meal')) {
      return "Here's a nutritious recipe using local ingredients:\n\n🥗 **Farm Fresh Vegetable Stir-Fry**\n\n**Ingredients:**\n• Seasonal vegetables (bell peppers, zucchini, carrots)\n• Local herbs and garlic\n• Your choice of protein\n• Olive oil and seasonings\n\n**Benefits:** Rich in vitamins, minerals, and fiber while supporting local agriculture.\n\nWould you like more specific recipes based on what's currently in season in your area?";
    }
    
    return "That's a great nutrition question! I'd recommend incorporating more fresh, locally-sourced produce into your diet. Local farms often have the freshest, most nutrient-dense options available.\n\n💡 **Tip**: Visit your local farmer's market to discover seasonal options that are at peak nutrition and flavor.\n\nCould you tell me more about your specific dietary goals or any health conditions you'd like to address? This will help me provide more targeted nutritional advice.";
  };

  const quickQuestions = [
    "Help me lose weight with local produce",
    "Create a diabetes-friendly meal plan",
    "What are good protein sources?",
    "Suggest healthy breakfast recipes",
    "Foods for better heart health",
    "Nutrition for muscle building"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" asChild className="mr-4 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              AI Nutrition Assistant
            </h1>
            <p className="text-muted-foreground mt-2">Get personalized nutrition advice and meal planning</p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <Card className="h-[70vh] flex flex-col border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl">
            <CardHeader className="border-b bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                Nutrition AI Assistant
                <div className="ml-auto flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm text-muted-foreground">Online</span>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
              <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            : 'bg-white dark:bg-gray-700 text-foreground border border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-white/20' 
                              : 'bg-gradient-to-r from-green-400 to-green-500'
                          }`}>
                            {message.type === 'bot' ? (
                              <Bot className="w-4 h-4 text-white" />
                            ) : (
                              <User className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm leading-relaxed whitespace-pre-line break-words ${
                              message.type === 'user' ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                            }`}>
                              {message.content}
                            </p>
                            <p className={`text-xs mt-2 opacity-70 ${
                              message.type === 'user' ? 'text-white' : 'text-muted-foreground'
                            }`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="max-w-[85%] rounded-2xl p-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="border-t p-4 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex space-x-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about nutrition, meal planning, or healthy recipes..."
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    className="flex-1 border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={!inputMessage.trim() || isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Quick Questions</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left justify-start h-auto p-4 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 transform hover:scale-105 border-gray-200 dark:border-gray-700"
                  onClick={() => setInputMessage(question)}
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>⚠️ Disclaimer:</strong> This AI nutrition assistant provides general guidance and should not replace professional medical advice. 
              Always consult with healthcare providers for specific dietary requirements or health conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionChatbot;

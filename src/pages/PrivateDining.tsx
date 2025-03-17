
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; 
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import ImageWithLoader from '@/components/ImageWithLoader';

const PrivateDining = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('corporate');
  const [guests, setGuests] = useState('10-20');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a server
    toast({
      title: "Event Inquiry Received",
      description: `Thank you, ${name}! Our events team will contact you shortly.`,
    });

    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setEventType('corporate');
    setGuests('10-20');
    setMessage('');
    setDate(undefined);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <ImageWithLoader
          src="https://images.unsplash.com/photo-1567745576357-8aef3638e4ba?q=80&w=2070&auto=format&fit=crop"
          alt="Private dining setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-playfair">
              Private Dining
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Host your special events in an unforgettable setting
            </p>
          </div>
        </div>
      </div>

      {/* Private Dining Options */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="uppercase text-indian-gold font-medium tracking-wider text-sm mb-2 inline-block">Special Occasions</span>
            <h2 className="section-title-center">Curated Experiences</h2>
            <p className="text-indian-brown/80 max-w-2xl mx-auto mt-6">
              Whether you're planning a corporate event, wedding reception, or intimate gathering, 
              our private dining spaces offer an elegant setting with personalized service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "The Maharaja Room",
                capacity: "10-20 guests",
                description: "An intimate space with regal decor, perfect for small gatherings and family celebrations.",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
              },
              {
                title: "The Spice Garden",
                capacity: "30-50 guests",
                description: "A larger space with lush greenery and elegant lighting, ideal for medium-sized events.",
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
              },
              {
                title: "The Royal Banquet",
                capacity: "60-100 guests",
                description: "Our grand hall with opulent decor, perfect for wedding receptions and large corporate events.",
                image: "https://images.unsplash.com/photo-1635321593217-40050ad13c74?q=80&w=1974&auto=format&fit=crop"
              }
            ].map((space, index) => (
              <div key={index} className="bg-white rounded-lg shadow-elegant overflow-hidden">
                <div className="h-64">
                  <ImageWithLoader
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 font-playfair text-indian-brown">{space.title}</h3>
                  <div className="flex items-center text-indian-gold mb-3">
                    <Users size={16} className="mr-2" />
                    <span className="text-sm">{space.capacity}</span>
                  </div>
                  <p className="text-indian-brown/70 mb-4">{space.description}</p>
                  <Button className="w-full bg-indian-red hover:bg-indian-red/90">View Details</Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Event Inquiry Form */}
          <div className="bg-indian-cream p-8 md:p-12 rounded-lg mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <span className="uppercase text-indian-gold font-medium tracking-wider text-sm mb-2 inline-block">Make an Inquiry</span>
                <h2 className="section-title">Plan Your Special Event</h2>
                <p className="text-indian-brown/80 mb-6">
                  Our dedicated events team will work with you to create a customized experience that meets your specific needs and preferences.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Users size={20} className="text-indian-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-indian-brown mb-1">Customized Menus</h3>
                      <p className="text-indian-brown/70">Work with our chef to create a specialized menu for your event.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indian-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-indian-brown mb-1">Flexible Packages</h3>
                      <p className="text-indian-brown/70">Choose from various packages to suit your budget and preferences.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock size={20} className="text-indian-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-indian-brown mb-1">Dedicated Service</h3>
                      <p className="text-indian-brown/70">Enjoy attentive service from our staff throughout your event.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-elegant">
                <h3 className="text-2xl font-bold mb-6 font-playfair text-indian-brown">Event Inquiry</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Smith" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        placeholder="(555) 123-4567" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="event-type">Event Type</Label>
                      <select 
                        id="event-type" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        required
                      >
                        <option value="corporate">Corporate Event</option>
                        <option value="wedding">Wedding Reception</option>
                        <option value="birthday">Birthday Celebration</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <select 
                        id="guests" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        required
                      >
                        <option value="10-20">10-20 guests</option>
                        <option value="21-30">21-30 guests</option>
                        <option value="31-50">31-50 guests</option>
                        <option value="51-100">51-100 guests</option>
                        <option value="100+">100+ guests</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Preferred Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Event Details</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please tell us about your event and any special requirements"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-indian-red hover:bg-indian-red/90">
                    Submit Inquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivateDining;

import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; 
import { Button } from "@/components/ui/button";
import { CalendarIcon, Phone, Mail, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import ImageWithLoader from '@/components/ImageWithLoader';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('19:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to a server
    toast({
      title: "Reservation Request Received",
      description: `Thank you, ${name}! We'll confirm your reservation shortly.`,
    });

    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setGuests('2');
    setMessage('');
    setDate(undefined);
    setTime('19:00');
  };

  const availableTimes = [
    '12:00', '12:30', '13:00', '13:30', '14:00', 
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <ImageWithLoader
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-playfair">
              Book A Table
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">
              Reserve your dining experience at Spice Saga
            </p>
          </div>
        </div>
      </div>

      {/* Contact & Reservation Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <span className="uppercase text-indian-gold font-medium tracking-wider text-sm mb-2 inline-block">Get In Touch</span>
              <h2 className="section-title">Contact Information</h2>
              <p className="text-indian-brown/80 mb-8">
                Have questions or want to make a reservation? We're here to help you with any inquiries or special requests.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin size={20} className="text-indian-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indian-brown mb-1">Address</h3>
                    <p className="text-indian-brown/70">123 Spice Avenue, Culinary District, CA 90210</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone size={20} className="text-indian-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indian-brown mb-1">Phone</h3>
                    <p className="text-indian-brown/70">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail size={20} className="text-indian-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indian-brown mb-1">Email</h3>
                    <p className="text-indian-brown/70">reservations@spicesaga.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-indian-gold/10 flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock size={20} className="text-indian-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indian-brown mb-1">Hours</h3>
                    <div className="text-indian-brown/70">
                      <p>Monday - Friday: 12:00 PM - 10:00 PM</p>
                      <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-6 bg-indian-cream rounded-lg">
                <h3 className="text-xl font-bold mb-3 font-playfair text-indian-brown">Special Requests</h3>
                <p className="text-indian-brown/70 mb-4">
                  Planning a special occasion? Let us know how we can make your experience memorable.
                </p>
                <Button className="bg-indian-red hover:bg-indian-red/90">
                  Contact For Events
                </Button>
              </div>
            </div>
            
            {/* Reservation Form */}
            <div className="bg-white p-8 rounded-lg shadow-elegant">
              <h2 className="text-2xl font-bold mb-6 font-playfair text-indian-brown">Make a Reservation</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
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
                      <Label htmlFor="email">Email (Optional)</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <Label htmlFor="guests">Guests</Label>
                      <select 
                        id="guests" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        required
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                        ))}
                        <option value="9+">9+ People</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-1">
                      <Label htmlFor="date">Date</Label>
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
                    
                    <div className="md:col-span-1">
                      <Label htmlFor="time">Time</Label>
                      <select 
                        id="time" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                      >
                        {availableTimes.map(timeOption => (
                          <option key={timeOption} value={timeOption}>
                            {timeOption}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Special Requests (Optional)</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about any special requests or dietary restrictions"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="resize-none"
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-indian-red hover:bg-indian-red/90">
                  Confirm Reservation
                </Button>
                
                <p className="text-xs text-center text-indian-brown/60">
                  By making a reservation, you agree to our reservation policy. We hold tables for 15 minutes after the reserved time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
